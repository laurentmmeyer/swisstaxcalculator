if (location.pathname.endsWith('/index.html')) {
  const newPath = location.pathname.replace(/index\.html$/, '');
  // Use replaceState so we don't add an extra history entry
  window.history.replaceState({}, '', newPath + location.search + location.hash);
}
