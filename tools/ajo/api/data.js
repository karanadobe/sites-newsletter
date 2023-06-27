export const tokenAJO = localStorage.getItem('ajo-token');

/* ------------------------------  POST  DUPLICATE JOURNEY ----------------------------- */
export const duplicateJourney = 'https://journey-private.adobe.io/authoring/metadata/resource/duplicate';
export const headersDuplicateJourney = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7',
  authorization: tokenAJO,
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  pragma: 'no-cache',
  'x-api-key': 'voyager_ui',
  'x-gw-ims-org-id': '908936ED5D35CC220A495CD4@AdobeOrg',
  'x-sandbox-name': 'prod',
};

/* ------------------------------  GET  RETRIEVE JOURNEY/EMAIL ID ----------------------------- */
export const headersJourneyEmailID = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7',
  authorization: tokenAJO,
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  pragma: 'no-cache',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  'x-api-key': 'voyager_ui',
  'x-gw-ims-org-id': '908936ED5D35CC220A495CD4@AdobeOrg',
  'x-sandbox-name': 'prod',
  'x-vyg-query-filters': 'eyJmdW5jdGlvbiI6Im9yIiwidHlwZSI6ImZ1bmN0aW9uIiwiYXJncyI6W3siZnVuY3Rpb24iOiJjb250YWluIiwidHlwZSI6ImZ1bmN0aW9uIiwiYXJncyI6W3siZGF0YVR5cGUiOiJzdHJpbmciLCJ0eXBlIjoiY29uc3RhbnQiLCJ2YWx1ZSI6Im5hbWUifSx7ImRhdGFUeXBlIjoic3RyaW5nIiwidHlwZSI6ImNvbnN0YW50IiwidmFsdWUiOiJSZWFsTWFkcmlkIn0seyJkYXRhVHlwZSI6ImJvb2xlYW4iLCJ0eXBlIjoiY29uc3RhbnQiLCJ2YWx1ZSI6dHJ1ZX1dfSx7ImZ1bmN0aW9uIjoiY29udGFpbiIsInR5cGUiOiJmdW5jdGlvbiIsImFyZ3MiOlt7ImRhdGFUeXBlIjoic3RyaW5nIiwidHlwZSI6ImNvbnN0YW50IiwidmFsdWUiOiJkZXNjcmlwdGlvbiJ9LHsiZGF0YVR5cGUiOiJzdHJpbmciLCJ0eXBlIjoiY29uc3RhbnQiLCJ2YWx1ZSI6IlJlYWxNYWRyaWQifSx7ImRhdGFUeXBlIjoiYm9vbGVhbiIsInR5cGUiOiJjb25zdGFudCIsInZhbHVlIjp0cnVlfV19XX0=',
  'x-vyg-query-page': '0',
  'x-vyg-query-pagesize': '30',
  'x-vyg-query-sorts': 'W3siZGlyZWN0aW9uIjoiZGVzY2VuZGluZyIsImZpZWxkcyI6WyJtZXRhZGF0YS5jcmVhdGVkQXQiXX1d',
};

/* ------------------------------  PUT RENAME JOURNEY ----------------------------- */
export const headersRename = {
  Accept: '*/*',
  'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7',
  authorization: tokenAJO,
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
  'Content-Type': 'application/json',
  DNT: '1',
  Pragma: 'no-cache',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'cross-site',
  'x-api-key': 'voyager_ui',
  'x-gw-ims-org-id': '908936ED5D35CC220A495CD4@AdobeOrg',
  'x-sandbox-name': 'prod',
};

/* ------------------------------  GET RETRIEVE EMAIL VARIANT ----------------------------- */
export const headersEmailVariant = {
  accept: '*/*',
  Authorization: tokenAJO,
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  pragma: 'no-cache',
  'x-api-key': 'voyager',
  'x-gw-ims-org-id': '908936ED5D35CC220A495CD4@AdobeOrg',
  'x-sandbox-name': 'prod',
};

/* ------------------------------ GET RETRIEVE EMAIL VARIANT  ETAG----------------------------- */
export const headersVariantEtag = {
  accept: '*/*',
  Authorization: tokenAJO,
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  pragma: 'no-cache',
  'x-api-key': 'aem-outbound-marketing',
  'x-gw-ims-org-id': '908936ED5D35CC220A495CD4@AdobeOrg',
  'x-sandbox-name': 'prod',
};
/* ------------------------------ PUT UPDATE EMAIL SUBJECT AND CONTENT--------------------------- */
// button5: email content, change name,subject and html

export const emailContentTemplate = {
  name: 'Hello API Testing',
  subject: 'Hello API Testing ',
  html: {
    body: '<html>Hello API Testing</html>',
  },
  text: {
    body: 'Hello API Testing',
    syncFromHtml: true,
  },
  editorContext: {
    dynamicContent: {},
    isTextSynchronized: true,
    authoringMode: 'default',
  },
};
