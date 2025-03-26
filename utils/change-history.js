// Function to add back /index.html to the URL
function addIndexHtmlToUrl() {
  if (!location.pathname.endsWith('/index.html')) {
    const newPath = location.pathname + '/index.html';
    window.history.replaceState({}, '', newPath + location.search + location.hash);
  }
}

// Listen for the beforeunload event
window.addEventListener('beforeunload', addIndexHtmlToUrl);

if (location.pathname.endsWith('/index.html')) {
  const newPath = location.pathname.replace(/index\.html$/, '');
  // Use replaceState so we don't add an extra history entry
  window.history.replaceState({}, '', newPath + location.search + location.hash);
}
