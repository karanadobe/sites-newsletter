import { decorateError } from '../../scripts/functions.js';

export default function decorate(block) {
  const blockDescription = '"Summary" block';
  const rows = [...block.children];
  if (rows.length !== 1) {
    return decorateError(
      `${blockDescription}: Should contain a single row`,
      rows.length
    );
  }

  let mjml = `<mj-section mj-class="mj-summary">`;
  mjml += '<mj-text>';
  mjml += rows[0].firstElementChild.innerHTML;
  mjml += '</mj-text>';  
  mjml += '</mj-section>';
  return mjml;
}