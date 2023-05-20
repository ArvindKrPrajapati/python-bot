const data = require("../data/mp4mania.json");
const fs = require("fs");

const exportAsCsv = (data) => {
  data = JSON.stringify(data);
  fs.writeFileSync("./data/format.json", data);
  console.log("exported in results.json");
};


const init = async () => {
  const results = [];
  var id = 0;
  for (let i = 0; i < data.length; i++) {
    const obj = {};
    const d = data[i];
    const category = d["Category"];
    if (category != "WWE") {
      id++;
      console.log("--------loaing------  : ", id);
      const { size, width, year } = {size:"",width:"480",year:""}
      obj["id"] = id;
      obj["tmdb_id"] = "";
      obj["size"] = size;
      obj["quality"] = width;
      obj["year"] = year;
      obj["name"] = d["Title"].split("-")[0].trim();
      obj["url"] = d.url_one;
      obj["country"]=category==="Bollywood" ? "India" :"foreign"
      if (d.url_two) {
        obj["url_two"] = d.url_two;
      }
      if (category == "Hollywood") {
        obj["language"] = "english";
      } else if (category == "Bollywood") {
        obj["language"] = "hindi";
      } else if ("Hollywood (Hindi Dubbed)") {
        obj["language"] = "hindi dubbed";
      } else {
        obj["language"] = "undefined";
      }
      results.push(obj);
    }
  }

  console.log("formating done for :", results.length);
  exportAsCsv(results);
};

init();
