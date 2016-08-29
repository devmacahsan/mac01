<#import "/spring.ftl" as spring />
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
    <img src="<@spring.url '/static/img/SYW_LoadingAnimation.png'/>" width="280" alt="Sweeps Loading..." />
</div>
<script type="text/javascript" src="<@spring.url '/static/js/lib/less-2.6.1.min.js'/>" ></script>
<script type="text/javascript" src="<@spring.url '/static/js/lib/require/require.js'/>" data-main="desktop-main.js"></script>
</body>
</html>
