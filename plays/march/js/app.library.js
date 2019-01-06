var appLib = {
    load: function (func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        }
        else {
            window.onload = function () {
                if (oldonload)
                    oldonload();

                func();
            }
        }
    },
    timer: {},

    isNullOrEmpty: function (paramValue) {
		return paramValue === '' || paramValue === undefined || paramValue === null;
    },
	
	isNumber: function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	},
	
    replaceAll: function (paramValue, paramFind, paramReplace) {
        returnValue = paramValue;

        if (!appLib.IsNullOrEmpty(paramValue))
            returnValue = paramValue.toString().split(paramFind).join(paramReplace);

        return returnValue;
    },

    htmlEncode: function (paramValue) {
        return $('<div/>').text(paramValue).html();
    },

    htmlDecode: function (paramValue) {
        return $('<div/>').html(paramValue).text();
    },

    focusToEnd: function (paramSeletor) {
        $(paramSeletor).focus();
        var thisValue = $(paramSeletor).val();
        $(paramSeletor).val('');
        $(paramSeletor).val(thisValue);
    },

    bandMessage: function (paramType, paramMessage, paramTimeout, paramReversed) {
        $('#bandMessage').hide();

        switch (paramType) {
            case 'hide':
                return;
        }

        clearTimeout(this.timer);

        if ($('#bandMessage').length < 1)
            $('body').append('<div id="bandMessage" class="band-message" onclick="$(this).hide()"></div>');

        if ($('#bandMessage .message-wrapper')) {
            $('#bandMessage').html('<div class="message-wrapper alert alert-' + paramType + '">'
                + '    <span class="message"></span>'
                + '    <a class="close">&times;</a>'
                + '</div>');
        }

        if (paramType === 'white' && paramReversed)
            $('#bandMessage').addClass('reversed');
        else
            $('#bandMessage').removeClass('reversed');

        $('#bandMessage .message').text(paramMessage);
        $('#bandMessage').stop().fadeIn(0);

        if (paramTimeout > 0) {
            this.timer = setTimeout(function () {
                $('#bandMessage').stop().fadeOut(500);
            }, paramTimeout);
        }
    },

    numberFormat: function (paramValue) {
        var returnValue = new Array();

        if (!appLib.IsNullOrEmpty(paramValue)) {
            paramValue = appLib.replaceAll(paramValue, ',', '');

            var isPositiveNum = Number(paramValue) >= 0;

            if (!isPositiveNum)
                paramValue = appLib.replaceAll(paramValue, '-', '');

            paramValue = paramValue.toString();
            var charArr = paramValue.split('');
            charArr.reverse();

            for (var i in charArr) {
                if (i != 0 && i % 3 == 0)
                    returnValue.push(',');

                returnValue.push(charArr[i])
            }

            returnValue.reverse();
            returnValue = returnValue.join('');

            if (!isPositiveNum)
                returnValue = '-' + returnValue;
        }
        return returnValue;
    },

    now: function () {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var hh = today.getHours();
        var ii = today.getMinutes();
        var ss = today.getSeconds();

        if (mm < 10)
            mm = '0' + mm

        if (dd < 10)
            dd = '0' + dd

        if (hh < 10)
            hh = '0' + hh

        if (ii < 10)
            ii = '0' + ii

        if (ss < 10)
            ss = '0' + ss

        today = yyyy + '' + mm + '' + dd + '' + hh + '' + ii + '' + ss;

        return today;
    },

    loading: function (type, lazy) {
        clearTimeout(appLib.timer['loading']);

        switch (type) {
            case 'show':
                $('#loadingIco').show();
                $('#loadingIco').css('opacity', 1);
                break;

            case 'hide':
                var time = (lazy ? 420 : 0);

                appLib.timer['loading'] = setTimeout(function () {
                    $('#loadingIco').fadeOut(420);
                }, time);
                break;
        }
    },

    adjustSize: function (time) {
        setTimeout(function () {
            var device = {
                width: $(document).width(),
                height: $(document).height()
            }

            $('.each-app').each(function () {
                height = {
                    top: $(this).find('.content-top').outerHeight(),
                    topWrapper: $(this).find('.content-top .top-wrapper').outerHeight(),
                    footer: $('.app-footer').outerHeight()
                }

                var conntentListHeight = device.height - height.top - height.footer - 30;
                $(this).find('.index-content .content-top .top-wrapper').css('height', height.topWrapper);

                if (device.height > device.width)
                    $(this).find('.index-content .content-list').css('height', conntentListHeight);
                else
                    $(this).find('.index-content .content-list').css('height', 'auto');
            });
        }, time)
    },

    renew: function (value) {
        return JSON.parse(JSON.stringify(value));
    },

    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    isMobileDevice: function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
}