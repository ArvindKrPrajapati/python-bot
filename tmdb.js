



let data = require("./data/format.json");
const fetch = require('node-fetch');
const fs = require("fs");
const readline = require("readline");

const exportAsCsv = (data, filename) => {
  const length=data.length
  data = JSON.stringify(data);
  fs.writeFileSync(filename, data);
  console.log("exported in" + filename+ " length: "+length);
};

const tmdb = async (name,type="movie") => {
  console.log("-----loading-----");
  const url = "https://api.themoviedb.org/3/search/"+type+"?query=" + name;
  try {
    const data = await fetch(url, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw",
         'Content-Type': 'application/json'
        },
            method: "GET",
      });

    return data.json();
  } catch (e) {
    console.log("error");
    return {
      success: false,
    };
  }
};

const readInput = (question) => {
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
const movieObj = (match, movie) => {
  const imgUrl = "https://image.tmdb.org/t/p/w300";
  const result = {};
  result["tmdb_id"] = match.id.toString();
  result["poster_path"] = imgUrl + match.poster_path;
  result["backdrop_path"] = imgUrl + match.backdrop_path;
  result["country"] = movie?.country
    ? movie.country
    : match.original_language == "hi"
    ? "India"
    : "foreign";
  result["title"] = match.title || match.name;
  result["overview"] = match.overview || "not found";
  result["type"] = movie.type ? movie.type : "movie";
  result["release_date"] = new Date(match.release_date || "0");
  result["video"] = [
    {
      resolution: movie.quality,
      source: movie.source,
      size: movie.size,
      language: movie?.language
        ? movie.language
        : match.original_language == "hi"
        ? "hindi"
        : "English",
      href: movie.url,
      href_two: movie?.url_two,
    },
  ];
  if(movie.type=="tv"){
    result["tmdb_id"]="tv"+match.id
    result["season"]=movie.season
    result["episode"]=movie.episode
    result["release_date"] = new Date(match.first_air_date || "0");
  }

  return result;
};

const init = async () => {
  console.log("total: ", data.length);
  const notfound = [];
  let results = [];
  for (let i = 0; i < data.length; i++) {
    const name = data[i].name.trim();
    console.log(i + 1, " : ", name);
    const movie = await tmdb(name);
    if (movie.results) {
      const match = movie?.results.find(
        (item) =>
          item.title.toString().toLowerCase().trim() ==
          name.toString().toLowerCase().trim()
      );
      // if (false) {
      if (match?.id) {
        console.log("\x1b[32m", "✓ADDED\n");
        results.push(movieObj(match, data[i]));
      } else {
        if (movie.results.length == 1) {
          results.push(movieObj(movie.results[0], data[i]));
          console.log("\x1b[32m", "ADDED\n");
          continue;
        }
       // if (false) {
         if (movie.results.length) {
          console.log("\n");
          movie.results.map((item, index) => {
            console.log(index + 1, " -> ", item.title);
          });
          console.log("press 0 to exit\n");
          let ans = (await readInput("select an option : ")) || 1;
          if (ans == 0) {
            notfound.push(data[i]);
            continue;
          }
          const _match = movie.results[Number(ans - 1)];
          results.push(movieObj(_match, data[i]));
          console.log("\x1b[32m", "✓ADDED\n");
        } else {
          console.log("\x1b[31m%s\x1b[0m","not found\n");
          notfound.push(data[i]);
        }
      }
    }
  }

  exportAsCsv(results, "./data/tmdb.json");
  exportAsCsv(notfound, "./data/notfound.json");
      console.log("next step -> run 'node add'")
   
  
};

const initTv =async ()=>{
  console.log("total: ", data.length);
  const notfound = [];
  let results = [];
  
  for (let i = 0; i < data.length; i++) {
    const tv=data[i]
    const name = data[i].name.trim();
    console.log(i + 1, " : ", name);
    const movie = await tmdb(name,"tv");
    if (movie.results) {
      const match = movie?.results.find(
        (item) =>
          item.name.toString().toLowerCase().trim() ==
          name.toString().toLowerCase().trim()
      );
      // if (false) {
      if (match?.id) {
        tv.data.map(item=>{
         results.push(movieObj(match,item));
        })
        console.log("\x1b[32m", "✓ADDED\n");
      } else {
        if (movie.results.length == 1) {
           tv.data.map(item=>{
         results.push(movieObj(movie.results[0],item));
        })
         console.log("\x1b[32m", "ADDED\n");
          continue;
        }
       // if (false) {
         if (movie.results.length) {
          console.log("\n");
          movie.results.map((item, index) => {
            console.log(index + 1, " -> ", item.name);
          });
          console.log("press 0 to exit\n");
          let ans = (await readInput("select an option : ")) || 1;
          if (ans == 0) {
            notfound.push(data[i]);
            continue;
          }
          const _match = movie.results[Number(ans - 1)];
           tv.data.map(item=>{
         results.push(movieObj(_match,item));
        }) 
        console.log("\x1b[32m", "✓ADDED\n");
        } else {
          console.log("\x1b[31m%s\x1b[0m","not found\n");
          notfound.push(data[i]);
        }
      }
    }
  }

  exportAsCsv(results, "./data/tmdb.json");
  exportAsCsv(notfound, "./data/notfound.json");
  console.log("next step -> run 'node add'")
   
}

(async()=>{
  console.log("select an option \n")
  console.log("1: movie")
  console.log("2: tv \n")
  const ans=(await readInput("ans : ")) || 1
  switch (ans) {
    case '1':
      init()
      break;
    case '2':
      initTv()
      break
    default:
      // code
      console.log("choose correct option")
  }
})()