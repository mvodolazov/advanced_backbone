define(function (require) {
    'use strict';
    var Backbone = require('Backbone'),
        TemplateManager = require('TemplateManager'),
        _isFunction = require('lodash/lang/isFunction'),
        _forEach = require('lodash/collection/forEach'),
        _isArray = require('lodash/lang/isArray'),
        _remove = require('lodash/array/remove');

    return Backbone.View.extend({

        constructor() {
            this._subViews = [];
            Backbone.View.apply(this, arguments);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        renderData() {
            var dataModel = this.model || this.collection;
            return dataModel && _isFunction(dataModel.toJSON) ? dataModel.toJSON() : dataModel;
        },

        render() {
            var html = TemplateManager.render(this.template, this.renderData());
            this.$el.html(html);
            this.postRender && this.postRender();

            return this;
        },

        clear() {
            this._removeSubViews();
            this.$el.html('');
        },

        remove(opts) {
            opts = opts || {};

            if (!opts.silent) {
                this.trigger('remove');
            }
            this._removeSubViews();

            Backbone.View.prototype.remove.apply(this, arguments);
        },

        registerSubViews() {
            for (var i = 0; i < arguments.length; i++) {
                if (_isArray(arguments[i])) {
                    _forEach(arguments[i], (view) => this._addOneToSubViews(view));
                } else {
                    this._addOneToSubViews(arguments[i]);
                }
            }
        },

        _addOneToSubViews(view) {
            this._subViews.push(view);
            this.listenTo(view, 'remove', () => _remove(this._subViews, view));
        },

        _removeSubViews() {
            _forEach(this._subViews, (view) => view.remove({silent: true}));
            this._subViews = [];
        }
    });
});