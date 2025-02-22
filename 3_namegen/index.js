const elementGeneratedNames = document.querySelector("#generated-names");
const textNameQty = document.querySelector("#name-quantity");
const textNameLengthMin = document.querySelector("#name-lengthmin");
const textNameLengthMax = document.querySelector("#name-lengthmax");
const vowels = 'aeiou';
const consonants = 'bcdfghjklmnpqrstvwxyz';
const settingValueMin = 1;
const settingValueMax = 20;
let generatedNameQuantity = 1;
let generatedNameLengthMin = 3;
let generatedNameLengthMax = 8;
let generatedNameQuantityDefault = generatedNameQuantity;
let generatedNameLengthMinDefault = generatedNameLengthMin;
let generatedNameLengthMaxDefault = generatedNameLengthMax;
let lastLetterTypeUsed = [];

const helpInfo = [
    "",
    "",
    "<em>IMPORTANT, READ THIS BEFORE USE!!!</color></em>",
    "",
    "There are NO FILTERS, so it's possible for this site to generate undesirable names.",
    "As a disclaimer: YOU WILL HOLD FULL RESPONSIBILITY FOR USING ANY NAMES GENERATED HERE, AND NO ONE ELSE.",
    "As a general rule: If an unwanted name was generated, just skip it and generate another one.",
    "All names generated on this site are 100% free to use in any circumstance as long as it's deemed acceptable: privately, publicly, and commmercially.",
    "You cannot, however, charge anyone for using this site or the names themselves (if they're not part of something else you're selling).",
    "Credit is optional. If you do credit; please link them here or, better and if possible, to my resume/profile.",
    "These rules are subject to change when needed.",
    "",
    "",
    "<em>HOW TO USE</em>",
    "",
    "Use the [-1] and [+1] buttons to change the respective settings.",
    "Click/Tap the settings' label or current value to reset its value to default.",
    "Press [Generate Name(s)] to add generated names to the top here.",
    "[Reset] wipes this list.",
    "All generated names can be pronounced in any language accepting the Latin alphabet.",
    "",
    "",
    "<em>WHY DID I MAKE THIS</em>",
    "",
    "This concept was originally a private Unity app I programmed in C# roughly 5 years before this public web version using Javascript.",
    "I played many games involving naming characters you create (Etrian Odyssey, Class of Heroes, etc.) and I didn't want to spend time and effort coming up with names to progress.",
    "With this version in place, now anyone can access it anywhere without having to install and open the Unity app each time.",
    "The only con is that you need to be online to get here.",
    ""
];
let isHelpInfoDisplayed = false;
let isDisplayingHelp = true;

function getRandomVowel()
{
    return vowels[Math.floor(Math.random() * vowels.length)];
}
function getRandomConsonant()
{
    return consonants[Math.floor(Math.random() * consonants.length)];
}

function recordLastLetterTypeUsed(type)
{
    lastLetterTypeUsed.push(type);
    while (lastLetterTypeUsed.length > 2)
    {
        lastLetterTypeUsed.shift();
    }
}
function areLastTwoLettersEqualType(type)
{
    // console.log(lastLetterTypeUsed[0] + " =? " + lastLetterTypeUsed[1]);
    if (lastLetterTypeUsed.length === 2 &&
        lastLetterTypeUsed[0] === type &&
        lastLetterTypeUsed[0] === lastLetterTypeUsed[1])
    {
        return true;
    }
    return false;
}

// Name Quantity
function setNameQuantity(value)
{
    generatedNameQuantity = Math.min(Math.max(value, settingValueMin), settingValueMax);
    updateSettingsValuesDisplay();
}
function addToNameQuantity(delta)
{
    setNameQuantity(generatedNameQuantity + delta);
}
function setNameQuantityToDefault()
{
    setNameQuantity(generatedNameQuantityDefault);
}

// Name Minimum Length
function setNameLengthMin(value)
{
    generatedNameLengthMin = Math.min(Math.max(value, settingValueMin), settingValueMax);
    if (generatedNameLengthMin > generatedNameLengthMax)
    {
        generatedNameLengthMax = generatedNameLengthMin;
    }
    updateSettingsValuesDisplay();
}
function addToNameLengthMin(delta)
{
    setNameLengthMin(generatedNameLengthMin + delta);
}
function setNameLengthMinToDefault()
{
    setNameLengthMin(generatedNameLengthMinDefault);
}

// Name Maximum Length
function setNameLengthMax(value)
{
    generatedNameLengthMax = Math.min(Math.max(value, settingValueMin), settingValueMax);
    if (generatedNameLengthMax < generatedNameLengthMin)
    {
        generatedNameLengthMin = generatedNameLengthMax;
    }
    updateSettingsValuesDisplay();
}
function addToNameLengthMax(delta)
{
    setNameLengthMax(generatedNameLengthMax + delta);
}
function setNameLengthMaxToDefault()
{
    setNameLengthMax(generatedNameLengthMaxDefault);
}

