define(function(require){
    
    var _ = require("underscore");
    var $ = require("jquery");
    
    var UTILS = {
        strings: require('underscore.string'),
        general: {
            IDTools: require("utils/UUID")
        },
        numbers: {},
        arrays: {}
     };
    
    /***     
     * @returns String
     * @param string {string}
     * @param data {object}
     * @description Assigns variables to tokens in a string.     
     * @example     
     *   UTILS.strings.assign('Welcome, Mr. {name}.',{ name: 'Franklin' })   -> 'Welcome, Mr. Franklin.'
     *   UTILS.strings.assign('{n} and {r}',{ n: 'ONE', r: 'TWO' }) -> 'ONE and TWO'
     *   
     ***/
    UTILS.strings.assign = function(string, data){
        var assign = data;        
        return string.replace(/\{([^{]+?)\}/g, function(m, key) {            
            return UTILS.general.hasOwnProperty(assign, key) ? assign[key] : m;
        });
    };   
    
    /***
     * @return boolean
     * @param obj {object}
     * @param key {string}
     * @description Returns a boolean indicating whether the object has the specified property.
     * 
     ***/
    UTILS.general.hasOwnProperty = function(obj, key){
        return Object['hasOwnProperty'].call(obj, key);
    },
    
    /***
     * @return string     
     * @param string {string}
     * @description Will return the First name and First letter of the last name as following
     * "Graham James Edward Miller" -> Graham M.
     * In case of the string coming empty will return Anonymous
     * 
     ***/
    UTILS.strings.hideSurname = function(string){
        // TODO This can be done with just REGEX will be a nice to have do it that way
        var output = "Anonymous";
        var pattern = /(.*?)(?: .*)* (.*)/;
        var input = $.trim(string);
        var groups = pattern.exec(input);
        
        if(groups){
            output = groups[1] + " " + groups[2].substring(0,1)+".";
        }else if(!UTILS.strings.isBlank(input)){
            output = input;
        }
        
        return output;
    };


    UTILS.strings.getFirstAndLastName = function(string){
        // TODO This can be done with just REGEX will be a nice to have do it that way
        var name = {
                    firstName:'',
                    lastName:''
                    };
        var pattern = /(.*?)(?: .*)* (.*)/;
        var groups = pattern.exec(string);

        if(groups){
            name.firstName = groups[1];
            name.lastName = groups[2];
        }

        return name;
    };
    
    UTILS.strings.cityAndState = function(city, state){
        var cityAndStateArr = [];
        if(!UTILS.strings.isBlank(city)){
            cityAndStateArr.push(city);
        }

        if(!UTILS.strings.isBlank(state)){
            cityAndStateArr.push(state);
        }
        return cityAndStateArr.join(" ,");
    };


    UTILS.strings.getMoneyFormat = function(number,counter, dec, comma){
        counter = isNaN(counter = Math.abs(counter)) ? 2 : counter;
        dec = dec == undefined ? "." : dec;
        comma = comma == undefined ? "," : comma;
        var negative = number < 0 ? "-" : "";
        var i = parseInt(number = Math.abs(+number || 0).toFixed(counter)) + "";
        var range = (range = i.length) > 3 ? range % 3 : 0;
        return negative + (range ? i.substr(0, range) + comma : "") + i.substr(range).replace(/(\d{3})(?=\d)/g, "$1" + comma) + (counter ? dec + Math.abs(number - i).toFixed(counter).slice(2) : "");
    };
    
    UTILS.general.getOrdinalizedSuffix = function(number){
        if(number >= 11 && number <= 13) {
            return 'th';
        } else {
            switch(number % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }
    };
    
    UTILS.general.ordinalize = function(number) {
        var last = parseInt(Math.abs(number).toString().slice(-2));
        return number + UTILS.general.getOrdinalizedSuffix(last);
    };
    
    UTILS.general.IDTools.URL2ID = function(URL){
    	var re = /[^a-zA-Z0-9]/g;
    	return URL.replace(re, "");
    };

    UTILS.general.serializeFormObject = function($form) {
        var o = {};
        var a = $form.serializeArray();
        $.each(a, function() {
            var nameParts = this.name.split('[');
            if (nameParts.length == 1) {
                // New value is not an array - so we simply add the new
                // value to the result object
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            }
            else {
                // New value is an array - we need to merge it into the
                // existing result object
                $.each(nameParts, function (index) {
                    nameParts[index] = this.replace(/\]$/, '');
                });
                // This $.each merges the new value in, part by part
                var arrItem = this;
                var temp = o;
                $.each(nameParts, function (index) {
                    var next;
                    var nextNamePart;
                    if (index >= nameParts.length - 1) {
                        next = arrItem.value || '';
                    }
                    else {
                        nextNamePart = nameParts[index + 1];
                        if ($.trim(this) != '' && temp[this] !== undefined) {
                            next = temp[this];
                        }
                        else {
                            if ($.trim(nextNamePart) == '') {
                                next = [];
                            }
                            else {
                                next = {};
                            }
                        }
                    }
                    if ($.trim(this) == '') {
                        temp.push(next);
                    } else {
                        temp[this] = next;
                    }
                    temp = next;
                });
            }
        });
        return o;
    };
    
    UTILS.strings.nameOwnershipTransform = function(name){
        var nameTransform = (name.split(" ",1))[0],
            lastChar = nameTransform[nameTransform.length - 1];            
            if( lastChar !== "s" && lastChar !== "S" ){
                nameTransform+= "'s";
            }else{
                nameTransform+= "'";
            }
        return nameTransform;
    };
    
    UTILS.arrays.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    // TODO: Remove this when updating underscore/lodash
    UTILS.arrays.isMatch = function (object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };
    
    return UTILS;
});
