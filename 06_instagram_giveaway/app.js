const fs = require("fs");
const path = require("path");
const pathName = __dirname + "/data";

const getData = (pathName) => {
  let fileContent = fs.readFileSync(pathName, "utf8");
  return fileContent;
};

function traverseDir(dirPath, allFiles = true) {
  const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true });
  let data = "";
  if (allFiles) {
    for (const dirEntry of dirEntries) {
      const fileName = dirEntry.name;
      const pathName = path.join(dirPath, fileName);
      let res = getData(pathName);
      data = data + res;
    }
    //let resStr = data.replaceAll("-", "\n"); если разбивать по словам 
    let res = data.split("\n");
    return res;
  } else {
    for (let i = 0; i < 10; i++) {
      const fileName = dirEntries[i].name;
      const pathName = path.join(dirPath, fileName);
      let res = getData(pathName);
      data = data + res;
    }

    let res = data.split("\n");
    return res;
  }
}

function uniqueValues() {
  let res = traverseDir(pathName);
  let set = new Set(res);
  console.log("uniqueValues", set.size);
}
function existInAllFiles() {
  let res = traverseDir(pathName);
  console.log("existInAllFiles", res.length);
}
function existInAtleastTen() {
  let res = traverseDir(pathName, false);
  console.log("existInAtleastTen", res.length);
}
console.time("start");
uniqueValues();
existInAllFiles();
existInAtleastTen();
console.timeEnd("start");
