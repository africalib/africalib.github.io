var app = angular.module('moleApp', []);
app.controller('moleCtrl', function ($scope, $timeout, $interval) {
    var initDia = 5;
    var turnDia = 1;
    var playerReady = {
        1: false,
        2: false
    };
    var timer = [];
    var timerIdx = 0;
    var isFinished = false;
    var isStarted = false;

    var playAudio = function (type, name, volume) {
        var num = 0;

        switch (type) {
            case 'effect':
                if (!$scope.isEffectOn)
                    return;

                num = 1;
                break;

            case 'speech':
                if (!$scope.isEffectOn)
                    return;

                num = 2;
                break;

            case 'bgm':
                num = 3;
                break;
        }

        var audio = document.getElementById('audioPlayer' + num);
        $('#audioPlayer' + num + ' source').attr('src', 'audio/' + type + '/' + name + '.mp3');

        if (volume)
            audio.volume = volume;
        else
            audio.volume = 1;

        audio.load();
        audio.play();
    }

    var checkFinished = function (victory) {
        if (playerReady[1] && playerReady[2]) {
            if (!$scope.player[1].units.field)
                victory = '2P'
            else if (!$scope.player[2].units.field)
                victory = '1P'

            if (victory) {
                var message = victory + ' 승리! 다시 시작하시려면 턴을 넘겨주세요.';
                timerIdx += 1;

                timer[timerIdx] = $timeout(function () {
                    $scope.message = message;
                    alert(message);
                    isFinished = true;
                }, 1000);
            }
        }
    }

    var setAccessable = function (type) {
        var idx = $('#moleApp .each-soil.selected').index('#moleApp .each-soil');
        var idxArr = [];

        switch (type) {
            case 'cross':
                if (idx % 5 !== 0)
                    idxArr.push(idx - 1);

                idxArr.push(idx - 5);

                if (idx % 5 !== 4)
                    idxArr.push(idx + 1);

                idxArr.push(idx + 5);
                break;

            case 'straight':
                var remainder = idx % 5;
                var divide = Math.floor(idx / 5);
                var sub = -(4 - divide);

                for (var i = 5 * sub; i < 5 * 5; i += 5)
                    idxArr.push(i + remainder);

                for (var i = 0; i < 5; i += 1)
                    idxArr.push(i + idx - remainder);

                break;

            case 'all':
                for (var i = 0; i < 25; i += 1) {
                    idxArr.push(i);
                }
                break;
        }

        $('#moleApp .each-soil').each(function (i) {
            if (idxArr.indexOf(i) >= 0)
                $(this).addClass('accessable')
        });
    }

    var playBgm = function () {
        var audio = document.getElementById('audioPlayer3');
        audio.volume = 0.3;

        if ($scope.isBgmOn && isStarted)
            audio.play();
        else
            audio.pause();
    }

    var initArea = function (selector, className, isImmediately) {
        var elems = selector.find('*');
        selector.removeClass(className);
        elems.show();
        selector.removeClass('dig');

        if (isImmediately)
            elems.remove();
        else
            setTimeout(function () { elems.remove(); }, 500);
    }

    var infoModal = function (act, info) {
        $('#infoModal').modal(act);
        $scope.info = info;
    }

    var infoSetNull = function () {
        $scope.info = null;
        $('#moleApp .selectable').removeClass('selected');
        infoModal('hide');
    }

    $scope.isBgmOn = false;
    $scope.isEffectOn = false;
    $scope.maxDia = 12;

    $scope.lang = function (name) {
        switch (name) {
            case 'move':
                return '이동하기';
                break;

            case 'attack':
                return '공격하기';
                break;

            case 'dig':
                return '땅 파기';
                break;
        }
    }

    $scope.getTurn = function (type) {
        switch (type) {
            case 'my':
                return $scope.status.turn;
                break;

            case 'enemy':
                return $scope.status.turn === 1 ? 2 : 1;
                break;
        }
    }

    $scope.units = [
        {
            name: 'miner',
            diamond: 1,
            straight: 0,
            skills: ['move', 'dig'],
            allocatable: 1,
            description: '이 유닛은 곡괭이를 이용하여 다이아를 얻을 수 있습니다. 이 유닛을 보유한 플레이어는 턴이 지날 때마다 +1의 다이아를 얻을 수 있습니다.'
        },
        {
            name: 'hammer',
            diamond: 2,
            straight: 0,
            skills: ['move', 'attack', 'dig'],
            allocatable: 1,
            description: '이 유닛은 망치를 무기로 하며, 가로 혹은 세로로 한 칸 이동할 수 있습니다.'
        },
        {
            name: 'bolt',
            diamond: 3,
            straight: 0,
            skills: ['move', 'attack', 'dig'],
            allocatable: 1,
            description: '이 유닛은 망치를 무기로 하며, 모든 지역으로 이동할 수 있습니다.'
        },
        {
            name: 'cannon',
            diamond: 4,
            straight: 0,
            skills: ['attack', 'dig'],
            allocatable: 1,
            description: '이 유닛은 대포를 무기로 하며, 모든 지역으로 공격할 수 있으나 이동은 할 수 없습니다.'
        },
        {
            name: 'car',
            diamond: 5,
            straight: 1,
            skills: ['move', 'dig'],
            allocatable: 1,
            description: '이 유닛은 차를 무기로 하며, 일직선으로 이동이 가능하고, 이동 중 만나는 상대편의 유닛을 잡을 수 있습니다. 아이템은 파괴할 수 없으며, 상대편의 덫을 만나는 경우 잡힙니다.'
        }
        //{
        //    name: 'shield',
        //    diamond: 10,
        //    straight: 0,
        //    skills: ['dig'],
        //    allocatable: 1,
        //    description: '이 유닛은 방패를 이용하여 우리편의 유닛을 상대편의 공격으로부터 보호해줍니다. 배치한 자리 근처 최대 9칸까지 보호할 수 있으며, 자신은 보호할 수 없습니다.'
        //}
    ];

    $scope.items = [
        {
            name: 'trap',
            diamond: 2,
            allocatable: 1,
            description: '이 아이템을 설치하면, 상대편의 두더지가 이곳을 지나가거나 배치될 때 잡을 수 있습니다.'
        },
        {
            name: 'light',
            diamond: 3,
            allocatable: 1,
            description: '이 아이템을 설치하면, 설치한 곳에 있는 상대편의 두더지를 볼 수 있습니다.'
        },
        {
            name: 'unlock',
            diamond: $scope.maxDia,
            allocatable: 0,
            description: '이 아이템을 설치하면, 상대편의 모든 숨겨져 있는 두더지를 나오게 할 수 있습니다.'
        }
    ];

    $scope.changeTurn = function () {
        if (isFinished) {
            location.reload();
        }
        else if (!playerReady[$scope.status.turn]) {
            playAudio('speech', 'cantChangeTurn');
            $scope.message = '처음 턴에는 두더지를 배치해야 합니다.';
            $scope.shake();
        }
        else if (confirm('턴을 넘기시겠습니까?')) {
            var turnLoading;
            var wrapper = $('#moleAppWrapper');
            var topStatus = $('#moleApp .top-status');

            $('#changeTurnBtn').attr('disabled', true);

            wrapper.hide();
            topStatus.hide();

            $('#moleApp .accessable').removeClass('accessable');
            $('#moleApp .selectable').removeClass('selected');
            $('#appModal').hide();

            playAudio('speech', 'changeTurn');
            $scope.status.action = '';
            $scope.message = '턴을 넘기는 중입니다.';

            turnLoading = $interval(function () {
                $scope.message += '.';
            }, 100);

            $timeout(function () {
                var turn = ($scope.status.turn === 1 ? 2 : 1);
                var minerCount = $('.each-soil.player' + turn + ' img[data-name=miner]').length;

                $scope.message = '확인을 누르면 턴을 넘겨받습니다.';
                alert('확인을 누르면 턴을 넘겨받습니다.');

                $('#changeTurnBtn').removeAttr('disabled');

                $scope.status.turn = turn;
                $interval.cancel(turnLoading);

                if (playerReady[$scope.status.turn])
                    $scope.player[turn].diamond += (turnDia + minerCount);

                if ($scope.player[turn].diamond > $scope.maxDia)
                    $scope.player[turn].diamond = $scope.maxDia;

                playAudio('speech', 'turnOk');
                $scope.message = '턴을 넘겨받았습니다.';
                wrapper.fadeIn(500);
                topStatus.fadeIn(500);
            }, 2100);
        }
    }

    $scope.shake = function (isVertical) {
        var selctor = $('#moleAppWrapper');
        var time = 50;
        var key = isVertical ? 'top' : 'left';
        var value = 10;
        var obj1 = {};
        var obj2 = {};
        var obj3 = {};

        obj1[key] = value;
        obj2[key] = -value;
        obj3[key] = 0;

        selctor.stop().animate(obj1, time, function () {
            selctor.stop().animate(obj2, time, function () {
                selctor.stop().animate(obj1, time, function () {
                    selctor.stop().animate(obj2, time, function () {
                        selctor.stop().animate(obj3, time)
                    });
                });
            });
        });
    }

    $scope.getArr = function (max) {
        var returnValue = [];
        for (var i = 0; i < max; i += 1)
            returnValue.push(i);
        return returnValue;
    }

    $scope.message = '게임이 준비되었습니다.';

    $scope.soil = {
        style: {
            width: '20%',
            height: 0,
        },
        loop: []
    }

    $scope.status = {
        turn: 1,
        selected: '',
        unit: {}
    }

    $scope.player = { 1: {}, 2: {} };

    $scope.select = function (type, e, info) {
        var player = $scope.player[$scope.status.turn];
        var selecting = $(e.target).hasClass('selectable') ? $(e.target) : $(e.target).parent('.selectable');
        var selected = $('#moleApp .selectable.selected');
        var selectedIdx = selected.index('#moleApp .selectable');
        var selectedHtml = selected.html();;

        $('#appModal').hide();

        $('#moleApp .dig').each(function () {
            if (!$(this).hasClass('player1') && !$(this).hasClass('player2'))
                $(this).removeClass('dig');
        })

        $('.selectable').not(selecting).removeClass('selected');

        switch (type) {
            case 'soil':
                var target = $(e.target).hasClass('each-soil') ? $(e.target) : $(e.target).closest('.each-soil');
                var myClass = 'player' + $scope.getTurn('my');
                var enemyClass = 'player' + $scope.getTurn('enemy');
                var trapClass = 'trap' + $scope.getTurn('enemy');
                var lightClass = 'light' + $scope.getTurn('enemy');
                var myTrapClass = 'trap' + $scope.getTurn('my');
                var myLightClass = 'light' + $scope.getTurn('my');

                $('#moleApp .blink').removeClass('blink');

                if ((target.hasClass(myClass) || !target.hasClass(enemyClass)) && selecting.find('.unit').length) {
                    var molyName = selecting.find('.unit').data('name');

                    selecting.addClass('selected');
                    $('#appModal').fadeIn();
                    playAudio('speech', 'order');
                    $scope.message = '명령을 내려주세요.';

                    for (var i in $scope.units) {
                        if ($scope.units[i].name === molyName) {
                            $scope.status.unit = $scope.units[i];
                            break;
                        }
                    }
                }
                else {
                    switch ($scope.status.action) {
                        case 'attack':
                            if (target.hasClass('accessable')) {
                                var isSuccess = false;
                                target.append('<img class="bang" src="img/bang.png" />')
                                $scope.shake(true);
                                playAudio('effect', 'crush', 0.5);

                                $('.bang').stop().animate({
                                    opacity: 0
                                }, 500, function () {
                                    $('.bang').remove();
                                });

                                if (target.hasClass(myTrapClass) || target.hasClass(myLightClass) || target.hasClass(trapClass) || target.hasClass(lightClass)) {
                                    playAudio('speech', 'breakItem');
                                    $scope.message = '아이템을 부쉈습니다.';
                                    target.removeClass(myTrapClass);
                                    target.removeClass(myLightClass);
                                    target.removeClass(trapClass);
                                    target.removeClass(lightClass);
                                    isSuccess = true;
                                }

                                if (target.find('.unit').length) {
                                    initArea(target, enemyClass);
                                    $scope.player[$scope.getTurn('enemy')].units.field -= 1;
                                    playAudio('speech', 'catchMoly');
                                    $scope.message = '두더지를 잡았습니다.';
                                    checkFinished();
                                    isSuccess = true;
                                }

                                if (!isSuccess) {
                                    playAudio('speech', 'empty');
                                    $scope.message = '공격하신 곳은 비어있습니다.';
                                }

                                player.diamond -= 1;
                            }
                            else {
                                playAudio('speech', 'disaccessable');
                                $scope.message = '접근이 불가합니다.';
                                $scope.shake();
                            }
                            break;

                        case 'move':
                            if (target.hasClass('accessable')) {
                                if (selected.find('.unit').data('straight') === 1) {
                                    var targetArea = $(e.target).hasClass('selectable') ? $(e.target) : $(e.target).closest('.selectable');
                                    var targetIdx = targetArea.index('#moleApp .selectable');
                                    var min = 0;
                                    var max = 0;
                                    var sum = selectedIdx > targetIdx ? 0 : 1;
                                    var passed = true;
                                    var eqArr = [];
                                    var isVertial = false;
                                    var remainder = selectedIdx % 5;
                                    var j = 0;
                                    var jumpLoop;
                                    var isDesc = false;

                                    if (selectedIdx < targetIdx) {
                                        min = selectedIdx;
                                        max = targetIdx;
                                    }
                                    else {
                                        min = targetIdx;
                                        max = selectedIdx;
                                        isDesc = true;
                                    }

                                    isVertial = (max - min > 4 ? true : false);

                                    for (i = min ; i < max; i += 1) {
                                        var idx = i + sum;

                                        if (isVertial) {
                                            if ((idx - remainder) % 5 === 0)
                                                eqArr.push(idx);
                                        }
                                        else {
                                            eqArr.push(idx);
                                        }
                                    }

                                    if (isDesc) {
                                        eqArr.sort(function (a, b) {
                                            return b - a;
                                        });
                                    }

                                    if (selected.hasClass('dig'))
                                        targetArea.addClass('dig');

                                    jumpLoop = $interval(function () {
                                        if (j < eqArr.length) {
                                            var eq = eqArr[j];
                                            var area = $('#moleApp .selectable:eq(' + eq + ')');
                                            area.append('<img class="bang" src="img/bang.png" />');
                                            playAudio('effect', 'crush', 0.5);

                                            if (area.hasClass(trapClass)) {
                                                passed = false;
                                                area.removeClass(trapClass);

                                                playAudio('speech', 'unitTrapped');
                                                $scope.message = '덫에 걸렸습니다.';
                                                $scope.shake();

                                                $scope.player[$scope.getTurn('my')].units.field -= 1;
                                                $interval.cancel(jumpLoop);

                                                area.addClass(myClass);
                                                area.html(selectedHtml);
                                                initArea(selected, myClass);
                                                setTimeout(function () {
                                                    initArea(area, myClass);
                                                }, 500);

                                                checkFinished();
                                            }
                                            else if (area.hasClass(enemyClass) && area.find('.unit').length) {
                                                initArea(area, enemyClass);
                                                $scope.player[$scope.getTurn('enemy')].units.field -= 1;

                                                playAudio('speech', 'catchUnit');
                                                $scope.message = '두더지를 잡았습니다.';
                                                $scope.shake();

                                                checkFinished();
                                            }

                                            j += 1;

                                            area.find('.bang').stop().animate({
                                                opacity: 0
                                            }, 200, function () {
                                                area.find('.bang').remove();
                                            });

                                            $scope.shake(true);

                                            if (j >= eqArr.length - 2)
                                                initArea(selected, myClass, true);
                                        }
                                        else {
                                            if (passed) {
                                                if (selected.hasClass('dig'))
                                                    target.addClass('dig');

                                                target.addClass(myClass);
                                                target.html(selectedHtml);
                                            }

                                            $interval.cancel(jumpLoop);
                                        }
                                    }, 200);
                                }
                                else if (target.hasClass(enemyClass) && target.html()) {
                                    target.removeClass(trapClass);
                                    initArea(selected, myClass);

                                    playAudio('speech', 'unitCatched');
                                    $scope.message = '두더지가 잡혔습니다.';
                                    $scope.shake();

                                    $scope.player[$scope.getTurn('my')].units.field -= 1;
                                    checkFinished();
                                }
                                else if (target.hasClass(trapClass)) {
                                    target.removeClass(trapClass);
                                    initArea(selected, myClass);

                                    playAudio('speech', 'unitTrapped');
                                    $scope.message = '덫에 걸렸습니다.';
                                    $scope.shake();

                                    $scope.player[$scope.getTurn('my')].units.field -= 1;
                                    checkFinished();
                                }
                                else {
                                    if (selected.hasClass('dig'))
                                        target.addClass('dig');

                                    playAudio('effect', 'move');
                                    target.addClass(myClass);
                                    target.html(selectedHtml);
                                    initArea(selected, myClass, true);
                                }

                                player.diamond -= 1;
                            }
                            else {
                                playAudio('speech', 'disaccessable');
                                $scope.message = '접근이 불가합니다.';
                                $scope.shake();
                            }
                            break;

                        case 'unit':
                            if ($scope.info) {
                                var unit = $('img.unit[data-name=' + $scope.info.name + ']');

                                if (target.html() && target.hasClass(enemyClass)) {
                                    playAudio('speech', 'unitCatched');
                                    $scope.message = '두더지가 잡혔습니다.';
                                    $scope.shake();
                                }
                                else if (target.hasClass(trapClass)) {
                                    playAudio('speech', 'unitTrapped');
                                    target.removeClass(trapClass);
                                    $scope.message = '덫에 걸렸습니다.';
                                    $scope.shake();
                                }
                                else {
                                    player.units.field += 1;
                                    player.units.bench -= 1;
                                    target.addClass(myClass);
                                    playAudio('speech', 'order');
                                    $scope.message = '명령을 내려주세요.';
                                    playerReady[$scope.status.turn] = true;
                                    target.html(unit[0].outerHTML);
                                }

                                player.diamond -= $scope.info.diamond;
                            }
                            break;

                        case 'item':
                            if ($scope.info) {
                                if (target.hasClass(enemyClass) && target.html()) {
                                    playAudio('speech', 'itemBroken');
                                    $scope.message = '아이템이 부서졌습니다.';
                                    $scope.shake();
                                }
                                else if (target.hasClass(myLightClass) || target.hasClass(myTrapClass)) {
                                    $scope.message = '이미 설치하였습니다.';
                                    playAudio('speech', 'alreadySet');
                                    $scope.shake();
                                    break;
                                }
                                else if ($scope.info.name === 'light') {
                                    target.addClass('light' + $scope.status.turn);
                                    //playAudio('speech', 'setLight');
                                    $scope.message = '등대를 설치하였습니다.';
                                }
                                else if ($scope.info.name === 'trap') {
                                    target.addClass('trap' + $scope.getTurn('my'));
                                    //playAudio('speech', 'setTrap');
                                    $scope.message = '덫을 설치하였습니다.';
                                }

                                player.diamond -= $scope.info.diamond;
                            }
                            break;
                    }

                    $scope.status.action = '';
                }
                break;

            case 'bench':
                selecting.addClass('selected');
                info.type = 'unit';
                infoModal('show', info);
                break;

            case 'item':
                selecting.addClass('selected');
                info.type = 'item';
                infoModal('show', info);
                break;
        }


        $('#moleApp .accessable').removeClass('accessable');
    }

    $scope.moleModalSelect = function (type) {
        var player = $scope.player[$scope.status.turn];
        var selected = $('#moleApp .selectable.selected');
        var accessableType = '';

        if (player.diamond) {

            switch (type) {
                case 'move':
                    playAudio('speech', 'selectMove');
                    $scope.message = '이동할 곳을 선택해주세요.';
                    $scope.status.action = 'move';

                    switch (selected.find('.unit').data('name')) {
                        case 'car':
                            accessableType = 'straight';
                            break;

                        case 'bolt':
                            accessableType = 'all';
                            break;

                        default:
                            accessableType = 'cross';
                            break;
                    }

                    setAccessable(accessableType);
                    break;

                case 'attack':
                    playAudio('speech', 'selectAttack');
                    $scope.message = '공격할 곳을 선택해주세요.';
                    $scope.status.action = 'attack';

                    switch (selected.find('.unit').data('name')) {
                        case 'hammer':
                            accessableType = 'cross';
                            break;

                        case 'bolt':
                            accessableType = 'cross';
                            break;

                        case 'cannon':
                            accessableType = 'all';
                            break;

                        case 'car':
                            accessableType = 'straight';
                            break;
                    }

                    setAccessable(accessableType);
                    break;

                case 'dig':
                    if ($('#moleApp .each-soil.selected').hasClass('dig')) {
                        playAudio('speech', 'alreadyDig');
                        $scope.message = '이미 땅 속에 있습니다.';
                        $scope.shake();
                    }
                    else {
                        $('#moleApp .each-soil.selected').addClass('dig');
                        $('#moleApp .selectable').removeClass('selected');
                        player.diamond -= 1;
                    }
                    break;

                case 'cancel':
                    $('#moleApp .selectable').removeClass('selected');
                    break;
            }
        }
        else {
            playAudio('speech', 'dialess');
            $scope.message = '다이아가 부족합니다.';
            $scope.shake();
        }

        $('#appModal').hide();
    }

    $scope.start = function (e) {
        var appFirst = $(e.target).closest('.app-first');
        $(e.target).hide();

        isStarted = true;
        playAudio('speech', 'start');
        $scope.message = '게임이 시작되었습니다.';
        $('#changeTurnBtn').removeAttr('disabled');

        appFirst.stop().animate({
            opacity: 0
        }, 500, function () {
            appFirst.remove();
            $('#moleApp .top-status').fadeIn();
        });

        $timeout(function () {
            playBgm();

            $('img').each(function () {
                var d = new Date();
                var src = $(this).attr('src');

                if (src) {
                    var source = src + '?' + d.getTime();
                    $(this).attr('src', source);
                }
            });
        }, 1000);
    }

    $scope.toggleBgm = function () {
        $scope.isBgmOn = !$scope.isBgmOn;
        $.cookie('isBgmOn', $scope.isBgmOn);
        playBgm();
    }

    $scope.toggleEffect = function () {
        $scope.isEffectOn = !$scope.isEffectOn;
        $.cookie('isEffectOn', $scope.isEffectOn);
    }

    $scope.info = null;

    $scope.allocate = function (info) {
        var player = $scope.player[$scope.status.turn];

        switch (info.type) {
            case 'unit':
                if (!player.units.bench) {
                    playAudio('speech', 'noUnit');
                    $scope.message = '남은 두더지가 없습니다.';
                    $scope.shake();
                    infoSetNull();
                }
                else if (player.diamond < info.diamond) {
                    playAudio('speech', 'dialess');
                    $scope.message = '다이아가 부족합니다.';
                    $scope.shake();
                    infoSetNull();
                }
                else {
                    $scope.status.action = info.type;
                    playAudio('speech', 'put');
                    $scope.message = '놓을 위치를 선택해주세요.';
                }
                break;

            case 'item':
                if (player.diamond < info.diamond) {
                    playAudio('speech', 'needDia');
                    $scope.message = '다이아가 부족합니다.';
                    $scope.shake();
                    infoSetNull();
                }
                else if (player.diamond <= info.diamond && !playerReady[$scope.status.turn]) {
                    playAudio('speech', 'cantChangeTurn');
                    $scope.message = '처음 턴에는 두더지를 배치해야 합니다.';
                    $scope.shake();
                    infoSetNull();
                }
                else {
                    $scope.status.action = info.type;
                    playAudio('speech', 'put');
                    $scope.message = '놓을 위치를 선택해주세요.';
                }
                break;
        }
    }

    $scope.useNow = function (info) {
        var player = $scope.player[$scope.status.turn];

        if (player.diamond < info.diamond) {
            playAudio('speech', 'needDia');
            $scope.message = '다이아가 부족합니다.';
            $scope.shake();
        }
        else if (player.diamond <= info.diamond && !playerReady[$scope.status.turn]) {
            playAudio('speech', 'cantChangeTurn');
            $scope.message = '처음 턴에는 두더지를 배치해야 합니다.';
            $scope.shake();
        }
        else if (confirm('사용하시겠습니까?')) {
            switch (info.name) {
                case 'unlock':
                    $('.player' + $scope.getTurn('enemy') + '.dig').removeClass('dig');
                    playAudio('speech', 'unlock');
                    $scope.message = '상대편의 두더지를 땅에서 나오게 하였습니다.';
                    break;
            }

            player.diamond -= info.diamond;
        }

        infoSetNull();
    }

    $scope.init = function () {
        var bodyWidth = $(document).width();
        var bodyHeight = $(document).height();
        var appTopHeight = $('.app-top').height();
        var size = Math.floor(bodyWidth / 5) + 'px';
        var intervalIdx = 0;
        $scope.soil.style.height = size;
        $scope.isEffectOn = ($.cookie('isEffectOn') === undefined ? true : ($.cookie('isEffectOn') === 'true'));
        $scope.isBgmOn = ($.cookie('isBgmOn') === undefined ? true : ($.cookie('isBgmOn') === 'true'));

        for (var i = 0; i < 25; i += 1)
            $scope.soil.loop.push(i);

        for (var i = 0; i < 2; i += 1) {
            $scope.player[i + 1] = {
                units: {
                    field: 0,
                    bench: 12
                },
                diamond: initDia
            };
        }

        setInterval(function () {
            $('.accessable').toggleClass('blink');
        }, 500);

        $(document).on('click', '#infoModal', function (e) {
            if (!$(e.target).hasClass('btn-set')) {
                infoSetNull();
            }
        });
    }
});
