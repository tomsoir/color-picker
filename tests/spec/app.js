describe("App", function() {
    var app;

    beforeEach(function() {
        app = new App();
    });

    it("should be init", function() {
        expect(typeof(app)).toEqual('object');
        expect(app.targets).toBeDefined();
        expect(app.colors).toBeDefined();
    });

    it("input UI ok -> ?", function() {
        var selector = '.textarea';
        var text = 'text complete';
        $(selector).val(text);
        expect($(selector).val()).toEqual(text);
    });

    describe("collections -> ?", function() { 
        describe("targets -> ?", function() { 
            beforeEach(function(done) {
                app.targets.once('ready', function(){ done() });
                app.targets.fetch();
            });
            it("should be eq. to Server", function() { 
                expect(app.targets.length).toEqual(server.targets.length);
            });
        });
        describe("colors -> ?", function() { 
            beforeEach(function(done) {
                app.colors.once('ready', function(){ done() });
                app.colors.fetch();
            });
            it("should be eq. to Server", function() { 
                expect(app.colors.length).toEqual(server.colors.length);
            });
        });
    });

    describe("UI -> ?", function() { 
        describe("color selection by click", function() { 
            var selectedColor = undefined,
                colorSelector = '.colors .draggable',
                targetSelector= '.targets .draggable',
                targetDataAttr= 'date-color';

            beforeEach(function(done) {
                var uptime = 100;
                var makeClick = function(){ 
                    selectedColor = $(colorSelector).last().attr(targetDataAttr);
                    var className = (server.targets[0].class[0]+',.');
                    app.set('class', className);
                    $(colorSelector).last().val(className);
                    $(colorSelector).last().click();
                };
                app.targets.on('ready', function(){
                    app.targets.toJSON().forEach(function(item){
                        if(item.color == selectedColor) done();
                    });
                });
                setTimeout(makeClick, uptime);
            });

            it("end diplay", function() {
                var selectedLength = $(targetSelector+'['+targetDataAttr+'="'+selectedColor+'"]').length;
                var serverLength = 0;
                server.targets.forEach(function(target){
                    if(target.color == selectedColor)
                        serverLength++;
                });
                expect(selectedLength).toEqual(serverLength);
            });


            describe("color selection by drag", function() { });

            // ...and so on

        });
    });
});