






const fetch = require('./common/fetch');

function getCurrentDate(offset) {
  const today = new Date();
  const targetDate = new Date(today.setDate(today.getDate() - offset));
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}




const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${getCurrentDate(5)}&primary_release_date.lte=${getCurrentDate(5)}&with_original_language=en%7chi`;
console.log("loading....")
fetch("GET", url, {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2JhYjIwYmZiMDUzOTNlMDFiZjFmZjg1OTY2NzI1NSIsInN1YiI6IjYyZGJjZDhkZTMyM2YzMDM2YWRlMmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A-ZzzYQ4QU7SqOzUJv_Wfpeh0hDYXA2aIUQ3Twggzsw",
    })
  .then(res=>JSON.parse(res.body))
  .then(data=>{
    data.results.map(item=>{
      console.log(item.release_date,item.title,"\n")
    })
   
  })
  .catch(err => console.error('error:' + err));
  
  
