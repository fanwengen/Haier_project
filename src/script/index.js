// 心选精品tab切换
! function($) {
    var $titles = $('.tab_title .tab_li');
    var $products = $('.tab_content .product');
    $titles.on('click', function() {
        $(this)
            .addClass('active').siblings('.tab_li').removeClass('active'); 
        $products
            .eq($(this).index()) .addClass('show').siblings('.product').removeClass('show');
    });
}(jQuery);