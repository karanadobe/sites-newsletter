const { default: fetch } = require('node-fetch');

async function main(params) {
  // eslint-disable-next-line no-underscore-dangle
  const url = params.__ow_path || 'main--sites-newsletter--buuhuu.hlx.live';
  const response = await fetch(`https://${url}/query-index.json`);

  if (response.ok) {
    const body = await response.json();
    return { status: 200, body };
  }
  return { status: response.status, body: response.statusText };
}

exports.main = main;
