import Ember from 'ember';
const { Component, $ } = Ember;

export default Component.extend({

  tagName: ['span'],
  
  didInsertElement() {
    this._super(...arguments);
    this.set('$popover', this.$('[data-toggle="popover"]'));
    this._createPopover();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._destroyPopover();
  },

  _createPopover() {
    this.get('$popover').popover({
      html: true,
      content() {
        return $(this).next('.popover-content').html();
      },
    });

    this.get('$popover').mouseover(function() {
      return $(this).popover('show');
    });

    this.get('$popover').mouseleave(function() {
      return $(this).popover('hide');
    });
  },

  _destroyPopover() {
    return this.$(`#${(this.get('elementId'))} [data-toggle='popover']`).popover('destroy');
  },
});
