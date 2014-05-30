define([
  'jquery',
  'underscore',
  'backbone',
  'js/lib/util',
  'js/collections/instances',
  'js/views/instance',
  'pages/home/services/servicesBody.html',
  'pages/home/template/body',
  'pages/home/template/tab.html'
], function ($, _, Backbone, Util, InstanceList, InstanceView, ServicesTpl, BodyView, TabTpl) {
  'use strict';

  var ServiceBodyView = BodyView.extend({
    dom: {
      TABS: '[data-js-ui-tabs]',
      CREATE_INSTANCE: '.create-instance',
      INSTANCE_CONTAINER: '#instances-container .row-group',
      INSTANCE_FORM: '#instance-form'
    },
    initialize: function () {
      BodyView.prototype.initialize.call(this, arguments);

      // act as internal anchor,  pass the 'section' into the view, and use JS to jump to that part of the view, post-rendering
      var that = this;
      this.on('view:merged', function (options) {
        if (options && options.section) {
          Util.scrollToInternalLink(that.$el, options.section);
        } else {
          window.scrollTo(0, 0);
        }
      });

      this.instanceList = new InstanceList();

      this.listenTo(this.instanceList, 'add', this.addOne);
      this.listenTo(this.instanceList, 'reset', this.addAll);

      this.instanceList.fetch();
    },
    render: function () {
      this.$el.html(ServicesTpl());
      this.$(this.dom.TABS).html(TabTpl({
        currentTabId: 4
      }));

      return this;
    },
    events: function () {
      var events = {};

      events['click ' + this.dom.CREATE_INSTANCE] = 'onCreateInstance';

      return events;
    },
    addOne: function (instance, collection) {
      var index = ~~collection.models.indexOf(instance);
      var view = new InstanceView({
        model: instance
      });

      this.$(this.dom.INSTANCE_CONTAINER).append(view.render({
        index: ++index
      }).el);

      this.$(this.dom.INSTANCE_FORM).get(0).reset();
    },
    addAll: function () {
      this.InstanceList.each(this.addOne, this);
    },
    onCreateInstance: function () {
      var attrs = {};
      _.each(this.$(this.dom.INSTANCE_FORM).serializeArray(), function (item) {
        attrs[item.name] = item.value;
      });

      attrs.createTime = Util.moment().format();

      this.instanceList.create(attrs, {
        wait: true,
        validate: true // make validate method is called before **set**
      });
    },
    hasUnsavedModel: function () {
      return false;
    }
  });

  return ServiceBodyView;
});