define(["jquery", "underscore"], function ($, _) {
  function nameToType(name) {
    return nameToTypeMapping[name] || "name"
  }

  function select(name) {
    return $("meta[" + nameToType(name) + "='" + name + "']")
  }

  function stripTags(str) {
    return (str || "").replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
  }

  function setMetaTag(name, value) {
    var $metaTag = select(name);
    if (0 === $metaTag.length) {
      var metaHtml = "<meta " + nameToType(name) + '="' + name + '" />';
      $metaTag = $(metaHtml).appendTo("head")
    }
    $metaTag.attr("content", stripTags(value))
  }

  function set(name, value) {
    if ("object" == typeof name) _.each(name, function (val, key) {
      setMetaTag(key, val)
    });
    else setMetaTag(name, value)
  }

  function share(title, image, description, url) {
    set({
      "og:title": title,
      "og:url": url,
      "og:image": image,
      "og:site_name": title,
      "og:description": description,
      description: description,
      image: image
    })
  }

  function setDocumentDefault() {
    set({
      "og:title": document.title,
      "og:url": window.location.href,
      "og:site_name": document.title,
      name: document.title
    })
  }

  function clear(name) {
    var $metaTag = select(name);
    $metaTag.remove()
  }
  var nameToTypeMapping = {
    "og:title": "property",
    "og:url": "property",
    "og:image": "property",
    "og:site_name": "property",
    "og:description": "property",
    description: "name",
    image: "name"
  };
  return {
    set: set,
    setDocumentDefault: setDocumentDefault,
    clear: clear,
    share: share
  }
});