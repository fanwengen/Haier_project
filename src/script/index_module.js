define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
                // 轮播图
                const $lunbo = $('.banner_1');
                const $piclist = $('.banner_1 ul li');
                const $btnlist = $('.banner_1 ol li');
                const $left = $('#left');
                const $right = $('#right');
                let $num = 0;
                let $timer1 = null;
                let $timer2 = null;
                $btnlist.on('mouseover', function() {
                    $num = $(this).index();
                    $timer1 = setTimeout(function() {
                        tabswitch()
                    }, 300);
                });
                $btnlist.on('mouseout', function() {
                    clearTimeout($timer1);
                });
                $right.on('click', function() {
                    $num++;
                    if ($num > $btnlist.length - 1) {
                        $num = 0;
                    }
                    tabswitch()
                });
                $left.on('click', function() {
                    $num--;
                    if ($num < 0) {
                        $num = $btnlist.length - 1;
                    }
                    tabswitch()
                });
                function tabswitch() {
                    $btnlist.eq($num).addClass('active2').siblings().removeClass('active2');
                    $piclist.eq($num).stop(true).animate({
                        opacity: 1
                    }).siblings().stop(true).animate({
                        opacity: 0
                    });
                }
                $timer2 = setInterval(function() {
                    $right.click();
                }, 2000);
                $lunbo.hover(function() {
                    clearInterval($timer2);
                }, function() {
                    $timer2 = setInterval(function() {
                        $right.click();
                    }, 3000);
            });

            // 心选精品tab切换
            var $titles = $('.tab_title .tab_li');
            var $products = $('.tab_content .product');
            $titles.on('click', function() {
                $(this)
                    .addClass('active').siblings('.tab_li').removeClass('active'); 
                $products
                    .eq($(this).index()) .addClass('show').siblings('.product').removeClass('show');
            });
   
            // 人气排行tab切换
            var $titles1 = $('.tab_title1 .tab_li1');
                var $products1 = $('.tab_content1 .product1');
                $titles1.on('click', function() {
                    $(this)
                        .addClass('active1').siblings('.tab_li1').removeClass('active1'); 
                    $products1
                        .eq($(this).index()) .addClass('show1').siblings('.product1').removeClass('show1');
                });
        }
    }
});

