const rootElem = document.getElementById("root");
let allEpisodes = [];

function setup() {
  fetchEpisodes();
}

function fetchEpisodes() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch episodes");
      }
      return response.json();
    })
    .then(episodes => {
      allEpisodes = episodes; // Store episodes globally
      makePageForEpisodes(allEpisodes);
      createDropDown(allEpisodes);
    })
    .catch(error => {
      showError(error);
    });
}

function createDropDown(episodes) {
  const select = document.getElementById("episode-list");
  episodes.forEach((episode) => {
    const option = document.createElement("option");
    option.value = episode.id;
    option.text = `S${formatSeasonNumber(episode.season)}E${formatEpisodeNumber(episode.number)} - ${episode.name}`;
    select.appendChild(option);
  });

  select.addEventListener("change", selectOneEpisode);
}

function handleFilter() {
  const searchTerm = document.getElementById("q").value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(episode =>
    episode.name.toLowerCase().includes(searchTerm) ||
    episode.summary.toLowerCase().includes(searchTerm)
  );
  makePageForEpisodes(filteredEpisodes);
  renderEpisodeCount(filteredEpisodes.length);
}

function selectOneEpisode(event) {
  const selectedEpisodeId = event.target.value;
  const foundEpisode = allEpisodes.filter((episode) => episode.id === parseInt(selectedEpisodeId));
  makePageForEpisodes(foundEpisode);
}

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    const titleElem = document.createElement("h2");
    titleElem.textContent = `${episode.name} - S${formatSeasonNumber(episode.season)}E${formatEpisodeNumber(episode.number)}`;
    titleElem.classList.add("title");
    episodeElem.appendChild(titleElem);

    const imageElem = document.createElement("img");
    imageElem.src = episode.image.medium;
    imageElem.alt = `${episode.name} Image`;
    imageElem.classList.add("center");
    episodeElem.appendChild(imageElem);

    const summaryElem = document.createElement("p");
    summaryElem.innerHTML = episode.summary;
    episodeElem.appendChild(summaryElem);

    rootElem.appendChild(episodeElem);
  });
}

function renderEpisodeCount(count) {
  const matchingCount = document.getElementById("matching-episodes");
  matchingCount.innerText = `${count} episodes match your search`;
}

function showError(error) {
  rootElem.innerHTML = `<p>Error: ${error.message}</p>`;
}

function formatSeasonNumber(seasonNumber) {
  return seasonNumber < 10 ? `0${seasonNumber}` : seasonNumber;
}

function formatEpisodeNumber(episodeNumber) {
  return episodeNumber < 10 ? `0${episodeNumber}` : episodeNumber;
}

window.onload = setup;

const searchTerm = document.getElementById("q");
searchTerm.addEventListener("input", handleFilter);
