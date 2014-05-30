define([
  'jquery',
  'underscore'
], function ($, _) {
  function shortenLanguageCode(code) {
    return (normalizeLanguageCode(code) || '').split('-')[0];
  }

  function normalizeLanguageCode(languageCode) {
    var code = (languageCode || '').toLowerCase().replace(/_/g, '-');
    return code.split(/[;=,]/)[0]
  }

  function getLanguageCode() {
    var code;
    try {
      code = window.require.s.contexts._.config.config.i18n.locale;
    } catch (e) {
      code = normalizeLanguageCode($('#_require').attr('data-locale')) || 'en';
    }

    return code;
  }

  return {
    shortenLanguageCode: shortenLanguageCode,
    normalizeLanguageCode: normalizeLanguageCode,
    getLanguageCode: getLanguageCode
  }
});
