define(['BaseView', 'ContactCollectionItemView'], (BaseView, ContactCollectionItemView) => {
	return BaseView.extend({
		render: function() {
			this.clear();
			this.collection.each((model) => {
				var view = new ContactCollectionItemView({model: model});
				this.$el.append(view.render().$el);
			});
			
			return this;
		}
	});
});