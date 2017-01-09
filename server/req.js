$(document).ready(function() {

    $.mockjax({ 
        type: 'get',
        url: '/api/targets', 
        dataType: 'json', 
        responseTime: 100,
        responseText: server.targets
    });

    $.mockjax({ 
        type: 'get',
        url: '/api/colors', 
        dataType: 'json', 
        responseTime: 100,
        responseText: server.colors
    });

    $.mockjax({
        url: '/set/color',
        type: 'post',
        responseTime: 100,
        contentType: 'text/json',
        dataType: 'json',
        response: function(req){
            var state = this.setTargetColorByClass(req);
            this.responseText = { success: state };
        },
        setTargetColorByClass: function(req){
            var state = false;
            if(req.data.class){
                var reqClass = (req.data.class.replace(/\./g,'')).split(','),
                    reqColor = req.data.color;
                server.targets.forEach( (item) =>{
                    reqClass.forEach(function(name){
                        if(item.class.indexOf(name)>=0){
                            item.color = reqColor;
                            state = true;
                        }
                    });
                });
            }
            return state
        }
    });

    $.mockjax({
        url: '/drop/target',
        type: 'post',
        responseTime: 100,
        contentType: 'text/json',
        dataType: 'json',
        response: function(req){
            this.dropTargetColor();
            this.responseText = { success:true };
        },
        dropTargetColor: function(){
            server.targets.forEach( (item) =>{
                item.color = '#fff';
            })
        }
    });

});