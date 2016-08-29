define(function(require){

    var _ = require("underscore");
    var $ = require("jquery");
    var Marionette = require("backbone.marionette");

    var CookieManager = Marionette.Object.extend({

        read: function (name) {
            var nameEQ = name + "=";
            var cookie_parts = document.cookie.split(';');
            for(var i=0;i < cookie_parts.length;i++) {
                var cookie_part = cookie_parts[i];
                while (cookie_part.charAt(0)==' ') cookie_part = cookie_part.substring(1,cookie_part.length);
                if (cookie_part.indexOf(nameEQ) == 0) return cookie_part.substring(nameEQ.length,cookie_part.length);
            }
            return null;
        },

        create: function (name, value, days) {
            if (value != null){
                var expires = null;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires="+date.toGMTString();
                }
                else expires = "";
                document.cookie = name+"="+value+expires+"; path=/";
            }
        },

        remove: function (name) {
            this.create(name,"",-1);
        },

        add: function (name, value, days) {
            var ignored_values = this.read(name);
            if (ignored_values) {
                var parts = ignored_values.split(',');
                var isRepeated = false;
                for(var j=0;j< parts.length;j++) {
                    if (value == parts[j]){isRepeated = true;}
                }
                if (!isRepeated) ignored_values = ignored_values.concat(",",value);
            }
            else ignored_values = value;

            this.remove();
            this.create(name, ignored_values, days);
        }

    });

    return CookieManager;
});
