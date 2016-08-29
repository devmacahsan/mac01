define(function(require){
    var _ = require("underscore");
    
    var Pubsub = function(){
        this.idCounter = 0;
        this.channels = {};
        
        this.getNewId = function(){
            this.idCounter += 1;
            return this.idCounter;
        };
        
        this.subscribe = function (channel, subscription) {
            var id = this.getNewId();
            if (!this.channels[channel]) this.channels[channel] = [];
            this.channels[channel].push({
                'id': id, 
                'callback': subscription
            });
            return;
        };
        
        this.unsubscribe = function (channel, id) {
            if (!id) throw ('Exception: id is a required param');
            if (!this.channels[channel]) return;

            // Reduce array of subscriptions to not include the named one
            this.channels[channel] = _.filter(this.channels[channel], function (e) {
                return e.id !== id;
            });
        };
        
        this.publish = function (channel, data) {
            data = data || {};
            if (!this.channels[channel]) return;      
            var channels = _.clone(this.channels);
            for (var i = 0, l = channels[channel].length; i < l; i++) {                
                channels[channel][i].callback({id: channels[channel][i].id, data: data});
            }
        };
        
        
    };
    
    return Pubsub;
});