! function($) {
    const $list = $('.list ul');
    //1.渲染list.html页面
    //2.懒加载 - lazyload
    //懒加载的核心就是图片，等待图片进入可视区进行图片加载。
    //懒加载原理：提前将图片的路径引入(自定义属性引入)，可视区的高度+滚动条的top值  和 当前进入可视区的盒子top值进行比较的结果。
    //<img data-orginal="图片的路径" /> 一旦当前的图片进入可视区，将data-orginal的值给src，图片显示出来的。

    //3.利用jquery下面的插件 - jquery.lazyload.js
    //引入插件
    //设置自定义的属性加载图片的路径
    //设置图片的宽高
    //给图片添加一个类.lazy
    $.ajax({
        url: 'http://localhost/dashboard/Haier/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '';
        $.each(data, function(index, value) {
            $strhtml += `
                <li>
                    <a href="detail.html?sid=${value.sid}">
                        <img class="lazy" src="${value.url}" width="200" height="200"/>
                        <p>${value.title}</p>
                        <span>￥${value.price}</span>
                    </a>
                </li>
            `;
        });
        $list.html($strhtml);
        渲染的下面进行懒加载操作
        $(function() { //页面加载完成
            $("img.lazy").lazyload({
                effect: "fadeIn" //显示方法：谈入
            });
        });
    });


}(jQuery);