// Display all settings values
function updateSettingsValuesDisplay()
{
    textNameQty.innerHTML = generatedNameQuantity;
    textNameLengthMin.innerHTML = generatedNameLengthMin;
    textNameLengthMax.innerHTML = generatedNameLengthMax;
}

function generateName()
{
    if (isDisplayingHelp) return;

    let names = "";
    for (let index = 0; index < generatedNameQuantity; index++)
    {
        const n = getGeneratedName();
        // console.log(n);
        if (names.length > 0) names += ", ";
        names += n;
    }
    addStringToList(names);
}
function getGeneratedName()
{
    let generatedName = "";
    let nameLength = Math.floor(Math.random() * (generatedNameLengthMax - generatedNameLengthMin + 1)) + generatedNameLengthMin;
    while (generatedName.length < nameLength)
    {
        let nextLetter;
        let nextType;

        // Two consecutive vowels => Force consonant
        if (areLastTwoLettersEqualType("v"))
        {
            nextType = "c";
        }
        // Two consecutive consonants => Force vowel
        else if (areLastTwoLettersEqualType("c"))
        {
            nextType = "v";
        }
        else
        {
            // 0 - 0.4999 = Vowel
            // 0.5 - 0.9999 = Consonant
            const typeValue = Math.random();

            if (typeValue < 0.5)
            {
                nextType = "v";
            }
            else
            {
                nextType = "c";
            }
        }

        if (nextType === "c")
        {
            nextLetter = getRandomConsonant();
        }
        else if (nextType === "v")
        {
            nextLetter = getRandomVowel();
        }

        if (generatedName.length == 0)
        {
            nextLetter = nextLetter.toUpperCase();
        }

        // console.log(nextLetter);
        // console.log(nextType + " > " + nextLetter);
        recordLastLetterTypeUsed(nextType);
        generatedName += nextLetter;
    }
    return generatedName;
}
function resetNameList()
{
    if (isDisplayingHelp) return;

    elementGeneratedNames.innerHTML = "";
    isHelpInfoDisplayed = false;
}
function displayHelp()
{
    // Can't display help info more than once, resets on clicking Reset button
    if (isHelpInfoDisplayed) return;
    
    isHelpInfoDisplayed = true;
    isDisplayingHelp = true;
    for (let index = helpInfo.length - 1; index >= 0; index--) {
        const str = helpInfo[index];
        setTimeout(() => {
            addStringToList(str);
            if (index === 0) isDisplayingHelp = false;
        }, ((helpInfo.length - index) * 100));
    }
}
function addStringToList(str)
{
    elementGeneratedNames.innerHTML = str + "<br />" + elementGeneratedNames.innerHTML;
}

document.querySelector("#button-generate").addEventListener("click", function()
{
    generateName();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelector("#button-reset").addEventListener("click", function()
{
    resetNameList();
});
document.querySelector("#button-help").addEventListener("click", function()
{
    displayHelp();
});
// document.querySelector("#button-nameQtyDefault").addEventListener("click", function()
// {
//     setNameQuantityToDefault();
// });
document.querySelector("#button-nameQtyM1").addEventListener("click", function()
{
    addToNameQuantity(-1);
});
document.querySelector("#button-nameQtyP1").addEventListener("click", function()
{
    addToNameQuantity(1);
});
// document.querySelector("#button-nameLengthMinDefault").addEventListener("click", function()
// {
//     setNameLengthMinToDefault();
// });
document.querySelector("#button-nameLengthMinM1").addEventListener("click", function()
{
    addToNameLengthMin(-1);
});
document.querySelector("#button-nameLengthMinP1").addEventListener("click", function()
{
    addToNameLengthMin(1);
});
// document.querySelector("#button-nameLengthMaxDefault").addEventListener("click", function()
// {
//     setNameLengthMaxToDefault();
// });
document.querySelector("#button-nameLengthMaxM1").addEventListener("click", function()
{
    addToNameLengthMax(-1);
});
document.querySelector("#button-nameLengthMaxP1").addEventListener("click", function()
{
    addToNameLengthMax(1);
});
document.querySelector("#name-quantity").addEventListener("click", function()
{
    setNameQuantityToDefault();
});
document.querySelector("#name-quantity-label").addEventListener("click", function()
{
    setNameQuantityToDefault();
});
document.querySelector("#name-lengthmin").addEventListener("click", function()
{
    setNameLengthMinToDefault();
});
document.querySelector("#name-lengthmin-label").addEventListener("click", function()
{
    setNameLengthMinToDefault();
});
document.querySelector("#name-lengthmax").addEventListener("click", function()
{
    setNameLengthMaxToDefault();
});
document.querySelector("#name-lengthmax-label").addEventListener("click", function()
{
    setNameLengthMaxToDefault();
});

updateSettingsValuesDisplay();
setTimeout(() => {
    displayHelp();
}, 1000);