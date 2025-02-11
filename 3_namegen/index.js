const elementGeneratedNames = document.querySelector("#generated-names");
const vowels = 'aeiou';
const consonants = 'bcdfghjklmnpqrstvwxyz';
let generatedNameQuantity = 3;
let generatedNameLengthMin = 3;
let generatedNameLengthMax = 8;
let lastLetterTypeUsed = [];

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

function generateName()
{
    for (let index = 0; index < generatedNameQuantity; index++)
    {
        const n = getGeneratedName();
        // console.log(n);
        elementGeneratedNames.innerHTML += n + "<br />";
    }
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

document.querySelector(".button-generate").addEventListener("click", function()
{
    generateName();
});