var DescView = Backbone.View.extend({
    el: '.app',
    initialize: function(){
        var self = this;
        this.model.targets.on('ready', function(){
            self.render()
        })
    },
    render: function(){
        var $el=this.getTemplate();
        this.$el.find('.desc').remove();
        this.$el.append($el);
    },
    getTemplate: function(){
        var liItem = [];
        this.model.targets.toJSON().forEach((item) =>{
            liItem.push('id :'+item.id+', color :'+item.color+', class :'+item.class)
        })
        return $('<section class="desc"><ul><li>'+liItem.join('</li><li>')+'</li></ul></section>');
    },
});