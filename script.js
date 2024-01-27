//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
const searchTerm = document.getElementById("q");
// searchTerm.value.innerText = "";

// function render(){
// const filteredFilms = allEpisodes.filter(function(episode){
//   return episode.name.includes();
// });
// }
// render();

searchTerm.addEventListener("input", filteredFilms);

function filteredFilms() {
  const findFilms = getAllEpisodes().filter(
    (episode) => episode.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
  emptyContents();
  makePageForEpisodes(findFilms);
}

function emptyContents(){
  
  rootElem.innerHTML = "";
}

function makePageForEpisodes(episodeList) {
  
  emptyContents();

  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    const titleElem = document.createElement("h2");
    titleElem.textContent = `${episode.name} - S${formatSeasonNumber(
      episode.season
    )}E${formatEpisodeNumber(episode.number)}`;
    const titleClass = document.createAttribute("class");
    titleClass.value = "title";
    titleElem.setAttributeNode(titleClass);
    episodeElem.appendChild(titleElem);

    const imageElem = document.createElement("img");
    imageElem.src = episode.image.medium;
    imageElem.alt = `${episode.name} Image`;
    const imgClass = document.createAttribute("class");
    imgClass.value = "center";
    imageElem.setAttributeNode(imgClass);
    episodeElem.appendChild(imageElem);

    const summaryElem = document.createElement("p");
    summaryElem.innerHTML = episode.summary;
    episodeElem.appendChild(summaryElem);

    rootElem.appendChild(episodeElem);
  });
}

function formatSeasonNumber(seasonNumber) {
  return seasonNumber < 10 ? `0${seasonNumber}` : seasonNumber;
}

function formatEpisodeNumber(episodeNumber) {
  return episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber;
}

window.onload = setup;
