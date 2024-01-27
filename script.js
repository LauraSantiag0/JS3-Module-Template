//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");


function setup() {
  makePageForEpisodes(allEpisodes);
  createDropDown();
}
const searchTerm = document.getElementById("q");

searchTerm.addEventListener("input", handleFilter);

function filteredFilms() {
  const findFilms = getAllEpisodes().filter(
    (episode) => episode.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
  return findFilms;
}

function handleFilter(){
  const filteredEpisodes = filteredFilms();
  makePageForEpisodes(filteredEpisodes);
}

function emptyContents(){
  
  rootElem.innerHTML = "";
}

function createDropDown(){
  const select = document.getElementById("episode-list");
  const option = document.createElement("option");
  select.appendChild(option);
  allEpisodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.text = episode.name;
    select.appendChild(option);
  })

  select.addEventListener("change", selectOneEpisode);
  return select;
}

function selectOneEpisode(event){
  console.log(event.target.value);
  const foundEpisode = allEpisodes.filter((episode) => {
    return "" + episode.id === event.target.value;
  });
  makePageForEpisodes(foundEpisode);
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
    renderEpisodeCount();

}

function renderEpisodeCount(){
const matchingCount = document.getElementById("matching-episodes");

matchingCount.innerText = `${filteredFilms().length} episodes match your search`;
}

function formatSeasonNumber(seasonNumber) {
  return seasonNumber < 10 ? `0${seasonNumber}` : seasonNumber;
}

function formatEpisodeNumber(episodeNumber) {
  return episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber;
}

window.onload = setup;
