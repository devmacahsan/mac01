/*
 * @Author: Nicolas Landoni
 */
(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    
    var that = this;
    
//    function scrollbarWidth() { 
//        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>'); 
//        // Append our div, do our calculation and then remove it 
//        $('body').append(div); 
//        var w1 = $('div', div).innerWidth(); 
//        div.css('overflow-y', 'scroll'); 
//        var w2 = $('div', div).innerWidth(); 
//        $(div).remove(); 
//        return (w1 - w2); 
//    }
//       
//     $.fn.drags = function(opt) {
//
//        opt = $.extend({handle:"",cursor:"move"}, opt);
//
//        if(opt.handle === "") {
//            var $el = this;
//        } else {
//            var $el = this.find(opt.handle);
//        }
//
//        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
//            if(opt.handle === "") {
//                var $drag = $(this).addClass('draggable');
//            } else {
//                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
//            }
//            var z_idx = $drag.css('z-index'),
//                drg_h = $drag.outerHeight(),
//                pos_y = $drag.offset().top + drg_h - e.pageY;
//            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
//                $('.draggable').offset({
//                    top:e.pageY + pos_y - drg_h
//                }).on("mouseup", function() {
//                    $(this).removeClass('draggable').css('z-index', z_idx);
//                });
//            });
//            e.preventDefault(); // disable selection
//        }).on("mouseup", function() {
//            if(opt.handle === "") {
//                $(this).removeClass('draggable');
//            } else {
//                $(this).removeClass('active-handle').parent().removeClass('draggable');
//            }
//        });
//
//    }
//       
//    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    
    var methods = {
        init : function( options ) {     
            options = options || {};
            return this.each(function(){                                        
                if($(this).data("kanzen-scroller-initialized") === undefined){
                    var $that = $(this);
                    if(options.onScroll !== undefined){
                        $that.data("onScroll", options.onScroll);
                    }
                    $that.addClass("kanzen-scroller").wrap("<div class='kanzen-scroller-wrapper'>");                    
//                    $that.parent().append("<div class='kanzen-scroller-track'> <div class='kanzen-scroller-thumb'> </div>");
                    $that.data("kanzen-scroller-initialized", true);                    
                    
                    $that.on("scroll", function(){                             
                        $that.kanzenScroller("_onScroll");
                    }); 
                    
//                    var $thumb = $that.parent().find(".kanzen-scroller-thumb");
//                    if(!isMobile){
//                        var barWidth = scrollbarWidth();
//                        if(barWidth === 0){
//                            $that.css({
//                                "margin-right": "-20px",
//                                "padding-right": "25px" 
//                            });
//                        }else{
//                            $that.css({
//                                "margin-right": - barWidth + "px"                            
//                            });
//                        }  
//                        
//                        $thumb.drags();
//                        $thumb.on("click", function(e){
//                            alert("YO DAWG");
//                        });
//                        
//                        
//                        
//                    }else{
//                        $(this).parent().find(".kanzen-scroller-track").hide();
//                    }

//                    $that.kanzenScroller("update");
                }                                                           
            });
        },
        _onScroll: function(){
//            $(this).kanzenScroller("_updateThumb");
            var callback = $(this).data("onScroll");
            if( callback !== undefined){
                callback({
                    maxScroll: $(this).data("kanzen-scroller-max-scroll"), 
                    scrollTop: $(this).scrollTop(), 
                    scrollBottom: $(this).data("kanzen-scroller-max-scroll") - $(this).scrollTop()
                });
            }
        },
                       
        
        update: function(){
            $(this).parent().find(".kanzen-scroller-track").height($(this)[0].clientHeight);
            var viewPortHieght = $(this)[0].clientHeight;
            var contentHeight = $(this)[0].scrollHeight;
            var viewportRatio = viewPortHieght / contentHeight;            
            var maxScroll = contentHeight - viewPortHieght;
            $(this).data("kanzen-scroller-viewport-ratio", viewportRatio);
            $(this).data("kanzen-scroller-max-scroll", maxScroll);
            
//            var $thumb = $(this).parent().find(".kanzen-scroller-thumb");
//            var thumbHeight = Math.max(20, Math.floor($(this)[0].clientHeight * viewportRatio));
//            $thumb.height( thumbHeight );
//            $(this).kanzenScroller("_updateThumb");
        },
//            
//        _updateThumb: function(){
//            if(!isMobile){
//                var viewportRatio = $(this).data("kanzen-scroller-viewport-ratio");
//                var $scrollbar = $(this).parent().find(".kanzen-scroller-track");
//                var $thumb = $(this).parent().find(".kanzen-scroller-thumb");
//                if (viewportRatio < 1) {
//                    $scrollbar.show();                                
//                    var proportionalTop = Math.round($(this).scrollTop() * viewportRatio);                
//                    $thumb.css({
//                        top: proportionalTop
//                    })      
//                } else {
//                    $scrollbar.hide();
//                }       
//            }                         
//        },
            
        destroy : function( ) {
            return this.each(function(){
                $.error( 'Destroy not implemented yet' );
            });
        },            
        refresh : function() {
                
                
        }
    };
    
    $.fn.kanzenScroller = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on Kanzen.Scroller' );
        }    

    };
    
}));