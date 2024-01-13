//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
 
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; 

  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    const titleElem = document.createElement("h2");
    titleElem.textContent = `${episode.name} - S${formatSeasonNumber(episode.season)}E${formatEpisodeNumber(episode.number)}`;
    episodeElem.appendChild(titleElem);

    const seasonElem = document.createElement("p");
    seasonElem.textContent = `Season: ${episode.season}`;
    episodeElem.appendChild(seasonElem);

    const episodeNumberElem = document.createElement("p");
    episodeNumberElem.textContent = `Episode: ${episode.number}`;
    episodeElem.appendChild(episodeNumberElem);

    const imageElem = document.createElement("img");
    imageElem.src = episode.image.medium;
    imageElem.alt = `${episode.name} Image`;
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
