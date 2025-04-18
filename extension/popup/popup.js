
// Localization strings
const locales = {
  en: {
    title: 'Swiss Tax Calculator',
    button: 'Adjust My Tax Settings'
  },
  de: {
    title: 'Schweizer Steuerrechner',
    button: 'Meine Steuereinstellungen anpassen'
  },
  fr: {
    title: 'Calculateur d\u2019impôts Suisse',
    button: 'Ajuster mes paramètres fiscaux'
  },
  it: {
    title: 'Calcolatore Fiscale Svizzero',
    button: 'Regola le mie impostazioni fiscali'
  }
};

// Detect user language (first two letters)
const lang = navigator.language.slice(0, 2);
const strings = locales[lang] || locales.en;

// Apply localized text
document.getElementById('title').innerText = strings.title;
document.getElementById('optionsButton').innerText = strings.button;

// Button action
document.getElementById('optionsButton').addEventListener('click', () => {
  // Opens the extension options page
  if (chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    alert('No options page available');
  }
});
