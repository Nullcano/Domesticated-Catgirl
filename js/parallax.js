(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


function jlParallax() {
  const parInners  = document.querySelectorAll("[data-type='parallax']");
  var layer, height, depth, heightPar, src, boundingClientRect, y, windowHeight;
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  windowHeight = window.innerHeight;

  function scrollParametrs() {
    boundingClientRect = layer.parentNode.getBoundingClientRect();
    y = ( boundingClientRect.top - windowHeight/2 + heightPar/2) * depth;
    if (layer.hasAttribute('data-inverse')) {
      layer.style.setProperty('--ty', (-y) + 'px');
    } else {
      layer.style.setProperty('--ty', (y) + 'px');
    }
  }

  for ( var i = 0; i < parInners.length; i++ ) {
    layer = parInners[i];
    depth = layer.getAttribute("data-depth");
    heightPar = layer.parentNode.clientHeight;
    if ( layer.hasAttribute('data-image') ) {
      // Create bg image
      src = layer.getAttribute("data-image");
      layer.style.setProperty("background-image", "url(" + src + ")");
    } else if (layer.getElementsByClassName('jl-parallax-content')) {
      scrollParametrs();
    }
  }

  if(!isMobile) {
    for ( i = 0; i < parInners.length; i++ ) {
      layer = parInners[i];

      if ( layer.hasAttribute('data-image') ) {
        depth = layer.getAttribute("data-depth");
        // Parallax inner height
        heightPar = layer.parentNode.clientHeight;
        height = heightPar + ( windowHeight + heightPar ) * Math.abs( depth );
        layer.style.setProperty("height", height + "px");
        scrollParametrs();
      }
    }

    window.addEventListener("resize", function(){
      windowHeight = window.innerHeight;
      for ( var i = 0; i < parInners.length; i++ ) {
        layer = parInners[i];

        if ( layer.hasAttribute('data-image') ) {
          depth = layer.getAttribute("data-depth");
          // Parallax inner height
          height = heightPar + ( windowHeight + heightPar ) * Math.abs( depth );
          layer.style.setProperty("height", height + "px");
          scrollParametrs();
        }
      }
    });

    function parallaxScroll(){
      for ( var i = 0; i < parInners.length; i++ ) {
        layer = parInners[i];
        depth = layer.getAttribute("data-depth");
        heightPar = layer.parentNode.clientHeight;
        scrollParametrs();
      }
    }

    window.addEventListener('scroll', function() {
      window.requestAnimationFrame(parallaxScroll);
    });
  }
}

document.addEventListener("DOMContentLoaded", jlParallax);
