// Generated by CoffeeScript 1.4.0
(function() {
  var addCommasToInteger;

  addCommasToInteger = function(x) {
    var rgx;
    x += '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x)) {
      x = x.replace(rgx, '$1' + ',' + '$2');
    }
    return x;
  };

  $(document).ready(function() {
    var slug;
    if ($('body').hasClass('home')) {
      $.ajax({
        type: 'GET',
        url: '/views/total',
        dataType: 'json',
        success: function(data) {
          var views;
          views = addCommasToInteger(data.views);
          return $('.views').text("" + views);
        },
        error: function(data) {
          return $('.views').text('Lots of');
        }
      });
    }
    if ($('body').hasClass('post')) {
      slug = $('.views').data('slug');
      return $.ajax({
        type: 'POST',
        url: '/views',
        data: {
          slug: slug
        },
        dataType: 'json',
        success: function(data) {
          var views;
          views = addCommasToInteger(data.views);
          return $('.views').text("" + views + " views");
        },
        error: function(data) {
          return $('.views').text('Lots of views');
        }
      });
    }
  });

  $(window).load(function() {
    var $ad, $copy, $header, $meta, $navLinks, $nextLink, $window, copyBottom, copyHeight, copyOffset, copyTop, headerBottom, maxOpacity, minOpacity, onScrollOrResize;
    if ($('body').hasClass('post')) {
      maxOpacity = 0.8;
      minOpacity = 0.3;
      $header = $('#header');
      headerBottom = $header.offset().top + $header.height();
      $meta = $('.meta');
      $copy = $('.copy');
      copyOffset = 100;
      copyTop = $meta.offset().top - copyOffset;
      copyBottom = $copy.offset().top + $copy.height() - copyOffset;
      copyHeight = copyBottom - copyTop;
      $window = $(window);
      $navLinks = $('.prev, .next');
      $nextLink = $('.next');
      $ad = $('.carbonad');
      onScrollOrResize = function(event) {
        var adBottom, nextLinkTop, opacity, windowBottom, windowHeight, windowScrollTop, windowWidth;
        windowHeight = $window.height();
        windowWidth = $window.width();
        windowScrollTop = $window.scrollTop();
        windowBottom = windowScrollTop + windowHeight;
        $nextLink.removeClass('hidden');
        if (windowScrollTop < 0) {
          opacity = maxOpacity;
        } else if (windowScrollTop <= headerBottom) {
          opacity = maxOpacity - ((windowScrollTop / headerBottom) * (maxOpacity - minOpacity));
        } else if (windowBottom < copyTop) {
          opacity = minOpacity;
        } else if (windowBottom < copyBottom) {
          opacity = minOpacity + ((windowBottom - copyTop) / copyHeight * (maxOpacity - minOpacity));
        } else {
          opacity = maxOpacity;
        }
        $navLinks.css({
          opacity: opacity
        });
        if ($nextLink.length && (950 < windowWidth && windowWidth < 1225)) {
          nextLinkTop = $nextLink.offset().top;
          adBottom = $ad.offset().top + $ad.height() - 50;
          console.log(nextLinkTop, adBottom);
          if (nextLinkTop < adBottom) {
            return $nextLink.addClass('hidden');
          }
        }
      };
      $(window).scroll($.throttle(150, onScrollOrResize));
      $(window).resize($.throttle(150, onScrollOrResize));
      return onScrollOrResize();
    }
  });

}).call(this);