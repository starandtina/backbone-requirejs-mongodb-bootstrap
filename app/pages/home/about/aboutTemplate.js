define(["pages/home/template/body", "js/app/home", "pages/home/about/aboutTemplate.html"], function (BodyView, h, jade) {
    return BodyView.extend({
        contentTemplate: null,
        contentTitle: null,
        contentClass: null,
        initialize: function () {
            document.title = this.contentTitle;
        },
        render: function () {
            var context = {
                config: h.config
            };

            this.$el.html(jade(context));
            this.$el.find(".about-body").html(this.contentTemplate(context));

            return this;
        }
    });
});