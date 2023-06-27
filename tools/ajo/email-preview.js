/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-console, import/no-cycle */

import {
  fetchMessageId,
  fetchVariantId,
  fetchEtag,
  updateEmail,
} from './api/ajoapi.js';
import {
  getJourneyIdForFolder,
} from './util.js';
import {
  loadCSS,
} from '../../scripts/lib-franklin.js';

function getEmailContent(emailLabel, subject) {
  const iframe = document.getElementById('__emailFrame');
  const emailBody = iframe ? iframe.srcdoc : null;

  return {
    name: emailLabel,
    subject,
    html: {
      body: emailBody,
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
}

async function syncToAjo(journeyId, ajoEmailLabel, subject, emailContent) {
  console.log(`Invoking sync to AJO with: journeyId ${journeyId}, ajoEmailLabel ${ajoEmailLabel}, subject ${subject}`);
  const messageId = await fetchMessageId(journeyId, ajoEmailLabel);
  const variantId = await fetchVariantId(messageId);
  const etag = await fetchEtag(messageId, variantId);

  const result = await updateEmail(messageId, variantId, etag, emailContent);
  return result;
}

/**
 * Create Badge if a Page is enlisted in a Helix Experiment
 * @return {Object} returns a badge or empty string
 */
// eslint-disable-next-line no-unused-vars
async function createAJOBadge() {
  const div = document.createElement('div');
  div.className = 'hlx-experiment hlx-badge';
  div.innerHTML = `EMail Tools<span class="hlx-open"></span>
    <div class="hlx-popup hlx-hidden">
        <div class="hlx-tool">
         <h5>Update email content in AJO</h5>
         <div class="hlx-button"><a href="">Sync</a></div>
        </div>
    </div>`;

  const popup = div.querySelector('.hlx-popup');
  const button = div.querySelector('.hlx-button');
  button.addEventListener('click', (event) => {
    // eslint-disable-next-line no-use-before-define
    launchSyncToAJO();
    event.preventDefault();
  });
  div.addEventListener('click', () => {
    popup.classList.toggle('hlx-hidden');
  });
  return div;
}

async function launchSyncToAJO() {
  const currentUrl = new URL(window.location.href);
  const pathsegments = currentUrl.pathname.split('/');
  const fileName = pathsegments.pop() || pathsegments.pop();
  const pathAJOSettings = `${pathsegments.join('/')}/ajo-mapping.json`;
  try {
    const folderPath = currentUrl.pathname.substring(1, currentUrl.pathname.lastIndexOf('/'));
    const journeyId = getJourneyIdForFolder(folderPath, currentUrl.origin);

    const resp = await fetch(pathAJOSettings);
    if (!resp.ok) {
      // eslint-disable-next-line no-console
      console.log('error loading ajo-mapping config:', resp);
      return null;
    }

    const json = await resp.json();

    if (!journeyId) {
      console.log('Could not find AJO journey in the mapping file');
      return null;
    }
    let ajoEmailLabel = '';
    let subject = '';
    json.data.forEach((line) => {
      const aemTemplate = line['AEM Template'];

      if (aemTemplate && aemTemplate.toLowerCase() === fileName) {
        ajoEmailLabel = line['Email Label'];
        subject = line['Subject Line'];
      }
    });

    if (!ajoEmailLabel) {
      // eslint-disable-next-line no-console
      console.log('Could not find AJO Email label');
      return null;
    }

    if (!subject) {
      // eslint-disable-next-line no-console
      console.log('Could not find subject');
      return null;
    }
    return syncToAjo(journeyId, ajoEmailLabel, subject, getEmailContent(ajoEmailLabel, subject));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('error reading AJO mapping config:', e);
    return null;
  }
}

/**
 * Decorates Preview mode badges and overlays
 * @return {Object} returns a badge or empty string
 */
async function decoratePreviewMode() {
  loadCSS('/tools/ajo/email-preview.css');
  const overlay = document.createElement('div');
  overlay.className = 'hlx-preview-overlay';
  document.body.append(overlay);
}

try {
  decoratePreviewMode();
} catch (e) {
  // eslint-disable-next-line no-console
  console.log(e);
}
