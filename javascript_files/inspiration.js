let inspirationData = [];  // ← store the array here

fetch('javascript_files/index.json')
.then(res => res.json())
.then(data => inspirationData = data); 


function randomQuote(){
  return inspirationData[Math.floor(Math.random() * inspirationData.length)];
}


export function inspire(){
  let article = document.createElement("article");

  // if data hasn't loaded yet
  if(inspirationData.length === 0){
    article.textContent = "loading...";
    return article;
  }

  article.textContent = randomQuote();
  return article;
}
