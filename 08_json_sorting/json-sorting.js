const URLS = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];
let count = 0;
let trueValue=0
let falseValue=0
async function getData(url) {
  try {
    const res = await fetch(url);
    let json = await res.json();
    if (!res.ok) {
      if (count == 3) return console.log(`${url}: The endpoint is unavailable`);
      for (let i = 0; i < 3; i++) {
        getData(url);
        count++;
      }
    }
    sortData(json, url);
  } catch (e) {
    console.log("Something wrong: ", e);
  }
}
for (url of URLS) {
  getData(url);
}
function countValues(val){
    val?trueValue++ : falseValue++
    console.log(`Found True values: ${trueValue}, Found False values: ${falseValue}`)
}
function sortData(data, url) {
  if (data.isDone !== undefined) {
    console.log(`${url}: isDone - ${data.isDone}`);
    countValues(data.isDone)
  }
  if (Object.hasOwn(data, "isDone")) {
    countValues(data.isDone)
    return console.log(`${url}: isDone - ${data.isDone}`);
  } else if (Array.isArray(data)) {
  } else {
    for (let sub of Object.values(data)) {
      if (sub instanceof Object) {
        sortData(sub, url);
      }
    }
  }
}
