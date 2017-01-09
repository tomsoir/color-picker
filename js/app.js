var App = Backbone.Model.extend({

    defaults: {
        drop: false,
        class: undefined,
        selected: undefined,
    },
    initialize: function(){
        this.targets= new Collection([], { query:'/api/targets', types: 'target', wrapp: '.targets' });
        this.colors = new Collection([], { query:'/api/colors',  types: 'color',  wrapp: '.colors' });
        this.layout = new LayoutView({model : this });
        this.desc   = new DescView({model : this });

        this.layout.render();
        this.desc.render();

        this.bindEvents();
    },
    bindEvents: function(){
        this.listenTo(this, 'change:drop', this.onDrag);
        this.listenTo(this, 'change:class', this.onInput);
        this.listenTo(this, 'change:selected', this.onChange);
        this.listenTo(this.targets,'clicked', this.onClick);
        this.listenTo(this.colors, 'clicked', this.onClick);
    },
    onDrag: function(){
        var self = this;
        var item = this.getDragItem();
        if(item) this.listenToOnce(item, 'change:drag', () => {
            self.set('selected', item);
        });
    },
    onClick: function(item){
        this.set('selected', item);
    },
    onInput: function(){
        if(this.get('class')){
            this.onChange();
        }
    },
    onChange: function(){
        var self = this;
        var item = this.get('selected');
        if(item){
            switch(item.get('types')){
                case 'target': 
                    self.dropTargets()
                    break;
                case 'color' : 
                    self.setTargetColor(item)
                    break;
            }
        }
    },
    getDragItem: function(){
        if(this.get('drop')){
            var target = this.targets.getDraggable();
            var color = this.colors.getDraggable();
            return (target || color)
        }
    },

    // @TODO rewrite on Socet.io
    dropTargets: function(){
        var self = this;
        $.post('/drop/target', {}, function (response) {
            if(response.success) self.targets.fetch();
        }, 'json');

        this.layout.paint('#fff');
    },

    // @TODO rewrite on Socet.io
    setTargetColor: function(item){
        var self = this;
        $.post('/set/color', {
            class: self.get('class'),
            color: item.get('color'),
        }, function (response) {
            if(response.success){
                self.targets.fetch()
            }else{
                self.dropTargets()
            }
            self.layout.paint();
        }, 'json');
    }
});