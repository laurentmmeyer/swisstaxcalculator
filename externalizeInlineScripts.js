// externalizeInlineScripts.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');

// Paths (adjust as necessary)
const indexHtmlPath = path.resolve(__dirname, 'extension', 'options', 'index.html');
const nuxtAssetsDir = path.resolve(__dirname, 'extension', 'options');
const changeHistoryPath = path.resolve(__dirname, 'utils', 'change-history.js');

// Ensure the assets directory exists
if (!fs.existsSync(nuxtAssetsDir)) {
  fs.mkdirSync(nuxtAssetsDir, { recursive: true });
}

// Load the HTML content
const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
const $ = cheerio.load(htmlContent);

// Process each inline script (without a src attribute)
$('script:not([src])').each((i, el) => {
  const scriptContent = $(el).html().trim();

  // Only process non-empty inline scripts
  if (scriptContent) {
    // Create a SHA-256 hash of the script content (using first 16 hex characters)
    const hash = crypto.createHash('sha256')
      .update(scriptContent)
      .digest('hex')
      .slice(0, 16);
    const inlineFileName = `inline.${hash}.js`;
    const inlineFilePath = path.join(nuxtAssetsDir, inlineFileName);

    // Write the script content to the external file if not already created
    if (!fs.existsSync(inlineFilePath)) {
      fs.writeFileSync(inlineFilePath, scriptContent, 'utf-8');
      console.log(`Created external inline script: ${inlineFilePath}`);
    }

    // Replace the inline script tag with one referencing the new external file
    // (Adjust the src path if needed so that it correctly resolves in your extension)
    $(el).replaceWith(`<script src="/options/change-history.js" crossorigin></script><script src="/options/${inlineFileName}" crossorigin></script>`);
  }
});

// Write the modified HTML back to index.html
fs.copyFileSync(changeHistoryPath, `${nuxtAssetsDir}/change-history.js`);
fs.writeFileSync(indexHtmlPath, $.html(), 'utf-8');
console.log('Updated index.html with externalized inline scripts.');
