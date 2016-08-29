var require = {                  
    baseUrl: "<@spring.url '/static/js/'/>",                
    waitSeconds: 0, // to avoid timeout on slow connections                               
    urlArgs: "bust=123",

    paths  : {   
        "jquery": "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "domReady": "lib/require/domReady",            
        "handlebars": "lib/handlebars",                         
        "json2": "lib/json2",
        "i18nprecompile": "lib/i18nprecompile",                                
        "hbs" : "lib/hbs",     
        "bootstrap" : "lib/bootstrap",
        "taffy" : "lib/taffy",
        "modernizr" : "lib/modernizr",
        "moment": "lib/moment.min",
        "stroll": "lib/stroll/stroll",
        "kinetic": "lib/kinetic-v5.0.1.min",
        "cryptojs.core": "lib/cryptojs.core",
        "cryptojs.enc-base64": "lib/cryptojs.enc-base64",
        "cryptojs.hmac-sha1": "lib/cryptojs.hmac-sha1",

        // PLUGINS
        "backbone.marionette": "lib/plugins/backbone.marionette",
        "underscore.string": "lib/plugins/underscore.string",                    
        "jquery.ui.block": "lib/plugins/jquery.blockUI",
        "kanzen.scroll": "lib/plugins/kanzen.scroll",
        "jquery.placeholder": "lib/plugins/jquery.placeholder",
        "jquery.rangeslider": "lib/plugins/jquery.rangeslider",
        "jquery.touchSwipe": "lib/plugins/jquery.touchSwipe",      
        "jquery.zclip": "lib/plugins/jquery.zclip",

        // Other routes
        "models": "desktop/models",                    
        "routers": "desktop/routers",
        "views": "desktop/views",  
        "collections": "desktop/collections",   

        // commons
        "pubsub": "common/utils/pubsub",
        "utils": "common/utils",
        "base64": "common/utils/Base64",
        "trigonometry": "common/utils/trigonometry",
        "hmac": "common/hmac",

        // flash swfplayer
        "swfplayer": "lib/swfobject",

        "templates": "../templates"
    },

    shim: { // Sets the configuration for your third party scripts that are not AMD compatible
        "cryptojs.core": {
            exports: "CryptoJS"
        },
        "cryptojs.enc-base64": {
            deps: ["cryptojs.core"],
            exports: "CryptoJS"
        },
        "cryptojs.hmac-sha1": {
            deps: ['cryptojs.core'],
            exports: "CryptoJS"
        },
        "json2": {
            exports: "JSON"
        },                    
        "bootstrap": {
            deps: ["jquery"],
            exports: "$"
        },
        "modernizr": {
            exports: "Modernizr"
        },
        "jquery.placeholder": {
            deps: ["jquery"],
            exports: "$"
        },
        "jquery.touchSwipe": {
            deps: ["jquery"],
            exports: "$"
        }
    },

    hbs : {
        templateExtension : 'html',
        helperDirectory: 'utils/templates/'
    }
};  
<#--
APP_CONFIG.baseURL = "<@spring.url '/'/>";
APP_CONFIG.baseURI = "${springMacroRequestContext.getRequestUri()}/";
APP_CONFIG.staticResourcesURL = "<@spring.url '/static'/>";

APP_CONFIG.services = {
    staticResoucesProxy: {
        url: "<@spring.url '/'/>api/v1/proxy?to="
    }
};-->
