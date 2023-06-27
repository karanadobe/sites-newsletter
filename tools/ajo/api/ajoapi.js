import {
  headersVariantEtag,
  headersEmailVariant,
  headersRename,
  headersJourneyEmailID,
  duplicateJourney,
  headersDuplicateJourney, tokenAJO,
} from './data.js';

/*
const resultDiv = document.createElement('pre');
resultDiv.id = 'result';
const body = document.querySelector('body');
body.appendChild(resultDiv); */

export function createDuplicate() {
  return fetch(duplicateJourney, {
    headers: headersDuplicateJourney,
    body: '{"origUID":"2e4c364e-eb0c-41db-8cfa-28987013304b","type":"journeyVersion"}',
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  }).then((response) => response.json())
    .then((json) => {
      const journeyId = json.uid;
      return Promise.resolve(journeyId);
    });
}

export function fetchMessageId(journeyId, emailLabel) {
  return fetch(`https://journey-private.adobe.io/authoring/journeyVersions/${journeyId}`, {
    headers: headersJourneyEmailID,
    referrer: 'https://journeys.adobe.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((json) => {
      const messageId = json.result.steps
        .filter((step) => (step.nodeType === 'message') && (step.nodeName.toLowerCase().indexOf(emailLabel.toLowerCase()) >= 0))
        .map((step) => step.action.messageId)
        .pop();
      return Promise.resolve(messageId);
    });
}

export function fetchVariantId(messageId) {
  return fetch(`https://platform.adobe.io/journey/authoring/message/inline-messages/${messageId}`, {
    headers: headersEmailVariant,
    method: 'GET',
  })
    .then((response) => response.json().then((json) => {
      console.log(json);
      const { variantId } = json.channels.email.variants[0];
      return Promise.resolve(variantId);
    }));
}

export function fetchEtag(messageId, variantId) {
  return fetch(`https://platform.adobe.io/journey/authoring/message/inline-messages/${messageId}/email/variants/${variantId}`, {
    headers: headersVariantEtag,
    method: 'GET',
  })
    .then((response) => {
      const etag = response.headers.get('ETag');
      return response.json().then(() => Promise.resolve(etag));
    });
}

export function updateEmail(messageId, variantId, etag, emailContent) {
  return fetch(`https://platform.adobe.io/journey/authoring/message/inline-messages/${messageId}/email/variants/${variantId}`, {
    method: 'PUT',
    headers: {
      Accept: '*/*',
      accept: 'aplication/json',
      authorization: tokenAJO,
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'content-type': 'application/vnd.adobe.cjm.variant.v1+json',
      DNT: '1',
      Pragma: 'no-cache',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      'x-api-key': 'aem-outbound-marketing',
      'x-gw-ims-org-id': '908936ED5D35CC220A495CD4@AdobeOrg',
      'x-sandbox-name': 'prod',
      'if-match': etag,
    },
    body: JSON.stringify(emailContent),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Update completed');
        return Promise.resolve('');
      }
      console.error('Update Failed');
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('');
    })
    .catch((error) => {
      console.error('Update Failed:', error);
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('');
    });
}

export async function renameJourney(journeyId, newName) {
  // Fetch first the existing journey body, as we need to pass it in the udpate request (PUT)
  const resp = await fetch(`https://journey-private.adobe.io/authoring/journeyVersions/${journeyId}`, {
    headers: headersJourneyEmailID,
    referrer: 'https://journeys.adobe.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  });

  if (!resp.ok) {
    console.error('Rename: get journey body Failed');
    return null;
  }
  console.log('Rename: get journey body completed');
  const json = await resp.json();
  const journeyBody = json.result;
  journeyBody.name = newName;
  const updatedBody = JSON.stringify(journeyBody);

  // Once we have the body, change the name and perform the PUT to update it
  return fetch(`https://journey-private.adobe.io/authoring/journeyVersions/${journeyId}`, {
    method: 'PUT',
    headers: headersRename,
    body: updatedBody,
  }).then((response) => {
    if (response.ok) {
      return Promise.resolve('');
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('');
  })
    .catch((error) => {
      console.error('Renamed Failed:', error);
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('');
    });
}
