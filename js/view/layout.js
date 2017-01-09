var LayoutView = Backbone.View.extend({
    el : '.app',
    drop : false,
    events : {
        'keyup .textarea' : 'onInput',
        'mouseover .droparea' : 'dropEnter',
        'mouseout  .droparea' : 'dropLeave',
    },
    onInput: function(e){
        var text = $(e.currentTarget).val();
        this.model.set('class', text);
    },
    render: function(){
        var $el = this.getTemplate();
        this.$el.html($el);
        this.setElement($el);
    },
    getTemplate: function(){
        return $("<section> <div class='targets'></div> <div class='colors'></div> <div class='droparea'></div> <input class='textarea' type='text' placeholder='Enter class here' /> </section>");
    },
    dropEnter: function(){
        this.model.set('drop', true);
    },
    dropLeave: function(){
        this.model.set('drop', false);
    },
    paint: function(color){
        var color = (color || this.model.get('selected').get('color'));
        this.$el.find('.droparea').css('background', color);
    }
});