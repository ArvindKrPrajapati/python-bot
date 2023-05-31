const exportAsCsv = (data) => {
  const fs = require("fs");
  data = JSON.stringify(data);
  fs.writeFileSync("./data/format.json", data);
  console.log("exported in format.json");
};

const formatMp4mania = async () => {
  const data = require("./data/mp4mania.json");
  const results = [];
  var id = 0;
  for (let i = 0; i < data.length; i++) {
    const obj = {};
    const d = data[i];
    const category = d["Category"];
    if (category != "WWE") {
      id++;
      console.log("--------loaing------  : ", id);
      const { size, width, year } = { size: "", width: "standard", year: "" };
      obj["id"] = id;
      obj["tmdb_id"] = "";
      obj["size"] = size;
      obj["quality"] = width;
      obj["year"] = year;
      obj["name"] = d["Title"]
        .replaceAll("-", "")
        .replaceAll("BRRip", "")
        .replaceAll("WebRip", "")
        .replaceAll("Hindi", "")
        .replaceAll("DvdScr", "")
        .replaceAll("SCam", "")
        .replaceAll("TSRip", "")
        .replaceAll("DvdRip", "")
        .trim();
      obj["url"] = d.url_one;
      obj["country"] = category === "Bollywood" ? "India" : "foreign";
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
      obj["source"] = "mp4mania";
      results.push(obj);
    }
  }

  console.log("formating done for :", results.length);
  exportAsCsv(results);
};

const formatSermovies = () => {
  const data = require("./data/sermovies.json");
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let result = {};
    let quality = "";
    let name = item.name.replace("/", "");
    const yearArr = name.split(".");
    let year = yearArr[yearArr.length - 1];
    if (isNaN(year)) {
      name = yearArr.join(" ");
    } else {
      name = yearArr.slice(0, yearArr.length - 1).join(" ");
    }

    if (item.link.includes("480p")) {
      quality = "480p";
    } else if (item.link.includes("720p")) {
      quality = "720p";
    } else if (item.link.includes("1080p")) {
      quality = "1080p";
    }
    if (item.link.includes("HDCAM")) {
      quality = "HDCAM";
    }

    if (item.link.includes(".mp4") || item.link.includes(".mkv")) {
      if (quality) {
        results.push(result);
      }
    }
    if(item.link.endsWith("/")){
      console.log(item.link,"\n")
    }
    result["name"] = name.replaceAll("-", " ");
    result["url"] = item.link;
    result["quality"] = quality;
    result["size"] = item.size;
    result["source"] = "sermovies";
  }
  console.log(results.length);
  exportAsCsv(results);
};

const formatdl11Sermovies = () => {
  const data = require("./data/dl11sermovies.json");
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let result = {};
    let quality = "";
    let name = item.name.replace("/", "");
    const yearArr = name.split(".");
    let year = yearArr[yearArr.length - 1];
    if (isNaN(year)) {
      name = yearArr.join(" ");
    } else {
      name = yearArr.slice(0, yearArr.length - 1).join(" ");
    }

    if (item.href.includes("480p")) {
      quality = "480p";
    } else if (item.href.includes("720p")) {
      quality = "720p";
    } else if (item.href.includes("1080p")) {
      quality = "1080p";
    } else if (item.href.includes("HDCAM")) {
      quality = "HDCAM";
    } else if (item.href.includes("2160p")) {
      quality = "2160p";
    } else if (item.href.includes(".HDTS.")) {
      quality = "HD";
    }

    if (item.href.includes(".mp4") || item.href.includes(".mkv")) {
      if (quality) {
        results.push(result);
      }
    } else if (!item.href.includes(".srt") && !item.href.includes(".jpg")) {
      console.log(item.href, "\n");
    }

    result["name"] = name.replaceAll("-", " ");
    result["url"] = item.href;
    result["quality"] = quality;
    result["size"] = item?.size;
    result["source"] = "dl11.sermovies";
  }
  console.log(results.length);
  exportAsCsv(results);
};



const readInput = (question) => {
 const readline = require("readline");
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    interface.question(question, (answer) => {
      interface.close();
      resolve(answer);
    })
  );
};


(async()=>{
  const sources=["mp4mania","sermovies"]
  console.log("\n\nplease select your source \n")
  sources.map((s,index)=>{
    console.log(index+1," - ",s)
  })
  console.log("\n")
  const ans=await readInput("answer : ")
  if(ans){
    switch (ans) {
      case '1':
        formatMp4mania()
        break;
      case '2':
        formatSermovies()
        break;
      default:
    console.log("\x1b[31m%s\x1b[0m","wrong selection");
    }
  }else{
    console.log("\x1b[31m%s\x1b[0m","nothing was selected");
  }
})()


