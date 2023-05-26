const fetch=require("./common/fetch")






const url="https://mytodo-api.cyclic.app/v1/mverse/all?country=foreign&skip=120"
console.log("loading....")
fetch("GET",url)
.then(res=>JSON.parse(res.body))
.then(data=>{
  console.log(data)
})
.catch(e=>{
  console.log(e)
})