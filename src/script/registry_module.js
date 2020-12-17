define([], function() {
    return {
        init: function() {
            //1.表单验证。
            let $form = $('#form1'); //form表单。
            let $username = $('[name=username]'); //用户名。
            let $email = $('[name=email]'); //邮箱
            let $password = $('[name=password]'); //邮箱
            let $tel = $('[name=tel]'); //手机号码
            let $span = $('#form1 span'); //4个span

            // 定义检测标记
            $userflag = true;
            $passflag = true;
            $emailflag = true;
            $telflag = true;

            //用户名检测
            $username.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $strLen = $value.replace(/[\u4e00-\u9fa5]/g, '**').length; //中文当做两个字符
                    if ($strLen > 0 && $strLen <= 14) {
                        let $reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
                        if ($reg.test($value)) {
                            $userflag = true;

                            //用户名格式没有问题，将用户名传给后端。
                            $.ajax({
                                type: 'post',
                                url: 'http://10.31.161.116/dashboard/Haier/php/reg.php',
                                data: {
                                    username: $username.val()
                                }
                            }).done(function(data) {
                                if (!data) { //不存在
                                } else { //存在
                                    $span.eq(3).html('该用户名已存在').css({'color': 'red','margin-left': '80px'});
                                }
                            });
                        } else {
                            $span.eq(3).html('用户名格式有误').css({'color': 'red','margin-left': '80px'});
                            $userflag = false;
                        }
                    } else {
                        $span.eq(3).html('用户名长度有误').css({'color': 'red','margin-left': '80px'});
                        $userflag = false;
                    }
                } else {
                    $span.eq(3).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                }
            });

            //手机

            $tel.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        // $span.eq(0).html('√').css('color', 'green');
                        $telflag = true;
                    } else {
                        $span.eq(0).html('X 手机号好像不对哦！').css({'color': 'red','margin-left': '80px'});
                        $telflag = false;
                    }
                } else {
                    $span.eq(0).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                    $telflag = false;
                }
            });

            //检测密码强弱
            $password.on('input',function(){
                let $value = $(this).val();
                if($value.length >=6 && $value.length<=16){
                    let $regnum = /\d+/;
                    let $reguppercase = /[A-Z]+/;
                    let $reglowercase = /[a-z]+/;
                    let $other = /[\W_]+/; //特殊字符%&^$#@!*
                    let $count = 0; //字符种类的统计结果。
                    if ($regnum.test(this.value)) { //值存在数字
                        $count++;
                    }
                    if ($reguppercase.test(this.value)) {
                        $count++;
                    }
                    if ($reglowercase.test(this.value)) {
                        $count++;
                    }
                    if ($other.test(this.value)) {
                        $count++;
                    }

                    switch ($count) {
                        case 1:
                            $span.eq(1).html('弱').css({'color': 'red','margin-left': '80px'});
                            $passflag = true;
                            break;
                        case 2:
                        case 3:
                            $span.eq(1).html('中').css({'color': 'orange','margin-left': '80px'});
                            $passflag = true;
                            break;
                        case 4:
                            $span.eq(1).html('强').css({'color': 'green','margin-left': '80px'});
                            $passflag = true;
                            break;
                    }


                }else{
                    $span.eq(1).html('密码长度有误').css({'color': 'red','margin-left': '80px'});
                    $passflag=false;
                }
            })


            $password.on('blur',function(){
                let $value = $(this).val();
                if ($value !== '') {
                    if ($passflag) {
                        $telflag = true;

                        //密码格式没有问题，将用户名传给后端。
                        $.ajax({
                            type: 'post',
                            url: 'http://10.31.161.116/dashboard/Haier/php/reg.php',
                            data: {
                                password: $password.val()
                            }
                        });
                    }
                } else {
                    $span.eq(1).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                    $passflag = false;
                }
            })


            //邮箱
            $email.on('blur', function() {
                let $value = $(this).val(); //当前表单的值
                if ($value !== '') {
                    let $reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                    if ($reg.test($value)) {
                        $emailflag = true;
                    } else {
                        $span.eq(2).html('邮件格式有误').css({'color': 'red','margin-left': '80px'});
                        $telflag = false;
                    }
                } else {
                    $span.eq(2).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                    $emailflag = false;
                }
            });

            //阻止表单的直接跳转。
            $form.on('submit', function() {
                if ($username.val() === '') {
                    $span.eq(3).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                    $userflag = false;
                }
                if ($tel.val() === '') {
                    $span.eq(0).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                    $telflag = false;
                }
                if ($password.val() === '') {
                    $span.eq(1).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                    $passflag = false;
                }
                if ($email.val() === '') {
                    $span.eq(2).html('X 这里还没填呢！').css({'color': 'red','margin-left': '80px'});
                    $emailflag = false;
                }

                if (!$userflag || !$telflag || !$passflag || !$emailflag) {
                    return false;
                }
            });
        }
    }
});