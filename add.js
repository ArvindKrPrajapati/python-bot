



const fetch = require('node-fetch');

const url = "https://mytodo-api.cyclic.app/v1/mverse/add-many";

const movieArr = require("./data/tmdb.json");
const jump=100


const add=async ()=>{
    for (var i = 0; i < movieArr.length; i=i+jump) {
      const chunk=movieArr.slice(i,i+jump)
      console.log("loading...")
     try {
       const res=await fetch(url,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(chunk)
          })
       const d=await res.json()

            if (d.success) {
              console.log("\x1b[32m","saved");
            } else {
              console.log("\x1b[31m","error while saving",res);
            }
     } catch (e) {
       console.log("\x1b[31m","error while saving",e);
          
     }

       
    }
}

add()
            