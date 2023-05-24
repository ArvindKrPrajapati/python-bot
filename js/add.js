const fetch=require("./common/fetch")

const url="http://localhost:3000/v1/mverse"

const movieArr=require("./data/tmdb.json")
console.log("loading.....")
fetch("POST",url+"/add-many",{},movieArr)
.then(res=>res.body)
.then(data=>{
  console.log(JSON.parse(data))
})
.catch(e=>{
  console.log("erro: ",e)
})
