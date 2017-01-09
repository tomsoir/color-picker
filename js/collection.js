var Collection = Backbone.Collection.extend({
    query: undefined,
    types: undefined,
    wrapp: undefined,
    model: Model,
    fetch: function(){
        var self = this;
        $.get(this.query, function(response) {
            response.forEach((item)=>{ 
                item['wrapp'] = self.wrapp;
                item['types'] = self.types;
            });
            self.set(response);
            self.trigger('ready');
        });
    },
    initialize: function(models, options){
        this.query = options.query;
        this.types = options.types;
        this.wrapp = options.wrapp;
        this.fetch();
    },
    getDraggable: function(){
        return this.findWhere({'drag':true});
    }
});