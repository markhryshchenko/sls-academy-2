const URL = "https://jsonbase.com/sls-team/vacations";
async function getDevelopers() {
  try {
    const res = await fetch(URL);
    let json = await res.json();
    sortDevelopers(json);
  } catch (e) {
    console.log("Something wrong: ", e);
  }
}
getDevelopers();

function sortDevelopers(arr) {
  let result = [];
  let out = [];
  for (item of arr) {
    let obj = {
      userId: item.user._id,
      userName: item.user.name,
      vacations: [{ startDate: item.startDate, endDate: item.endDate }],
    };
    result.push(obj);
  }
  for (let item of result) {
    for (let i = 1; i < result.length; i++) {
      if (item.userId === result[i].userId) {
        let newDate = result[i].vacations[0];
        item.vacations.push(newDate);
      }
    }
    out.push(item);
    result.shift();
  }
  console.log("Result: ", out);
  console.log("JSON.result", JSON.stringify(out));
}
