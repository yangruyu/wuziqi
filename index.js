$(function() {
    audio.src='王中山 - 高山流水.mp3'
    audio.play();
    var $audio=$('audio')
    $audio.on('ended',function(){
        audio.src='王中山 - 高山流水.mp3'
        audio.play();
    })
    kongbai = {};
    for (var i = 0; i < 15; i++) {
        $('<b>').addClass('han').appendTo('.qipan');
        $('<i>').addClass('lie').appendTo('.qipan');
        for (var j = 0; j < 15; j++) {
            kongbai[i + '-' + j] = {x: i, y: j};
            $('<div>').addClass('qizi').attr('id', i + '-' + j).data('pos', {x: i, y: j}).appendTo('.qipan')
        }
    }
    var hei = {};
    var bai = {};
    var kaiguan = true;
    var isAi=true;
    var time = 0;
    var  min=0;
    var second=0;
    var flag=true;
    $(".jsq span").html("0:00");
    function jishi(){
        tt=setInterval(function(){
            time +=1;
            second=time%60;
            if(time%60 == 0){
                min = parseInt(min);
                min += 1;
                min = (min<10)?'0'+min:min;
            }
            second = (second<10)?'0'+second:second;
            $(".jsq span").html(min +':'+second);

        },1000);
    }
     $('.ksyx').on('click',function(){
         if(flag){
             jishi();
             kaishi();
             $('.ztja').addClass('ksba');
         }
    })
    $('.rrdz').on('click',function(){
        jishi();
        kaishi();
        isAi=false;
        $('.rjdz').off('click');
        $('.ztjc').addClass('ksbc');
    })
    $('.rjdz').on('click',function(){
        jishi();
        kaishi();
        isAi=true;
        $('.rrdz').off('click');
        $('.ztjb').addClass('ksbb');
    })





    function kaishi() {
            flag=false;
            var panduan = function (pos, biao) {
            var h = 1, s = 1, zx = 1, yx = 1;
            var tx, ty;
            /*横向*/
            tx = pos.x;
            ty = pos.y;
            while (biao[tx + '-' + (ty - 1)]) {
                h++, ty--;
            }
            tx = pos.x;
            ty = pos.y;
            while (biao[tx + '-' + (ty + 1)]) {
                h++, ty++;
            }

            /*纵向*/
            tx = pos.x;
            ty = pos.y;
            while (biao[(tx - 1) + '-' + ty]) {
                s++, tx--;
            }
            tx = pos.x;
            ty = pos.y;
            while (biao[(tx + 1) + '-' + ty]) {
                s++, tx++;
            }

            /*左斜*/
            tx = pos.x;
            ty = pos.y;
            while (biao[(tx + 1) + '-' + (ty - 1)]) {
                zx++;
                tx++;
                ty--;
            }
            tx = pos.x;
            ty = pos.y;
            while (biao[(tx - 1) + '-' + (ty + 1)]) {
                zx++;
                tx--;
                ty++;
            }


            /*右斜*/
            tx = pos.x;
            ty = pos.y;
            while (biao[(tx + 1) + '-' + (ty + 1)]) {
                yx++;
                tx++;
                ty++;
            }
            tx = pos.x;
            ty = pos.y;
            while (biao[(tx - 1) + '-' + (ty - 1)]) {
                yx++;
                ty--;
                tx--;
            }

            return Math.max(h, s, zx, yx);


        }

        var ai = function () {
            var max1 = -Infinity;
            var zuobiao1;
            for (var i in kongbai) {
                var weixie = panduan(kongbai[i], hei);
                if (weixie > max1) {
                    max1 = weixie;
                    zuobiao1 = kongbai[i];
                }
            }
            var max2 = -Infinity;
            var zuobiao2;
            for (var i in kongbai) {
                var weixie = panduan(kongbai[i], bai);
                if (weixie > max2) {
                    max2 = weixie;
                    zuobiao2 = kongbai[i];
                }
            }
            return (max1 > max2) ? zuobiao1 : zuobiao2;
        }



        $('.qipan .qizi').on('click', function () {
            var pos = $(this).data('pos');
            if ($(this).hasClass('hei') || $(this).hasClass('bai')) {
                return;
            }
            if (kaiguan) {
                $(this).addClass('hei');
                hei[pos.x + '-' + pos.y] = true;
                delete kongbai[pos.x + '-' + pos.y];
                if (panduan(pos, hei) >= 5) {
                    $('.hqy').addClass('xia');
                    clearInterval(tt);
                    $('.qipan .qizi').off('click');
                    return;
                }
                if (isAi) {
                    var bos = ai();
                    $('#' + bos.x + '-' + bos.y).addClass('bai');
                    bai[bos.x + '-' + bos.y] = true;
                    delete kongbai[bos.x + '-' + bos.y];
                    if (panduan(bos, bai) >= 5) {
                        $('.bqy').addClass('xialai');
                        clearInterval(tt);
                        $('.qipan .qizi').off('click');
                    }
                    return;
                }
            } else {
                $(this).addClass('bai');
                bai[pos.x + '-' + pos.y] = true;
                if (panduan(pos, bai) >= 5) {
                  $('.bqy').addClass('xialai');
                    clearInterval(tt);
                    $('.qipan .qizi').off('click');
                }
            }
            kaiguan = !kaiguan;
        })
    }

    $('.csks').on('click',function(){
        location.reload();
        clearInterval(tt);
        $('.ztjd').addClass('ksbd');
    })




})