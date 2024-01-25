//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
 
}
const searchTerm = document.getElementById("q");
searchTerm.value.innerText = "";
const input = searchTerm.value;

const filteredFilms = allEpisodes.filter(function(episode){
  return episode.title.includes(input);
});

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; 

  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    const titleElem = document.createElement("h2");
    titleElem.textContent = `${episode.name} - S${formatSeasonNumber(episode.season)}E${formatEpisodeNumber(episode.number)}`;
    const titleClass = document.createAttribute ("class");
    titleClass.value = "title";
    titleElem.setAttributeNode(titleClass);
    episodeElem.appendChild(titleElem);

    const imageElem = document.createElement("img");
    imageElem.src = episode.image.medium;
    imageElem.alt = `${episode.name} Image`;
    const imgClass = document.createAttribute ("class");
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
