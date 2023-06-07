let readline = require("readline");
let rl = readline.createInterface(process.stdin, process.stdout);
let answers = {
  data: "",
};

rl.question(
  "Hello. Enter 10 words or digits deviding them in spaces: ",
  (answer) => {
    answers.data = answer;
    rl.setPrompt(`How would you like to sort  values: /n
    1. Words by name (from A to Z).
    2. Show digits from the smallest.
    3. Show digits from the bigest.
    4. Words by quantity of letters.
    5. Only unique words. `);
    rl.prompt();

    rl.on("line", function (closing) {
      let arrOfData = answers.data.trim().split(" ");
      let setOfUniqWords = new Set();
      let arrOfNumbers = [];
      let arrOfWords = [];
      for (let value of arrOfData) {
        if (!isNaN(value) == true) {
          arrOfNumbers.push(value);
        } else {
          arrOfWords.push(value);
        }
      }
      if (closing.toLowerCase().trim() === "exit") {
        rl.close();
      } else if (closing.trim() === "1") {
        arrOfWords.sort((a, b) => a.localeCompare(b));
        console.log(arrOfWords);
        rl.prompt();
      } else if (closing.trim() === "2") {
        arrOfNumbers.sort((a, b) => a - b);
        console.log(arrOfNumbers);
        rl.prompt();
      } else if (closing.trim() === "3") {
        arrOfNumbers.sort((a, b) => b - a);
        console.log(arrOfNumbers);
        rl.prompt();
      } else if (closing.trim() === "4") {
        arrOfWords.sort((a, b) => a.length - b.length);
        console.log(arrOfWords);
        rl.prompt();
      } else if (closing.trim() === "5") {
        for (item of arrOfWords) {
          setOfUniqWords.add(item);
        }
        console.log(setOfUniqWords);
        rl.prompt();
      } else {
        console.log("It's wrong choice! Try again...");
        rl.prompt();
      }
    });
  }
);

rl.on("close", () => {
  console.log("Good bye! Come back again!");
  process.exit();
});
