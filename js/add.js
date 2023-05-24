const fetch = require("./common/fetch");

const url = "https://mytodo-api.cyclic.app/v1/mverse";

const movieArr = require("./data/tmdb.json");
console.log("loading.....");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
fetch("POST", url + "/add-many", headers, movieArr)
  .then((res) => res.body)
  .then((data) => {
    const res = JSON.parse(data);
    if (res.success) {
      console.log("added all data to database");
    } else {
      console.log(res);
    }
  })
  .catch((e) => {
    console.log("erro: ", e);
  });
