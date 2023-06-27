// eslint-disable-next-line import/prefer-default-export
export async function getJourneyIdForFolder(folderPath, host) {
  const pathAJOIntegrationFile = `${host}/ajointegration/journeymappings.json`;

  const resp = await fetch(pathAJOIntegrationFile, { headers: { 'cache-control': 'no-cache' } });
  if (!resp.ok) {
    // eslint-disable-next-line no-console
    console.log('error loading ajo integration file', resp);
    return null;
  }
  const json = await resp.json();
  let journeyId = '';
  json.data.forEach((newsletter) => {
    if (newsletter.folderPath === folderPath) {
      journeyId = newsletter.journeyId;
    }
  });
  return journeyId;
}

export async function mapJourneyToFolder(journeyId, folderPath) {
  const journeymappingsurl = 'https://admin.hlx.page/form/chicharr/real-madrid-email-franklin/main/ajointegration/journeymappings.json';
  const body = `{
          "data": {
            "folderPath": "${folderPath}",
            "journeyId": "${journeyId}"
          }
        }`;
  const resp = await fetch(journeymappingsurl, {
    body,
    headers: { 'cache-control': 'no-cache', 'content-type': 'application/json' },
    method: 'POST',
  });

  const previewmappingsurl = 'https://admin.hlx.page/preview/chicharr/real-madrid-email-franklin/main/ajointegration/journeymappings.json';
  const updatepreviewresp = await fetch(previewmappingsurl, {
    method: 'POST',
  });
  return resp.ok && updatepreviewresp.ok;
}
