var ItemView = Backbone.View.extend({
    events: {
        'mousedown .draggable': 'detectDrag',
        'dragend   .draggable': 'dragend',
        'click     .item'     : 'onClick',
    },
    render: function(){
        var $el=this.getTemplate();
        this.$el.append($el);
        this.setElement($el[0]);
    },
    getTemplate: function(){
        var idName = this.model.get('id'),
            height = this.model.get('h'),
            width  = this.model.get('w'),
            color  = this.model.get('color'),
            types  = this.model.get('types');
        return $('<div class="el"><div class="draggable '+idName+' item '+types+'" date-color="'+color+'" style="background:'+color+'; height:'+height+'px; width:'+width+'px; line-height: '+height+'px;" >'+idName+'</div></div>');
    },

    detectDrag: function (event) {
        $(event.currentTarget).detectDrag();
        this.model.set('drag', true);
    },
    dragend: function (event, clone, el) {
        this.model.set('drag', false);
    },
    onClick: function(){
        this.model.set('drag', false);
        this.model.trigger('clicked',this.model);
    },
    paint: function(){
        var color = this.model.get('color');
        $('.item', this.$el)
            .css('background', color)
            .attr('date-color', color);
    }
});