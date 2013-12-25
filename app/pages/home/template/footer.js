define([
    'jquery',
    'underscore',
    'backbone',
    'js/app/home',
    'pages/home/template/footer.html'
], function ($, _, Backbone, Tmpst, FooterTpl) {
    var FooterView = Backbone.View.extend({
        name: 'footer',
        id: 'footer',
        tagName: 'footer',
        className: 'pure-u-1',
        render: function () {
            this.$el.html(FooterTpl({
                config: Tmpst.config
            }));

            return this;
        }
    });

    return FooterView;
});