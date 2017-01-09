var Model = Backbone.Model.extend({
    view: undefined,
    defaults: {
        id      : undefined,
        h       : undefined,
        w       : undefined, 
        color   : undefined,
        type    : undefined,
        class   : undefined,
        drag    : false,
    },
    initialize: function(){
        this.listenTo(this, 'add', this.renderView) 
        this.listenTo(this, 'change:color', this.paintView) 
    },
    paintView: function(){
        this.view.paint();
    },
    renderView: function(){
        this.view = new ItemView({model : this});
        this.view.setElement(this.get('wrapp'));
        this.view.render();
    },
});