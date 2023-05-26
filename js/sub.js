const fetch =require("./common/fetch")






const id="758336"
const key="oADrByXg38lt5Sv6Lf1cOpYOOqpyCys6"
const url="https://api.opensubtitles.com/api/v1/subtitles?tmdb_id="+id
console.log("loading.....")
fetch("GET",url,{
  "Api-key":key
})
.then(res=>JSON.parse(res.body))
.then(({data})=>{
  data.map(item=>{
    console.log(item.attributes)
  })
})
.catch(e=>{
  console.log(e)
})