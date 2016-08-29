<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello Sir ${name}!</title>
    <script type="text/javascript">


        <#include "requireJSConfig.ftl">

        function showLoader (that){
            var oldClass = that.className;
            var afterShow = function(){
                that.className = oldClass + " animated-slow pulse animated-continous animated-delayed-1s";
            };
            that.addEventListener("animationend", afterShow, false);
            that.addEventListener("webkitAnimationEnd", afterShow, false);
            that.className = oldClass + " animated swoopIn";
        }

    </script>

</head>
<body>
<h2>Hello ${name}!</h2>
<div id="main" class="size-default">
    <img src="<@spring.url '/static/img/SYW_LoadingAnimation.png'/>" width="280" alt="Sweeps Loading..." class="initial-loader" onload="showLoader(this);" />
</div>
<script type="text/javascript" src="<@spring.url '/static/js/lib/require/require.js'/>" data-main="desktop-main.js"></script>
<script type="text/javascript" src="//www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script>
<script type="text/javascript" src="//apis.google.com/js/client:plusone.js"></script>
</body>
</html>
