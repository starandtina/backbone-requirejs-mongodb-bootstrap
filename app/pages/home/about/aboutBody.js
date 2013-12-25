define([
    'pages/home/about/aboutTemplate',
    'pages/home/about/aboutBody.html'
], function (AboutView, AboutBodyTpl) {
    return AboutView.extend({
        contentTemplate: AboutBodyTpl,
        contentTitle: 'About Us',
        contentClass: '.about'
    });
});