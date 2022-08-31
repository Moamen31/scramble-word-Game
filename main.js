let words = [
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Event in which people come together"
    },
    {
        word: "number",
        hint: "Math symbol used for counting"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "canvas",
        hint: "Piece of fabric for oil painting"
    },
    {
        word: "garden",
        hint: "Space for planting flower and plant"
    },
    {
        word: "position",
        hint: "Location of someone or something"
    },
    {
        word: "feather",
        hint: "Hair like outer covering of bird"
    },
    {
        word: "comfort",
        hint: "A pleasant feeling of relaxation"
    },
    {
        word: "tongue",
        hint: "The muscular organ of mouth"
    },
    {
        word: "expansion",
        hint: "The process of increase or grow"
    },
    {
        word: "country",
        hint: "A politically identified region"
    },
    {
        word: "group",
        hint: "A number of objects or persons"
    },
    {
        word: "taste",
        hint: "Ability of tongue to detect flavour"
    },
    {
        word: "store",
        hint: "Large shop where goods are traded"
    },
    {
        word: "field",
        hint: "Area of land for farming activities"
    },
    {
        word: "friend",
        hint: "Person other than a family member"
    },
    {
        word: "pocket",
        hint: "A bag for carrying small items"
    },
    {
        word: "needle",
        hint: "A thin and sharp metal pin"
    },
    {
        word: "expert",
        hint: "Person with extensive knowledge"
    },
    {
        word: "statement",
        hint: "A declaration of something"
    },
    {
        word: "second",
        hint: "One-sixtieth of a minute"
    },
    {
        word: "library",
        hint: "Place containing collection of books"
    },
]

let word = document.querySelector(".word");
let hint = document.querySelector(".hint span");
let refreshBtn = document.querySelector(".refresh-word");
let checkBtn = document.querySelector(".check-word");
let time = document.querySelector(".time span");
let userInput = document.querySelector("input");

let correctWord; //global variable
let maxTime;



function timer() {
    maxTime = 30
    let counter = setInterval(() => {
        if (maxTime > 0) {
            maxTime--
            time.innerText = maxTime
        }
        else {
            clearInterval(counter);
            note.classList.add("show")
            noteText.innerText = `Oops you ran out of time the correct word is "${correctWord}"`;
            noteBtn.innerText = "Play Again?"
            noteBtn.addEventListener("click", () => {
                note.classList.remove("show");
                scrambleGame();
            })
        }
    }, 1000);
}

const scrambleGame = () => {
    timer()
    //we get random number of object
    let randomObj = words[Math.floor(Math.random() * words.length)];
    //we get the word of that random object and split it
    let wordArr = randomObj.word.split("");
    //with for loop we will get each index pf every letter of the word 
    //and random number to shuffle the word letters
    for (let i = wordArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]];
    }
    //add word and hint in the document
    word.innerText = wordArr.join("")
    hint.innerText = randomObj.hint

    //add correct word in variable
    correctWord = randomObj.word.toLowerCase()
    //then make the input empty
    userInput.value = ""
    //we make maxlength for our input
    userInput.setAttribute("maxlength", correctWord.length)
}
scrambleGame();

let note = document.querySelector(".note")
let noteText = document.querySelector(".note p")
let noteBtn = document.querySelector(".note button")
const checkWord = () => {
    let userWord = userInput.value.toLowerCase()
    if (userWord === "") { //if its empty
        note.classList.add("show")
        noteText.innerText = "Oops You need to write a word";
        noteBtn.innerText = "Got It"
        noteBtn.addEventListener("click", () => {
            note.classList.remove("show");
        })
        return;
    }
    if (userWord !== correctWord) {
        note.classList.add("show")
        noteText.innerText = `Oops ${userWord} is not a correct word`;
        noteBtn.innerText = "Try Again?"
        noteBtn.addEventListener("click", () => {
            note.classList.remove("show");
        })
        return;
    }
    if (userWord === correctWord) {
        note.classList.add("show")
        noteText.innerText = `Congrats ${userWord} is the correct word!`;
        noteBtn.innerText = "Play Again?"
        noteBtn.addEventListener("click", () => {
            note.classList.remove("show");
            scrambleGame();
        })
    }
}


refreshBtn.addEventListener("click", () => {
    time.textContent = 30
    scrambleGame()
})
checkBtn.addEventListener("click", checkWord)

