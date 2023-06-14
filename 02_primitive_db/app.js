import inquirer from "inquirer";
import { appendFile, readFileSync } from "fs";
const cwd = process.cwd();
const choiceQuestion = [
  {
    type: "input",
    name: "user",
    message: "Enter the user's name. To cancel press Enter:",
    default: "",
  },
];
const questions = [
  {
    type: "list",
    name: "gender",
    message: "Choose your Gender",
    choices: ["male", "female"],
  },
  {
    type: "number",
    name: "age",
    message: "Enter your age:",
    choices: ["male", "female"],
    validate: (answer) => {
      if (isNaN(answer)) {
        return "Value must be a number";
      }
      return true;
    },
  },
];
const find = [
  {
    type: "confirm",
    name: "cheked",
    message: "Would you to search values in DB?",
  },
];
const findParams = [
  {
    type: "input",
    name: "user",
    message: "Enter user name you wanna find in DB: ",
  },
];

function addUser() {
  inquirer.prompt(choiceQuestion).then((answers) => {
    if (answers.user === "") {
      return searchUser(answers.user);
    } else {
      return createUser(answers.user);
    }
  });
}
addUser();
function createUser(user) {
  inquirer.prompt(questions).then((answers) => {
    let ob = { ...answers, user };
    let data = JSON.stringify(ob);
    appendFile(cwd + "/db.txt", `,${data}`, (err) => {
      if (err) {
        throw err;
      }
    });
    return addUser();
  });
}
function searchUser() {
  inquirer.prompt(find).then((answers) => {
    if (answers.cheked) {
      let data = readFileSync("db.txt", "utf8");
      let arr = JSON.parse("[" + data + "]");
      console.dir(arr, { color: true });
      inquirer.prompt(findParams).then((answers) => {
        let userSearch = answers.user.toLowerCase();
        let res = JSON.parse("[" + data.toLowerCase() + "]");
        function findUsers(item) {
          if (item.user == userSearch) {
            return true;
          }
          return false;
        }
        
        let arrByUser = res.filter(findUsers);
        if (arrByUser.length > 0 ) {
          console.log("User was found: \n", arrByUser);
        } else {
          console.log("User was not found:");
        }
      });
    } else {
      process.exit();
    }
  });
}
