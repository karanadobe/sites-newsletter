import {
  getJourneyIdForFolder,
  mapJourneyToFolder,
} from '../util.js';

import {
  createDuplicate,
  renameJourney,
} from '../api/ajoapi.js';

async function duplicateJourney(journeyName, folderPath) {
  const newJourneyId = await createDuplicate();
  await mapJourneyToFolder(newJourneyId, folderPath);
  renameJourney(newJourneyId, `post-match-newsletter-${journeyName}`);
  // eslint-disable-next-line no-use-before-define
  checkStatus();
}

async function checkStatus() {
  const currentUrl = new URL(window.location.href);
  const referrerUrl = new URL(currentUrl.searchParams.get('referrer'));
  const folderPath = referrerUrl.pathname.substring(1, referrerUrl.pathname.lastIndexOf('/'));
  const journeyId = await getJourneyIdForFolder(folderPath, currentUrl.origin);

  const folderDate = folderPath.substring(folderPath.lastIndexOf('-') + 1);
  const journeyDiv = document.querySelector('.ajo');
  if (journeyId) {
    journeyDiv.innerHTML = `This folder is mapped to AJO Journey: ${journeyId}`;
  } else {
    let div = journeyDiv.querySelector('.journey');
    if (!div) {
      div = document.createElement('div');
      div.classList.add('journey');
      journeyDiv.appendChild(div);
    }
    div.innerHTML = `
            <p>This folder is not yet mapped to any AJO Journey<p>
            <p>You can create a new Post Match Newsletter Journey and map it to this folder of emails</p>
            <p>
            <input text="Enter new date for post match journey" name="date" value="${folderDate}"></input>
            <button class="create-journey-button">Create Journey</button>
            </p>
            `;
    div.querySelector('.create-journey-button').addEventListener('click', () => {
      const date = div.querySelector('input').value;
      duplicateJourney(date, folderPath);
    });
  }
}

await checkStatus();
