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
let lastLetterTypeUsed = [];

const helpInfo = [
    "",
    "",
    "<em>IMPORTANT, READ THIS BEFORE USE!!!</color></em>",
    "",
    "There are NO FILTERS, so it's possible for this site to generate undesirable names.",
    "As a disclaimer: YOU WILL HOLD FULL RESPONSIBILITY FOR USING ANY NAMES GENERATED HERE, AND NO ONE ELSE.",
    "As a general rule: If an unwanted name was generated, just skip it and generate another one.",
    "",
    "",
    "<em>HOW TO USE</em>",
    "",
    "Use the [-1] and [+1] buttons to change the respective settings.",
    "Press [Generate Name(s)] to add generated names to the top here.",
    "[Reset] wipes this list.",
    "All names generated can be pronounced in any language accepting the Latin alphabet.",
    "",
    "",
    "<em>WHY DID I MAKE THIS</em>",
    "",
    "This concept was originally a private Unity app I programmed in C# roughly 5 years before this public web version using Javascript.",
    "I played a lot of games involving naming a lot of characters you create (Etrian Odyssey, Class of Heroes, etc.) and I didn't want to spend more than two minutes coming up with a name to progress in a game.",
    "With this version in place, now anyone can access it anywhere without having to install and open the Unity app each time.",
    "The only con is that you only need to be online in the first place to get here.",
    ""
];
let isHelpInfoDisplayed = false;

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
    if (lastLetterTypeUsed.length === 2 &&
        lastLetterTypeUsed[0] === type &&
        lastLetterTypeUsed[0] === lastLetterTypeUsed[1])
    {
        return true;
    }
    return false;
}

function addToNameQuantity(delta)
{
    generatedNameQuantity = Math.min(Math.max(generatedNameQuantity + delta, settingValueMin), settingValueMax);
    updateSettingsValuesDisplay();
}
function addToNameLengthMin(delta)
{
    generatedNameLengthMin = Math.min(Math.max(generatedNameLengthMin + delta, settingValueMin), settingValueMax);
    if (generatedNameLengthMin > generatedNameLengthMax)
    {
        generatedNameLengthMax = generatedNameLengthMin;
    }
    updateSettingsValuesDisplay();
}
function addToNameLengthMax(delta)
{
    generatedNameLengthMax = Math.min(Math.max(generatedNameLengthMax + delta, settingValueMin), settingValueMax);
    if (generatedNameLengthMax < generatedNameLengthMin)
    {
        generatedNameLengthMin = generatedNameLengthMax;
    }
    updateSettingsValuesDisplay();
}
function updateSettingsValuesDisplay()
{
    textNameQty.innerHTML = generatedNameQuantity;
    textNameLengthMin.innerHTML = generatedNameLengthMin;
    textNameLengthMax.innerHTML = generatedNameLengthMax;
}

function generateName()
{
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
        // 0 - 0.4999 = Vowel
        // 0.5 - 0.9999 = Consonant
        const typeValue = Math.random();
        let nextLetter;
        let nextType;
        // Two consecutive vowels => Force consonant
        if (areLastTwoLettersEqualType("v"))
        {
            nextLetter = getRandomConsonant();
            nextType = "c";
        }
        // Two consecutive consonants => Force vowel
        else if (areLastTwoLettersEqualType("v"))
        {
            nextLetter = getRandomConsonant();
            nextType = "v";
        }
        else
        {
            if (typeValue < 0.5)
            {
                nextLetter = getRandomVowel();
                nextType = "v";
            }
            else
            {
                nextLetter = getRandomConsonant();
                nextType = "c";
            }
        }

        if (generatedName.length == 0)
        {
            nextLetter = nextLetter.toUpperCase();
        }

        // console.log(nextLetter);
        recordLastLetterTypeUsed(nextType);
        generatedName += nextLetter;
    }
    return generatedName;
}
function resetNameList()
{
    elementGeneratedNames.innerHTML = "";
    isHelpInfoDisplayed = false;
}
function displayHelp()
{
    // Can't display help info more than once, resets on clicking Reset button
    if (isHelpInfoDisplayed) return;
    isHelpInfoDisplayed = true;
    for (let index = helpInfo.length - 1; index >= 0; index--) {
        const str = helpInfo[index];
        setTimeout(() => {
            addStringToList(str);
        }, ((helpInfo.length - index) * 100) + 1000);
    }
}
function addStringToList(str)
{
    elementGeneratedNames.innerHTML = str + "<br />" + elementGeneratedNames.innerHTML;
}

document.querySelector("#button-generate").addEventListener("click", function()
{
    generateName();
});
document.querySelector("#button-reset").addEventListener("click", function()
{
    resetNameList();
});
document.querySelector("#button-help").addEventListener("click", function()
{
    displayHelp();
});
document.querySelector("#button-nameQtyM").addEventListener("click", function()
{
    addToNameQuantity(-1);
});
document.querySelector("#button-nameQtyP").addEventListener("click", function()
{
    addToNameQuantity(1);
});
document.querySelector("#button-nameLengthMinM").addEventListener("click", function()
{
    addToNameLengthMin(-1);
});
document.querySelector("#button-nameLengthMinP").addEventListener("click", function()
{
    addToNameLengthMin(1);
});
document.querySelector("#button-nameLengthMaxM").addEventListener("click", function()
{
    addToNameLengthMax(-1);
});
document.querySelector("#button-nameLengthMaxP").addEventListener("click", function()
{
    addToNameLengthMax(1);
});

updateSettingsValuesDisplay();
displayHelp();