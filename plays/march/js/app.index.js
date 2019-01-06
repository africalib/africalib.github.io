var app = angular.module('app', []);
app.controller('appCtrl', function ($scope, $timeout, $interval) {
    var online = {
        get: function (key, update, func) {
            local.interval[key] = $interval(function () {
                var args = {
                    id: global.id,
                    player: global.player,
                    type: 'check',
                    update: update
                };

                $.post('./?ctrl=api&act=check', args, function (res) {
                    if (res) {
                        var data = JSON.parse(res);
                        if (data.method) {
                            if (func && typeof func === 'function') {
                                func();
                            }
                            else {
                                if (appLib.isNumber(data.arg1))
                                    data.arg1 = Number(data.arg1);

                                if (appLib.isNumber(data.arg2))
                                    data.arg2 = Number(data.arg2);

                                if (appLib.isNumber(data.arg3))
                                    data.arg3 = Number(data.arg3);
								
                                if (!appLib.isNullOrEmpty(data.arg1) && !appLib.isNullOrEmpty(data.arg2) && !appLib.isNullOrEmpty(data.arg3))
                                    $scope[data.method](data.arg1, data.arg2, data.arg3, true);
                                else if (!appLib.isNullOrEmpty(data.arg1) && !appLib.isNullOrEmpty(data.arg2))
                                    $scope[data.method](data.arg1, data.arg2, true);
                                else if (!appLib.isNullOrEmpty(data.arg1))
                                    $scope[data.method](data.arg1, true);
                                else
                                    $scope[data.method](true);

                                $scope.$digest();
                            }
                        }
                    }
                });
            }, 500);
        },
        post: function (method, arg1, arg2, arg3) {
            var args = {
                id: global.id,
                player: global.player,
                type: 'post',
                method: method,
                arg1: arg1,
                arg2: arg2,
                arg3: arg3
            };

            $.post('./?ctrl=api&act=post', args);
        }
    }

    var local = {
        timer: {},
        interval: {},
        touchStart: 0,
        messageTime: 2000,
        transTime: 200,
        autoRotateArr: [],
        default: {
            buffed: {
                farm: 0,
                move: 0,
                distance: 0,
                attack: 0,
                hp: 0,
                maxHp: 0,
                power: 0,
                maxPower: 0,
                defense: 0,
                restoreHp: 0
            }
        },

        getIsInCross: function (i, j) {
            return $scope.areas[i] && $scope.areas[j] && ($scope.areas[i].vnum === $scope.areas[j].vnum || $scope.areas[i].hnum === $scope.areas[j].hnum);
        },
		
		getIsMine: function(i) {
			return this.getHasUnit(i) || this.getHasShelter(i);
		},
		
		getIsInShelterOrArea: function(i) {
			if(local.getIsUnitInArea(i)) {			
				var eachArea = $scope.areas[i];
				var eachUnit = eachArea.unit;
				return eachArea.owner === eachUnit.player || (local.getIsShelterInArea(i) && eachArea.shelter.player === $scope.getPlayer());
			}
			
			return false;
		},

        getVerticalNum: function (val, isRowNum) {
            return Math.floor(val / (isRowNum ? $scope.default.rowNum : $scope.default.columNum));
        },

        getIsShelterInArea: function (idx) {
            return $scope.areas[idx] && $scope.areas[idx].shelter && $scope.areas[idx].shelter.name;
        },

        getHasShelter: function (idx) {
            return this.getIsShelterInArea(idx) && $scope.areas[idx].shelter.player === $scope.status.turn;
        },

        getIsUnitInArea: function (idx) {
            return $scope.areas[idx] && $scope.areas[idx].unit && $scope.areas[idx].unit.name;
        },

        getHasUnit: function (idx) {
            return this.getIsUnitInArea(idx) && $scope.areas[idx].unit.player === $scope.status.turn;
        },

        getDirection: function (targetIdx, presentIdx) {
            var target = $scope.areas[targetIdx];
            var present = $scope.areas[presentIdx];
            var returnValue = present.direction;

            if (target.hnum === present.hnum) {
                if (target.hidx > present.hidx)
                    returnValue = 3;
                else
                    returnValue = 9;
            }
            else if (target.vnum === present.vnum) {
                if (target.vidx > present.vidx)
                    returnValue = 6;
                else
                    returnValue = 12;
            }
            else {
                var hGap = Math.abs(present.hnum - target.hnum);
                var vGap = Math.abs(present.vnum - target.vnum);

                if (hGap >= vGap) {
                    if (present.hnum < target.hnum)
                        returnValue = 6;
                    else if (present.hnum > target.hnum)
                        returnValue = 12;
                }
                else {
                    if (present.vnum > target.vnum)
                        returnValue = 9;
                    else if (present.hnum < target.hnum)
                        returnValue = 3;
                }
            }

            return returnValue;
        },

        getBuff: function () {
            var buffArr = [];

            for (var i in $scope.areas) {
                var area = $scope.areas[i];
                var unit = area.unit;

                if (unit.buff) {
                    i = Number(i);

                    if ($scope.areas[i - $scope.default.columNum - 1] && $scope.areas[i - $scope.default.columNum - 1].vnum + 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i - $scope.default.columNum - 1 });

                    if ($scope.areas[i - $scope.default.columNum] && $scope.areas[i - $scope.default.columNum].vnum === area.vnum)
                        buffArr.push({ player: unit.player, idx: i - $scope.default.columNum });

                    if ($scope.areas[i - $scope.default.columNum + 1] && $scope.areas[i - $scope.default.columNum + 1].vnum - 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i - $scope.default.columNum + 1 });

                    if ($scope.areas[i - 1] && $scope.areas[i - 1].hnum === area.hnum)
                        buffArr.push({ player: unit.player, idx: i - 1 });

                    if ($scope.areas[i + 1] && $scope.areas[i + 1].hnum === area.hnum)
                        buffArr.push({ player: unit.player, idx: i + 1 });

                    if ($scope.areas[i + $scope.default.columNum - 1] && $scope.areas[i + $scope.default.columNum - 1].vnum + 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i + $scope.default.columNum - 1 });

                    if ($scope.areas[i + $scope.default.columNum] && $scope.areas[i + $scope.default.columNum].vnum === area.vnum)
                        buffArr.push({ player: unit.player, idx: i + $scope.default.columNum });

                    if ($scope.areas[i + $scope.default.columNum + 1] && $scope.areas[i + $scope.default.columNum + 1].vnum - 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i + $scope.default.columNum + 1 });
                }
            }

            return buffArr;
        },

        setAnimate: function (startIdx, endIdx, type, func) {
            if (startIdx !== endIdx) {
                var startArea = $scope.areas[startIdx];
                var endArea = $scope.areas[endIdx];
                var unit = null;
				
				switch(type) {
					case 'weapon':
						unit = $scope.areas[endIdx].weapon;
					break;
					
					case 'ride':
						unit = $scope.areas[startIdx].unit;
					break;
					
					default:
						unit = $scope.areas[endIdx].unit;
						break;
				}
				
                var $startArea = $('#app .each-area[data-idx=' + startIdx + ']');
                $scope.status.touchable = false;
                unit.status = 'move';
				
				if(type === 'ride') {
					unit.style.left = 0;
					
					$timeout(function () {
						unit.style.left = (endIdx - startIdx) * $startArea.width() + 'px'
						
						$timeout(function() {
							unit.status = null;
							unit.style = {};
							$scope.status.touchable = true;
							
							if (typeof func === 'function')
								func();
						}, local.transTime);
					});
					return;
				}
				else {
					if (startArea.vnum === endArea.vnum)
						unit.style.top = (startArea.vidx - endArea.vidx) * $startArea.height() + 'px';
					else if (startArea.hnum === endArea.hnum)
						unit.style.left = (startIdx - endIdx) * $startArea.width() + 'px';

					$timeout(function () {
						unit.style.top = 0;
						unit.style.left = 0;

						$timeout(function () {
							unit.status = null;
							unit.style = {};
							$scope.status.touchable = true;

							if (typeof func === 'function')
								func();
						}, local.transTime - 100);
					}, 100);
				}
            }
            else if (typeof func === 'function') {
                func();
            }
        },

        setOwner: function (idx, isRunned) {
            if (this.getIsUnitInArea(idx) && $scope.areas[idx].unit.name === 'king') {
                var kingUnit = $scope.areas[idx].unit;
                var startIdx = (Math.floor(idx / $scope.default.columNum) * $scope.default.columNum) + ($scope.default.columNum * (kingUnit.player === 'black' ? -1 : 1));
                var endIdx = startIdx + $scope.default.columNum - 1;
                var anotherKingIdx = null;

                for (var i in $scope.areas) {
                    var eachArea = $scope.areas[i];
                    var idx = Number(i);
                    var eachCond = kingUnit.player === 'black' ? idx >= startIdx : idx <= endIdx;

                    if (eachCond) {
                        if (!eachArea.owner && !eachArea.ownOnly)
                            eachArea.owner = kingUnit.player;
                    }
                    else if (eachArea.owner === kingUnit.player && !eachArea.ownOnly) {
                        eachArea.owner = null;
                    }

                    if (this.getIsUnitInArea(idx) && eachArea.unit.name === 'king' && eachArea.unit.player !== kingUnit.player)
                        anotherKingIdx = idx;
                }

                if (!isRunned && anotherKingIdx != null)
                    this.setOwner(anotherKingIdx, true);
            }
        },

        setBuff: function () {
            var buffArr = this.getBuff();

            for (var i in $scope.areas) {
                if (this.getIsUnitInArea(i)) {
					var eachArea = $scope.areas[i];
                    var eachUnit = eachArea.unit;
                    var inInBuffArr = false;

                    for (var j in buffArr) {
                        if (Number(i) === Number(buffArr[j].idx) && eachUnit.player === buffArr[j].player) {
                            inInBuffArr = true;
                            break;
                        }
                    }

                    if (inInBuffArr) {
                        eachUnit.buffed['attack'] = 1;
                        eachUnit.buffed['defense'] = 1;

                        if (eachUnit.farm > 0)
                            eachUnit.buffed['farm'] = 1;

                        if (eachUnit.move > 1)
                            eachUnit.buffed['move'] = 1;

                        if (eachUnit.distance > 1)
                            eachUnit.buffed['distance'] = 1;

                        if (eachUnit.maxDistance > 1)
                            eachUnit.buffed['maxDistance'] = 1;

                        if (eachUnit.restoreHp > 0)
                            eachUnit.buffed['restoreHp'] = 1;
						
						this.setLevel(i);
                    }
                    else {
                        eachUnit.buffed = appLib.renew(local.default.buffed);
                    }
                }
            }
        },

        setCounterAttack: function () {
            var isBlackTurn = $scope.status.turn === 'black';
            var i = isBlackTurn ? $scope.areas.length : 0;

            var buffArr = this.getBuff();

            while (isBlackTurn ? i > 0 : i < $scope.areas.length) {
                var idx = Number(i);
                var eachArea = $scope.areas[idx];

                if (this.getIsUnitInArea(idx) && eachArea.unit.player !== $scope.status.turn && eachArea.unit.distance && eachArea.unit.power) {
                    var eachUnit = eachArea.unit;

                    for (var j = 0; j < eachUnit.distance + eachUnit.buffed['distance']; j += 1) {
                        var targetIdx = null;
						var lineCond = false;
						
                        switch (eachUnit.direction) {
                            case 12:
                                targetIdx = idx - ($scope.default.columNum * (j + 1));
								lineCond = $scope.areas[targetIdx] && eachArea.vnum === $scope.areas[targetIdx].vnum;
                                break;
                            case 6:
                                targetIdx = idx + ($scope.default.columNum * (j + 1));
								lineCond = $scope.areas[targetIdx] && eachArea.vnum === $scope.areas[targetIdx].vnum;
								break;
                            case 3:
                                targetIdx = idx + j + 1;
								lineCond = $scope.areas[targetIdx] && eachArea.hnum === $scope.areas[targetIdx].hnum;
                                break;
                            case 9:
                                targetIdx = idx - (j + 1);
								lineCond = $scope.areas[targetIdx] && eachArea.hnum === $scope.areas[targetIdx].hnum;
                                break;
                        }
						
						lineCond = lineCond && this.getIsInCross(idx, targetIdx);

                        if (targetIdx && lineCond && !this.getIsShelterInArea(targetIdx) && targetIdx === $scope.active.idx && targetIdx >= 0 && this.getIsUnitInArea(targetIdx) && eachUnit.player !== $scope.areas[targetIdx].unit.player) {
                            $scope.active.tempIdx = $scope.active.idx;
                            $scope.active.idx = idx;

                            if (eachUnit.distance > 1) {
                                $scope.areas[targetIdx]['weapon'] = {
                                    name: eachUnit.weapon,
                                    direction: eachUnit.direction,
                                    status: null,
                                    style: {}
                                };

                                local.setAnimate(idx, targetIdx, 'weapon', function () {
                                    delete $scope.areas[targetIdx]['weapon'];
                                });

                                if (eachUnit.through) {
                                    var attackArr = [];

                                    for (x = 0; x < eachUnit.distance + eachUnit.buffed['distance']; x += 1) {
                                        switch (eachUnit.direction) {
                                            case 12:
                                                attackArr.push(idx - ($scope.default.columNum * (x + 1)));
                                                break;
                                            case 6:
                                                attackArr.push(idx + ($scope.default.columNum * (x + 1)));
                                                break;
                                            case 3:
                                                attackArr.push(idx + x + 1);
                                                break;
                                            case 9:
                                                attackArr.push(idx - (x + 1));
                                                break;
                                        }
                                    }

                                    for (var y in attackArr)
                                        this.setAttack(attackArr[y], true, true);
                                }
                                else {
                                    this.setAttack(targetIdx, true, true);
                                }
								
								eachUnit.power -= 0.5;
                            }
                            else {
                                this.setAttack(targetIdx, true, false);
								eachUnit.power -= 0.5;
                            }

                            $scope.active.idx = $scope.active.tempIdx;
                        }
                    }
                }

                i = i + (isBlackTurn ? -1 : 1);
            }
        },

        setAttack: function (targetIdx, stay, delay, runDistance) {
            var targetArea = $scope.areas[targetIdx];
            var activeArea = $scope.areas[$scope.active.idx];
            var isAlive = true;

            if (((this.getIsShelterInArea(targetIdx) && targetArea.shelter.player !== activeArea.unit.player) || (this.getIsUnitInArea(targetIdx) && targetArea.unit.player !== activeArea.unit.player)) && this.getIsUnitInArea($scope.active.idx)) {
                var demage = activeArea.unit.attack + activeArea.unit.buffed['attack'];
				var accelDemage = 0;
                var activeDirection = this.getDirection(targetIdx, $scope.active.idx);

                activeArea.unit.direction = activeDirection;
				
				if(activeArea.unit.accel && Number(runDistance))
					accelDemage = Number(runDistance);

                if (this.getIsShelterInArea(targetIdx)) {
					demage += accelDemage;
                    targetArea.shelter.hp -= demage;
                    isAlive = targetArea.shelter.hp > 0 || this.getIsUnitInArea(targetIdx);

                    $timeout(function () {
						local.setShowUp('attack', targetIdx, demage, true);
                    }, delay ? local.transTime : 0);
					
					if(targetArea.shelter.hp < 1)
						activeArea.unit.destory += 1;

                    if (targetArea.shelter.hp < 1 && activeArea.unit.distance < 2 && !this.getIsUnitInArea(targetIdx)) {
                        targetArea.unit = appLib.renew(activeArea.unit);
                        activeArea.unit = {};
                        $scope.active.idx = targetIdx;
                    }
                }
                else {
                    var critical = 1;
                    var multi = activeDirection * targetArea.unit.direction;
                    var defense = 0;

                    if (targetArea.unit.direction === activeDirection) {
                        critical = 3;
                    }
                    else if (multi !== 27 && multi !== 72) {
                        critical = 1.5;
                    }
                    else {
                        defense = targetArea.unit.defense + targetArea.unit.buffed['defense'];
                    }
					
                    demage = demage * critical + accelDemage - defense;

                    if (demage < 0)
                        demage = 0;

                    targetArea.unit.hp -= demage;
                    isAlive = targetArea.unit.hp > 0;

                    if (activeArea.unit.hp < 1) {
                        activeArea.unit.hp = 0;
                        targetArea.unit.exp += activeArea.unit.crop + activeArea.unit.level;
                    }

                    if (targetArea.unit.hp < 1) {
                        targetArea.unit.hp = 0;
                        activeArea.unit.exp += targetArea.unit.crop + targetArea.unit.level;
						activeArea.unit.destory += 1;

                        if (activeArea.unit.distance < 2 && !stay && activeArea.unit.type === targetArea.type) {
                            targetArea.unit = appLib.renew(activeArea.unit);
                            activeArea.unit = {};
                            $scope.active.idx = targetIdx;
                        }
                    }

                    $timeout(function () {
                        local.setShowUp('attack', targetIdx, demage, true);
                    }, delay ? local.transTime : 0);
                }

                $timeout(function () {
                    for (var i in $scope.areas) {
                        if ($scope.areas[i].unit && $scope.areas[i].unit.name && $scope.areas[i].unit.hp <= 0)
                            $scope.areas[i].unit = {};
                        else if ($scope.areas[i].shelter && $scope.areas[i].shelter.name && $scope.areas[i].shelter.hp <= 0)
                            $scope.areas[i].shelter = {};
                    }
					
					local.setFinished();
                }, delay ? local.transTime : 0);
            }

            return isAlive;
        },
		
		setRandomShelter : function(player, first) {
			var loopIdx = 0;
			var shelterCount = 2;
			var shelterEmptyArr = [];
			var shelterRandomArr = [];
			var shelterTimer;
			var setStopTimer = function() {
				$interval.cancel(shelterTimer);
			}
			
			for(var i in $scope.areas) {
				var eachArea = $scope.areas[i];
				if(eachArea.type === 'land' && !local.getIsShelterInArea(i) && !local.getIsUnitInArea(i)) {
					if(first) {
						if(player === 'white' ? i >= 50 && i <= 79 : i >= 80 && i <= 109)
							shelterEmptyArr.push(i);
					}
					else if(eachArea.owner === player) {
						shelterEmptyArr.push(i);
					}
				}
			}
			
			if(shelterEmptyArr.length >= shelterCount) {
				for(var i = 0; i < shelterCount; i += 1) {
					var randomIdx = appLib.getRandom(0, shelterEmptyArr.length - 1)
					shelterRandomArr.push(shelterEmptyArr[randomIdx]);
					shelterEmptyArr.splice(randomIdx, 1);
				}
				
				shelterTimer = $interval(function () {
					if (loopIdx < shelterRandomArr.length)
						$scope.setShelter(player, loopIdx % 2 ? 'rock' : 'tree', Number(shelterRandomArr[loopIdx]));
					else
						setStopTimer();

					loopIdx += 1;
				}, global.online ? 250 : 0);
			}
		},
		
		setLevel: function(i) {
			var eachUnit = $scope.areas[i].unit;
		
			if (eachUnit.name && eachUnit.level && eachUnit.exp >= eachUnit.maxExp && eachUnit.level < eachUnit.maxLevel) {
				var upLevel = 0;

				while (eachUnit.exp >= eachUnit.maxExp) {
					if (eachUnit.level >= eachUnit.maxLevel)
						break;

					eachUnit.exp -= eachUnit.maxExp;
					eachUnit.level += 1;
					eachUnit.maxExp += 1;

					if (eachUnit.farm)
						eachUnit.farm += 1;

					if (eachUnit.move > 1) {
						eachUnit.move += 1;

						if (eachUnit.move > eachUnit.maxMove)
							eachUnit.move = eachUnit.maxMove;
					}

					if (eachUnit.distance > 1 && !eachUnit.ridable) {
						eachUnit.distance += 1;

						if (eachUnit.distance > eachUnit.maxDistance)
							eachUnit.distance = eachUnit.maxDistance;
					}

					if(!eachUnit.ridable)
						eachUnit.attack += 1;
					
					eachUnit.hp += 1;
					eachUnit.maxHp += 1;
					eachUnit.power += 1;
					eachUnit.maxPower += 1;
					eachUnit.defense += 1;
					eachUnit.restoreHp += 1;
					upLevel += 1;
				}

				this.setShowUp('levelUp', i, upLevel);
			}
		},

        setCheckLevel: function () {
			for(var i in $scope.areas) {			
				if (this.getIsInShelterOrArea(i))
					this.setLevel(i);
            }
        },

        setShowUp: function (act, idx, val, isImportant) {
            var visible = val || isImportant;

            if (act !== 'attack' && global.online && $scope.areas[idx] && $scope.areas[idx].unit && $scope.areas[idx].unit.name)
                visible = visible && global.player === $scope.areas[idx].unit.player;

            if (visible) {
                var player = global.online ? global.player : $scope.areas[idx].unit.player;
                var $area = $('#app .each-area[data-hidx=' + idx + ']');
                var $showUp = null;
                var obj = { opacity: 0 };
                $area.find('.show-up').remove();
                $area.append('<div class="show-up" data-act="' + act + '" data-player="' + player + '">' + val + '</div>');
                $showUp = $area.find('.show-up');

                if (player === 'white')
                    obj.bottom = '-2.1rem';
                else
                    obj.top = '-2.1rem';

                $showUp.stop().animate(obj, 1000, function () {
                    $showUp.remove();
                });
            }
        },

        setMove: function (idx) {
            var targetArea = $scope.areas[idx];
            var activeArea = $scope.areas[$scope.active.idx];

            activeArea.unit.direction = this.getDirection(idx, $scope.active.idx);
            targetArea.unit = activeArea.unit;
            activeArea.unit = {};
            $scope.active.idx = idx;
        },

        setAreaDefault: function () {
            for (var i in $scope.areas)
                delete $scope.areas[i].status;
        },

        setGrabbedDefault: function () {
            $scope.grabbed = {
                name: null
            };
        },

        setActiveDefault: function () {
            $scope.active = {
                idx: null,
                tempIdx: null,
                unit: null
            };
        },

        setUnit: function (player, name, idx, init) {
            if ($scope.default.units[name]) {
                var unit = appLib.renew($scope.default.units[name]);
                var area = $scope.areas[idx];

                if (init) {
                    unit.power = 0;
                }
                else {
                    $scope.status[player].crop = (parseFloat($scope.status[player].crop) - parseFloat(unit.crop)).toFixed(2);
                    $scope.status[player].crop = Number($scope.status[player].crop.toString());
                }

                if (unit.crop)
                    $scope.status[player].units += unit.crop;

                unit.player = player;
                unit.direction = player === 'white' ? 6 : 12;
                $scope.areas[idx].unit = unit;
            }
            else {
                appLib.bandMessage($scope.getPlayer(), '오류가 있습니다.', local.messageTime, !global.online);
                console.error('error');
            }
        },

        setLabel: function (player, txt, time) {
            $timeout.cancel(local.timer['label']);
            $('#labelArea').stop().fadeIn(0);

            $scope.label.player = global.online ? global.player : player;
            $scope.label.message = txt;

            if (time === 0) {
                $scope.label.message = txt;
            }
            else {
                local.timer['label'] = $timeout(function () {
                    $('#labelArea').stop().fadeOut(500, function () {
                        $scope.label.message = null;
                    });
                }, 2000);
            }
        },

        setTurn: function (player) {
            var crop = 0;
            var buffArr = this.getBuff();

            $scope.status.turn = player;
            this.setLabel(player, player + ' player turn');

            for (var i in $scope.areas) {
                var eachArea = $scope.areas[i];
                var eachUnit = eachArea.unit;

                if (eachUnit.name) {
					if(eachUnit.player === player) {
						var inInBuffArr = false;
						var restoreHp = 0;
						var isInShelterOrArea = local.getIsInShelterOrArea(i);

						for (var j in buffArr) {
							if (Number(i) === Number(buffArr[j].idx) && eachUnit.player === buffArr[j].player) {
								inInBuffArr = true;
								break;
							}
						}
						
						// 파워
						if (eachUnit.restorePower && eachUnit.power < eachUnit.maxPower) {
							eachUnit.power += eachUnit.restorePower;
							
							if (eachUnit.power > eachUnit.maxPower)
								eachUnit.power = eachUnit.maxPower;
						}

						 // 경험
						if (eachUnit.level) {
							if (inInBuffArr)
								eachUnit.exp += 1;
								
							if (isInShelterOrArea)
								eachUnit.exp += 1;
						}

						// 추가 농작물
						if (eachUnit.farm) {
							var each = 0;

							if (player === eachArea.owner) {
								if (player === 'white')
									each = eachArea.hnum + 1;
								else if (player === 'black')
									each = eachArea.hnum - ((eachArea.hnum - Math.round($scope.default.rowNum / 2)) * 2);
							}

							crop += (eachUnit.farm + eachUnit.buffed['farm']) * (each * 0.1);
						}
						
						// 추가 체력
						if (eachUnit.restoreHp && eachUnit.hp < eachUnit.maxHp) {
							if (isInShelterOrArea || inInBuffArr)
								restoreHp = eachUnit.restoreHp + (eachUnit.buffed['restoreHp']);
							
							eachUnit.hp += restoreHp;
							this.setShowUp('restoreHp', i, restoreHp);
							
							if (eachUnit.hp > eachUnit.maxHp)
								eachUnit.hp = eachUnit.maxHp;
						}
						
						if(eachUnit.rided.length) {
							for(var i in eachUnit.rided) {
								eachUnit.rided[i].hp += eachUnit.rided[i].restoreHp;
								eachUnit.rided[i].power += eachUnit.rided[i].restorePower;
								
								if(eachUnit.rided[i].hp > eachUnit.rided[i].maxHp)
									eachUnit.rided[i].hp = eachUnit.rided[i].maxHp;
								
								if(eachUnit.rided[i].power > eachUnit.rided[i].maxPower)
									eachUnit.rided[i].power = eachUnit.rided[i].maxPower;
							}
						}
					}
				}
            }

            if ($scope.status.turn)
                appLib.bandMessage($scope.getPlayer(), $scope.getLang('ko', player) + ' 플레이어에게 턴을 넘겼습니다.', local.messageTime, !global.online);

            crop = parseFloat(crop).toFixed(2);
            $scope.status[player].crop = (parseFloat($scope.status[player].crop) + parseFloat($scope.default.crop) + parseFloat(crop)).toFixed(2);
            $scope.status[player].crop = Number($scope.status[player].crop.toString());
            $scope.status[player].time = $scope.default.time;

            if ($scope.status[player].crop > $scope.default.maxCrop)
                $scope.status[player].crop = $scope.default.maxCrop;

            this.setBuff();
            this.setCheckLevel();
            this.setAreaDefault();
            this.setActiveDefault();
            this.setGrabbedDefault();
            this.setTimer(player);
        },

        setAutoRotate: function () {
            var autoRotates = [{
                area: $scope.areas[$scope.active.idx - $scope.default.columNum],
                direction: $scope.areas[$scope.active.idx].unit === 'black' ? 12 : 6
            }, {
                area: $scope.areas[$scope.active.idx + 1],
                direction: 9
            }, {
                area: $scope.areas[$scope.active.idx + $scope.default.columNum],
                direction: $scope.areas[$scope.active.idx].unit === 'black' ? 6 : 12
            }, {
                area: $scope.areas[$scope.active.idx - 1],
                direction: 3
            }];

            for (var i in autoRotates) {
                var area = autoRotates[i].area;

                if (area && area.unit && area.unit.name && this.getIsUnitInArea($scope.active.idx) && area.unit.player !== $scope.areas[$scope.active.idx].unit.player && this.getIsInCross($scope.active.idx, area.idx))
                    area.unit.direction = autoRotates[i].direction;
            }

            if (this.autoRotateArr.length) {
                for (var i in this.autoRotateArr) {
                    if (this.getIsUnitInArea(this.autoRotateArr[i].idx))
                        $scope.areas[this.autoRotateArr[i].idx].unit.direction = this.autoRotateArr[i].direction;
                }

                this.autoRotateArr = [];
            }
        },

        setTimer: function (player) {
            var t = this;
            $interval.cancel(local.interval['timer']);

            local.interval['timer'] = $interval(function () {
                if ($scope.status[player].time > 0) {
                    $scope.status[player].time -= 1;
                }
                else {
                    var nextPlayer = player === 'white' ? 'black' : 'white';
                    appLib.bandMessage($scope.getPlayer(), '유효 시간이 지났습니다.', local.messageTime, !global.online);
                    t.setTurn(nextPlayer);
                    t.setModalClose();
                }
            }, 1000);
        },

        setModalClose: function () {
            $scope.modal = {
				idx: null,
				info: {},
				type: null
            };
        },

        setFinished: function () {
            if (!$scope.status.finished) {
                var king = {
                    white: 0,
                    black: 0
                };

                for (var i in $scope.areas) {
                    var unit = $scope.areas[i].unit;

					if(unit.name) {
						if (unit.name === 'king') {
							king[unit.player] += 1;

							if (king.white && king.black)
								break;
						}
						else if(unit.rided.length) {
							for(var j in unit.rided) {
								if(unit.rided[j].name === 'king') {
									king[unit.player] += 1;

									if (king.white && king.black)
										break;
								}
							}							
						}
					}
                }

                if (!king.white || !king.black) {
                    var winner = !king.white ? 'black' : 'white';
                    var player = global.online ? global.player : winner;

                    this.setLabel(player, winner + ' player won', 0);
                    appLib.bandMessage(player, $scope.getLang('ko', winner) + ' 플레이어가 승리하였습니다. 홈(home) 버튼을 통해 첫 화면으로 이동이 가능합니다.', 0, !global.online);
                    $interval.cancel(local.interval['timer']);
					
					for(var i in $scope.areas)
						$scope.areas[i].owner = winner;
					
                    $scope.status.finished = true;
                }
            }
        }
    };

    $scope.default = {
        crop: 10,
        maxCrop: 30,
        time: 120,
        fieldCount: 10,
        columNum: 10,
        rowNum: 16,
        maxUnit: 500,
        nature: {
            start: 50,
            end: 109
        },
        area: {
            info: {},
            status: null,
            unit: {},
			shelter: {},
            vidx: 0,
            hidx: 0,
            vnum: 0,
            hnum: 0,
            player: null,
            owner: null,
            ownOnly: false,
			type: 'land'
        },
        shelters: {
            rock: {
                name: 'rock',
                hp: 20,
                maxHp: 20
            },
            tree: {
                name: 'tree',
                hp: 20,
                maxHp: 20
            },
        },
        units: {
            farmer: {
                name: 'farmer',
				type: 'land',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 2,
                move: 1,
                maxMove: 1,
                attack: 1,
				accel: false,
                defense: 0,
                distance: 1,
                maxDistance: 1,
                through: false,
                multiple: false,
                hp: 1,
                maxHp: 1,
                crop: 2,
                power: 1,
				restorePower: 1,
                maxPower: 1,
                farm: 1,
                restoreHp: 1,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: null,
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 0,
                style: {}
            },
            sword: {
                name: 'sword',
				type: 'land',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 3,
                move: 3,
                maxMove: 6,
                attack: 4,
				accel: false,
                defense: 0,
                distance: 1,
                maxDistance: 1,
                through: false,
                multiple: false,
                hp: 10,
                maxHp: 10,
                crop: 3,
                power: 1,
				restorePower: 1,
                maxPower: 5,
                farm: 0,
                restoreHp: 1,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: null,
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 0,
                style: {}
            },
            arrow: {
                name: 'arrow',
				type: 'land',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 4,
                move: 2,
                maxMove: 4,
                attack: 3,
				accel: false,
                defense: 0,
                distance: 5,
                maxDistance: 10,
                through: false,
                multiple: false,
                hp: 5,
                maxHp: 5,
                crop: 4,
                power: 1,
				restorePower: 1,
                maxPower: 5,
                farm: 0,
                restoreHp: 1,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: 'arrow',
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 0,
                style: {}
            },
            shield: {
                name: 'shield',
				type: 'land',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 5,
                move: 1,
                maxMove: 1,
                attack: 4,
				accel: false,
                defense: 2,
                distance: 2,
                maxDistance: 4,
                through: true,
                multiple: false,
                hp: 15,
                maxHp: 15,
                crop: 5,
                power: 1,
				restorePower: 1,
                maxPower: 5,
                farm: 0,
                restoreHp: 2,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: 'spear',
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 0,
                style: {}
            },
            horse: {
                name: 'horse',
				type: 'land',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 10,
                move: 5,
                maxMove: 10,
                attack: 5,
				accel: false,
                defense: 0,
                distance: 1,
                maxDistance: 1,
                through: false,
                multiple: false,
                hp: 10,
                maxHp: 10,
                crop: 10,
                power: 2,
				restorePower: 2,
                maxPower: 5,
                farm: 0,
                restoreHp: 1,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: null,
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 90,
                style: {}
            },
            elephant: {
                name: 'elephant',
				type: 'land',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 12,
                move: 4,
                maxMove: 8,
                attack: 7,
				accel: true,
                defense: 0,
                distance: 1,
                maxDistance: 1,
                through: false,
                multiple: false,
                hp: 20,
                maxHp: 20,
                crop: 12,
                power: 1.5,
				restorePower: 1.5,
                maxPower: 6,
                farm: 0,
                restoreHp: 1,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: null,
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 90,
                style: {}
            },
            cannon: {
                name: 'cannon',
				type: 'land',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 20,
                move: 1,
                maxMove: 1,
                attack: 10,
				accel: false,
                defense: 0,
                distance: 10,
                maxDistance: 20,
                through: false,
                multiple: false,
                hp: 5,
                maxHp: 5,
                crop: 15,
                power: 0.5,
				restorePower: 0.5,
                maxPower: 5,
                farm: 0,
                restoreHp: 1,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: 'ball',
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 90,
                style: {}
            },
            ship: {
                name: 'ship',
				type: 'sea',
                level: 1,
                maxLevel: 9,
                exp: 0,
                maxExp: 20,
                move: 5,
                maxMove: 5,
                attack: 1,
				accel: false,
                defense: 0,
                distance: 1,
                maxDistance: 1,
                through: false,
                multiple: false,
                hp: 20,
                maxHp: 20,
                crop: 20,
                power: 1,
				restorePower: 1,
                maxPower: 5,
                farm: 0,
                restoreHp: 1,
                buff: false,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: null,
				rided: [],
				ridable: true,
				maxRideCount: 12,
				destory: 0,
				rotate: 90,
                style: {}
            },
            king: {
                name: 'king',
				type: 'land',
                level: 0,
                maxLevel: 0,
                exp: 0,
                maxExp: 0,
                move: 5,
                maxMove: 5,
                attack: 5,
				accel: false,
                defense: 1,
                distance: 1,
                maxDistance: 1,
                through: false,
                multiple: false,
                hp: 100,
                maxHp: 100,
                crop: null,
                power: 1,
				restorePower: 1,
                maxPower: 10,
                farm: 0,
                restoreHp: 0,
                buff: true,
                buffed: appLib.renew(local.default.buffed),
                status: null,
                weapon: null,
				rided: [],
				ridable: false,
				maxRideCount: 0,
				destory: 0,
				rotate: 0,
                style: {}
            }
        }
    };

    $scope.label = {
        player: null,
        message: null
    }

    $scope.grabbed = {
        name: null
    };

    $scope.active = {
        idx: null,
        tempIdx: null,
        unit: null
    };

    $scope.status = {
        turn: '',
        started: false,
        finished: false,
        paused: true,
		touchable: true,
		passable: false,
		droppable: true,
        white: {
            crop: 0,
            time: 0,
            units: 0
        },
        black: {
            crop: 0,
            time: 0,
            units: 0
        }
    }

    $scope.areas = [];

    $scope.goHome = function () {
        location.reload();
        return;

        var args = {
            id: global.id,
            kind: 'delete'
        };

        $.post('./?ctrl=api&act=connect', args, function () {
            location.href = './';
        });
    }
	
	$scope.getReversed = function(obj) {
        var newObject = {};
        var keys = [];
		
        for (var key in obj) {
            keys.push(key);
        }
		
        for (var i = keys.length - 1; i >= 0; i -= 1) {
          var value = obj[keys[i]];
          newObject[keys[i]]= value;
        }       

        return newObject;
	}

    $scope.getPlayer = function () {
        if (global.online)
            return global.player;
        else if ($scope.status.turn)
            return $scope.status.turn;

        return global.first === '0' ? 'black' : 'white';
    };

    $scope.getLang = function (lang, keyword) {
		switch (lang) {
			case 'ko':
				switch (keyword.toString()) {
					case 'white': return '화이트';
					case 'black': return '블랙';
					case 'name': return '이름';
					case 'type': return '타입';
					case 'move': return '이동';
					case 'attack': return '공격';
					case 'defense': return '방어';
					case 'distance': return '공격 거리';
					case 'hp': return '체력';
					case 'maxHp': return '최대 체력';
					case 'power': return '파워';
					case 'restorePower': return '회복 파워';
					case 'maxPower': return '최대 파워';
					case 'crop': return '비용';
					case 'restoreHp': return '회복 체력';
					case 'level': return '레벨';
					case 'exp': return '경험';
					case 'farm': return '농사';
					case 'direction': return '방향';
					case 'destory': return '파괴';
					case 'ride': return '타고 있는 유닛';
					case 'accel': return '가속 공격';
					case 'through': return '스루 공격';
					case 'true': return '예';
					case 'false': return '아니요';
				}
				break;
		}
        return keyword;
    };

    $scope.getModalInfoProp = function (prop) {
        if ($scope.modal.info.buffed && $scope.modal.info.buffed[prop] !== undefined) {
            if ($scope.modal.info.name) {
                var unitProp = $scope.modal.info[prop] + $scope.modal.info.buffed[prop];
                var defaultProp = $scope.default.units[$scope.modal.info.name][prop];
                var gap = unitProp - defaultProp;
                return unitProp + (gap ? ' (+' + gap + ' up)' : '');
            }
        }

        return '';
    };
	
	$scope.setDrop = function(rideIdx, ridedIdx, isPosted) {
		if(local.getIsUnitInArea(rideIdx)) {
			var rideArea = $scope.areas[rideIdx];
			var rideUnit = rideArea.unit;
			
			if(rideUnit.ridable && rideUnit.rided.length) {
				var dropIdx = null;
				
				for(var i = 1; i < $scope.default.columNum; i += 1) {
					if(local.getIsUnitInArea(rideIdx - i) && !local.getHasUnit(rideIdx - i)) {
						appLib.bandMessage($scope.getPlayer(), '유닛을 내릴 수 없습니다.', local.messageTime, !global.online);					
						return;
					}
					else if(!local.getIsUnitInArea(rideIdx - i)) {
						dropIdx = rideIdx - i;
						break;
					}
				}
				
				if(dropIdx != null) {
					$scope.status.droppable = false;
					$scope.active.idx = dropIdx;
					$scope.areas[dropIdx].unit = appLib.renew(rideUnit.rided[ridedIdx]);
					$scope.areas[dropIdx].unit.direction = local.getDirection(dropIdx, rideIdx);
					rideUnit.rided.splice(ridedIdx, 1);
					rideUnit.attack = $scope.default.units[rideUnit.name].attack;
					rideUnit.distance = $scope.default.units[rideUnit.name].distance;
					
					for(var i in rideUnit.rided) {
						if(rideUnit.attack < rideUnit.rided[i].attack)
							rideUnit.attack = rideUnit.rided[i].attack;
						
						if(rideUnit.distance < rideUnit.rided[i].distance) {
							rideUnit.distance = rideUnit.rided[i].distance;
							rideUnit.weapon = rideUnit.rided[i].weapon;
						}
					}
					
					local.setAnimate(rideIdx, dropIdx, false, function() {
						$scope.status.droppable = true;
						local.setCounterAttack();
						local.setAutoRotate();					
						local.setAreaDefault();
						local.setActiveDefault();
						local.setGrabbedDefault();
					});

					if (!isPosted && global.online)
						online.post('setDrop', rideIdx, ridedIdx);
				}
				else {
					appLib.bandMessage($scope.getPlayer(), '더 이상 유닛을 내릴 수 없습니다.', local.messageTime, !global.online);					
				}
			}
		}
	};

    $scope.setAreas = function (val) {
        if (val)
            $scope.areas = JSON.parse(val);
    };

    $scope.pass = function (player, isPosted) {
        if ($scope.status.turn !== player) {
			var randomNum = appLib.getRandom(1, 10);
			
			if(randomNum === 1)
				local.setRandomShelter(player);
			
            local.setTurn(player);

            if (!isPosted && global.online) {
                online.post('pass', player);
                online.post('setAreas', JSON.stringify($scope.areas));
            }
        }
    };

    $scope.setShelter = function (player, name, idx, isPosted) {
        var shelter = appLib.renew($scope.default.shelters[name]);
        shelter.player = player;
        $scope.areas[idx].shelter = shelter;

        if (!isPosted && global.online)
            online.post('setShelter', player, name, idx);
    };

    $scope.touch = function (idx, isPosted) {
        var targetArea = $scope.areas[idx];
        var activeArea = $scope.areas[$scope.active.idx];

        if (!isPosted && global.online)
            online.post('touch', idx);

        // 내 유닛 선택
        if (local.getIsUnitInArea(idx) && targetArea.unit.player === $scope.status.turn) {
			if(targetArea.status === 'ride' && targetArea.unit.ridable && activeArea.unit.name) {
				if(targetArea.unit.rided.length < targetArea.unit.maxRideCount) {
					activeArea.unit.direction = local.getDirection(idx, $scope.active.idx);
					activeArea.unit.power -= idx - $scope.active.idx === 1 ? 0.5 : 1;
					targetArea.unit.rided.push(appLib.renew(activeArea.unit));

					local.setAnimate($scope.active.idx, idx, 'ride', function() {
						if(activeArea.unit.attack > targetArea.unit.attack)
							targetArea.unit.attack = activeArea.unit.attack;
						
						if(activeArea.unit.distance > targetArea.unit.distance) {
							targetArea.unit.distance = activeArea.unit.distance;
							targetArea.unit.weapon = activeArea.unit.weapon;
						}
						
						activeArea.unit = {};
					});
				}
				else {
					appLib.bandMessage($scope.getPlayer(), '더 이상 유닛이 탈 수 없습니다.', local.messageTime, !global.online);
				}
				
				local.setAreaDefault();
				local.setActiveDefault();
				local.setGrabbedDefault();
				return;
			}
			
            if ($scope.active.idx === idx || !targetArea.unit.power) {
                targetArea.unit.direction = Number(targetArea.unit.direction) + 3;

                if (targetArea.unit.direction > 12)
                    targetArea.unit.direction = 3;
            }

            local.setAreaDefault();
            local.setActiveDefault();
            local.setGrabbedDefault();

            $scope.active.idx = idx;
            $scope.active.unit = targetArea.unit;
            activeArea = $scope.areas[$scope.active.idx];

            if (targetArea.unit.power > 0) {
                var attackable = targetArea.unit.power >= 1 ? true : false;
                var movePoint = targetArea.unit.power >= 1 ? targetArea.unit.move + targetArea.unit.buffed['move'] : 1;

                var accessable = {
                    up: true,
                    down: true,
                    left: true,
                    right: true
                }

                var getEachCond = function (direction, i) {
                    return accessable[direction] && $scope.areas[i];
                }

                for (var i = 0; i < movePoint; i += 1) {
                    var num = {
                        up: (i + 1) * -10 + idx,
                        down: (i + 1) * 10 + idx,
                        left: idx - i - 1,
                        right: idx + i + 1
                    };

                    for (var j = 0; j < 4; j += 1) {
                        var each = {}

                        switch (j) {
                            case 0:
                                each.direction = 'up';
                                each.idx = (i + 1) * -($scope.default.columNum) + idx;
                                each.cond = getEachCond(each.direction, each.idx);
                                break;

                            case 1:
                                each.direction = 'down';
                                each.idx = (i + 1) * $scope.default.columNum + idx;
                                each.cond = getEachCond(each.direction, each.idx);
                                break;

                            case 2:
                                each.direction = 'right';
                                each.idx = idx + i + 1;
                                each.cond = getEachCond(each.direction, each.idx) && targetArea.hnum === local.getVerticalNum(each.idx);
                                break;

                            case 3:
                                each.direction = 'left';
                                each.idx = idx - i - 1;
                                each.cond = getEachCond(each.direction, each.idx) && targetArea.hnum === local.getVerticalNum(each.idx);
                                break;

                            default:
                                return;
                        }

                        var eachArea = $scope.areas[each.idx];

                        if (each.cond && eachArea) {
                            var eachUnit = eachArea.unit;
                            $scope.areas[num[each.direction]].player = $scope.status.turn;

                            if (attackable && ((local.getIsShelterInArea(each.idx) && !local.getHasShelter(each.idx)) || (local.getIsUnitInArea(each.idx) && !local.getHasUnit(each.idx) && (activeArea.unit.type === eachUnit.type ? true : activeArea.unit.type === 'sea' ? i === 0 : true))) && targetArea.unit.distance === 1)
                                $scope.areas[num[each.direction]].status = 'attack';
                            else if (activeArea.unit.type === eachArea.type && !local.getIsUnitInArea(each.idx) && (!local.getIsShelterInArea(each.idx) || local.getHasShelter(each.idx)))
                                $scope.areas[num[each.direction]].status = 'move';
							else if(local.getHasUnit(each.idx) && eachUnit.ridable && !activeArea.unit.ridable)
								$scope.areas[num[each.direction]].status = 'ride';
                        }
                        else {
                            accessable[each.direction] = false;
                        }
                    }
                }

                if (targetArea.unit.distance > 1) {
                    if (targetArea.unit.multiple) {
                        var minNum = 0;
                        var minVerticalNum = targetArea.hnum - (targetArea.unit.distance + targetArea.unit.buffed['distance']);
                        var maxVerticalNum = targetArea.hnum + (targetArea.unit.distance + targetArea.unit.buffed['distance']);
                        var minLastNum = idx - (targetArea.unit.distance + targetArea.unit.buffed['distance']) - (targetArea.hnum * 10);
                        var maxLastNum = idx + (targetArea.unit.distance + targetArea.unit.buffed['distance']) - (targetArea.hnum * 10);

                        if (minVerticalNum < 0)
                            minVerticalNum = 0;

                        if (minLastNum < 0)
                            minLastNum = 0;

                        for (var i in $scope.areas) {
                            var eachVerticalNum = local.getVerticalNum(i);
                            var eachLastNum = i - (eachVerticalNum * 10);
                            var eachUnit = $scope.areas[i].unit;

                            if (attackable && ((local.getIsShelterInArea(i) && !local.getHasShelter(i)) || (local.getIsUnitInArea(i) && !local.getHasUnit(i))) && eachVerticalNum >= minVerticalNum && eachVerticalNum <= maxVerticalNum && eachLastNum >= minLastNum && eachLastNum <= maxLastNum && !local.getHasShelter(i))
                                $scope.areas[i].status = 'attack';
                        }
                    }
                    else if (attackable) {
                        for (var i = 0; i < targetArea.unit.distance + targetArea.unit.buffed['distance']; i += 1) {
                            var num = {
                                up: (i + 1) * -($scope.default.columNum) + idx,
                                down: (i + 1) * $scope.default.columNum + idx,
                                right: idx + i + 1,
                                left: idx - i - 1
                            };

                            if ($scope.areas[num.up] && $scope.areas[num.up].vnum === activeArea.vnum && ((local.getIsShelterInArea(num.up) && !local.getHasShelter(num.up)) || (local.getIsUnitInArea(num.up) && !local.getHasUnit(num.up))))
                                $scope.areas[num.up].status = 'attack';
                            if ($scope.areas[num.down] && $scope.areas[num.down].vnum === activeArea.vnum && ((local.getIsShelterInArea(num.down) && !local.getHasShelter(num.down)) || (local.getIsUnitInArea(num.down) && !local.getHasUnit(num.down))))
                                $scope.areas[num.down].status = 'attack';
                            if ($scope.areas[num.left] && $scope.areas[num.left].hnum === activeArea.hnum && ((local.getIsShelterInArea(num.left) && !local.getHasShelter(num.left)) || (local.getIsUnitInArea(num.left) && !local.getHasUnit(num.left))))
                                $scope.areas[num.left].status = 'attack';
                            if ($scope.areas[num.right] && $scope.areas[num.right].hnum === activeArea.hnum && ((local.getIsShelterInArea(num.right) && !local.getHasShelter(num.right)) || (local.getIsUnitInArea(num.right) && !local.getHasUnit(num.right))))
                                $scope.areas[num.right].status = 'attack';
                        }
                    }
                }
            }
        }
        else if (targetArea.status === 'attack' || targetArea.status === 'move') {
            var obj = {
                loopArr: [],
                compare: null,
                addedNum: 0,
                destIdx: 0,
                powerUse: 1,
                startIdx: $scope.active.idx,
                endIdx: 0,
                aniType: null,
                afterAnimateFunc: null
            };

            if (activeArea.hnum === targetArea.hnum) {
                obj.gap = targetArea.idx - $scope.active.idx;

                if (obj.gap > 0) {
                    for (var i = $scope.active.idx; i <= obj.gap + $scope.active.idx; i += 1)
                        obj.loopArr.push(i);
                }
                else {
                    for (var i = $scope.active.idx; i >= obj.gap + $scope.active.idx; i -= 1)
                        obj.loopArr.push(i);
                }
            }
            else if (activeArea.vnum === targetArea.vnum) {
                obj.gap = targetArea.idx - $scope.active.idx;

                if (obj.gap > 0) {
                    for (var i = $scope.active.idx; i <= obj.gap + $scope.active.idx; i += $scope.default.columNum)
                        obj.loopArr.push(i);
                }
                else {
                    for (var i = $scope.active.idx; i >= obj.gap + $scope.active.idx; i -= $scope.default.columNum)
                        obj.loopArr.push(i);
                }
            }

            if ($scope.areas[$scope.active.idx].unit.distance === 1 || ($scope.areas[$scope.active.idx].unit.distance > 1 && targetArea.status === 'move')) {
                var teamUnits = [];

                for (var i in obj.loopArr) {
                    var loopIdx = obj.loopArr[i];
                    var loopArea = $scope.areas[loopIdx];
                    activeArea = $scope.areas[$scope.active.idx];
                    activeArea.unit.direction = local.getDirection(idx, $scope.active.idx);

                    if (loopIdx !== $scope.active.idx) {
                        if ((local.getIsShelterInArea(loopIdx) && !local.getHasShelter(loopIdx)) || local.getIsUnitInArea(loopIdx)) {
                            if (loopArea.unit.player === activeArea.unit.player) {
                                teamUnits.push({
                                    idx: loopIdx,
                                    unit: appLib.renew(loopArea.unit)
                                });

                                loopArea.unit = activeArea.unit;
                                $scope.areas[$scope.active.idx].unit = {};
                                $scope.active.idx = loopIdx;
                            }
                            else if (local.setAttack(loopIdx, false, i > 1, i)) {
                                var removeIdx = obj.loopArr.indexOf(loopIdx);
                                obj.loopArr.splice(removeIdx, obj.loopArr.length - removeIdx);
                                break;
                            }
                        }
                        else {
                            loopArea.unit = activeArea.unit;
                            activeArea.unit = {};
                            $scope.active.idx = loopIdx;

                            if (obj.loopArr.length === 2)
                                obj.powerUse = 0.5;
                        }
                    }
                }
				
				teamUnits.reverse();

                for (var i in teamUnits) {
                    if (local.getIsUnitInArea(teamUnits[i].idx)) {
                        var objArr = appLib.renew(obj.loopArr);
						objArr.reverse();

                        for (var j in objArr) {
                            if (!local.getIsUnitInArea(objArr[j])) {
                                $scope.areas[objArr[j]].unit = teamUnits[i].unit;
                                break;
                            }
                        }
                    }
                    else {
                        $scope.areas[teamUnits[i].idx].unit = teamUnits[i].unit;
                    }
                }

                obj.endIdx = $scope.active.idx;
            }
            else if ($scope.areas[$scope.active.idx].unit.distance > 1) {
				obj.endIdx = idx;
				obj.aniType = 'weapon';
				obj.afterAnimateFunc = function () {
					delete $scope.areas[obj.endIdx]['weapon'];
				}

				$scope.areas[obj.endIdx]['weapon'] = {
					name: activeArea.unit.weapon,
					direction: local.getDirection(idx, $scope.active.idx),
					status: null,
					style: {}
				};

				if (activeArea.unit.through) {
					for (var i in obj.loopArr) {
						if(i > 0 && !local.getIsMine(obj.loopArr[i])) {
							var targetDirection = local.getDirection($scope.active.idx, obj.loopArr[i]);
							local.setAttack(obj.loopArr[i], false, true);
							local.autoRotateArr.push({ idx: obj.loopArr[i], direction: targetDirection })
						}
					}
				}
				else {
					var targetDirection = local.getDirection($scope.active.idx, idx);
					local.setAttack(idx, false, true);
					local.autoRotateArr.push({ idx: idx, direction: targetDirection })
				}
            }

            $scope.areas[$scope.active.idx].unit.power -= obj.powerUse;

            local.setAreaDefault();

            local.setAnimate(obj.startIdx, obj.endIdx, obj.aniType, function () {
                if (typeof obj.afterAnimateFunc === 'function')
                    obj.afterAnimateFunc();

                local.setOwner($scope.active.idx);
                local.setBuff();
                local.setCounterAttack();
				local.setCheckLevel();
                local.setAutoRotate();
                local.setActiveDefault();
                local.setGrabbedDefault();
            });
        }
        else if (targetArea.status === 'enter') {
            $scope.active.idx = idx;
            local.setUnit($scope.status.turn, $scope.grabbed.name, idx);
            local.setBuff();
            local.setAutoRotate();
            local.setAreaDefault();
            local.setActiveDefault();
            local.setGrabbedDefault();
        }
        else if ($scope.grabbed.name) {
            appLib.bandMessage($scope.getPlayer(), '해당 위치에 배치할 수 없습니다.', local.messageTime, !global.online);
            return;
        }
		else {
            local.setAreaDefault();
            local.setActiveDefault();
            local.setGrabbedDefault();
		}
    };

    $scope.touchLabel = function (isPosted) {
        if (global.online)
            $interval.cancel(local.interval['initLoopCheck']);

        if (!$scope.status.started) {
            var isShelterSettable = false;
            var mc = new Hammer(document.querySelector('body'));

            $scope.status.started = true;
            $scope.status.paused = false;
            $scope.label.message = 'ready';

            if (global.online) {
                online.get('loopCheck', 1);

                if (global.player === 'white') {
					if(global.first === '0') {
						$scope.status.white.crop += 5;
						$scope.pass('black');
						isShelterSettable = true;
					}
					else {
						$scope.status.black.crop += 5;
					}
                }
                else if (global.player === 'black') {
					if(global.first === '1') {
						$scope.status.black.crop += 5;
						$scope.pass('white');
						isShelterSettable = true;
					}
					else {
						$scope.status.white.crop += 5;
					}
                }
            }
            else {
                $scope.pass(global.first === '0' ? 'black' : 'white');
				$scope.status[global.first === '0' ? 'white' : 'black']['crop'] += 5;
                isShelterSettable = true;
            }

            if (isShelterSettable) {
				local.setRandomShelter('white', true);
				local.setRandomShelter('black', true);
			}
			
			$timeout(function(){
				$scope.status.passable = true;
			}, global.online ? 5000 : 100);

			$('.area-player .units').each(function() {
				$(this).animate({
					'scrollLeft' : $(this).width() * ($(this).parent('.area-player').data('player') === 'black' ? -1 : 1)
				}, 1200);
			});
			
            mc.on('press', function (e) {
                var eachArea = $(e.target).closest('.each-area');
                var eachUnit = $(e.target).closest('.each-unit');

                if (eachArea.length && eachArea.data('idx')) {
                    var idx = eachArea.data('idx');
					$scope.modal.idx = idx;

                    if ($scope.areas[idx] && local.getIsShelterInArea(idx)) {
                        if ($scope.getPlayer() === $scope.areas[idx].shelter.player && $scope.areas[idx].unit && $scope.areas[idx].unit.name) {
                            $scope.modal.info = $scope.areas[idx].unit;
                            $scope.modal.type = 'unit';
                        }
                        else {
                            $scope.modal.info = $scope.areas[idx].shelter;
                            $scope.modal.type = 'shelter';
                        }
                    }
                    else if ($scope.areas[idx] && $scope.areas[idx].unit) {
                        $scope.modal.info = $scope.areas[idx].unit;
                        $scope.modal.type = 'unit';
                    }
                    else
                        return;
                }
                else if (eachUnit.length) {
                    $scope.modal.type = 'unit';
                    $scope.modal.info = $scope.default.units[eachUnit.data('name')];
                    $scope.modal.info.player = eachUnit.closest('.area-player').data('player');
                }

                local.setAreaDefault();
                local.setActiveDefault();
                local.setGrabbedDefault();
                $scope.$digest();
            });
        }
        else if ($scope.label.message === 'pause') {
            appLib.bandMessage('hide');
            appLib.bandMessage($scope.getPlayer(), '플레이를 재개합니다.', local.messageTime, !global.online);
            local.setTimer($scope.status.turn);
            $scope.status.paused = false;
            $scope.label.message = null;

            if (!isPosted && global.online)
                online.post('touchLabel');
        }
        else if ($scope.label.message !== 'ready') {
            $scope.label.message = null;
        }
    }

    $scope.global = null;

    $scope.modal = {
		idx: null,
        info: {},
        type: null
    };

    $scope.closeModal = function () {
        local.setModalClose();
    }

    $scope.pause = function (player, isPosted) {
        player = global.online ? global.player : player;
        appLib.bandMessage(player, '플레이를 멈추었습니다. 재개하시려면 중간에 있는 라벨을 클릭해주세요.', 0, !global.online);
        local.setLabel(player, 'pause', 0);
        $scope.status.paused = true;
        $interval.cancel(local.interval['timer']);

        if (!isPosted && global.online)
            online.post('pause', player);
    }

    $scope.grab = function (player, name, isPosted) {
        if ($scope.status.turn === player) {
            var unit = $scope.default.units[name];
            var fieldCount = 0;

            for (var i in $scope.areas) {
                if ($scope.areas[i].unit.player === player) {
					if($scope.areas[i].unit.name === name)
						fieldCount += 1;
			
					if($scope.areas[i].unit.rided.length) {
						for(var j in $scope.areas[i].unit.rided) {
							if($scope.areas[i].unit.rided[j].name === name)
								fieldCount += 1;
						}
					}
				}
            }

			if (fieldCount >= $scope.default.fieldCount) {
				appLib.bandMessage($scope.getPlayer(), '유닛당 ' + $scope.default.fieldCount + '기까지 배치할 수 있습니다.', local.messageTime, !global.online);
				return;
			}

            if ($scope.status[player].crop < unit.crop) {
                appLib.bandMessage($scope.getPlayer(), '농작물이 부족합니다.', local.messageTime, !global.online);
                return;
            }
            else if ($scope.status[player].units + unit.crop > $scope.default.maxUnit) {
                appLib.bandMessage($scope.getPlayer(), '유닛을 더 이상 배치할 수 없습니다.', local.messageTime, !global.online);
                return;
            }

            local.setAreaDefault();
            local.setActiveDefault();
            local.setGrabbedDefault();

            $scope.grabbed.name = name;

            for (var i in $scope.areas) {
                var area = $scope.areas[i];
                if (!area.unit.name && unit.type === area.type && (!local.getIsShelterInArea(i) || local.getHasShelter(i))) {
                    switch (player) {
                        case 'white':
                            if (area.owner === 'white')
                                area.status = 'enter';
                            break;

                        case 'black':
                            if (area.owner === 'black')
                                area.status = 'enter';
                            break;
                    }
                }
            }

            if (!isPosted && global.online)
                online.post('grab', player, name);
        }
    }

    $scope.init = function () {
        $scope.global = global;

        if (global.online) {
            $scope.label.player = global.player;
        }
        else {
            global.first = ['0', '1'][appLib.getRandom(0, 1)];
            $scope.label.player = global.first === '0' ? 'black' : 'white';
        }

        $scope.label.message = "let's march";
        $scope.device = appLib.isMobileDevice() ? 'mobile' : 'pc';

        for (var i = 0; i < 160; i += 1) {
            var each = appLib.renew($scope.default.area);
            var remain = i % $scope.default.columNum;
            var hnum = local.getVerticalNum(i);

            each.idx = i;
            each.hidx = i;
            each.vidx = hnum + (remain * $scope.default.rowNum);
            each.vnum = local.getVerticalNum(each.vidx, true);
            each.hnum = hnum;

			if(i % 10 === 9)
				each.type = 'sea';
			
            if (i < $scope.default.nature.start) {
                each.owner = 'white';
                each.ownOnly = true;
            }
            else if (i > $scope.default.nature.end) {
                each.owner = 'black';
                each.ownOnly = true;
            }

            $scope.areas.push(each);

            if (i >= 33 && i <= 35)
                local.setUnit('white', 'shield', i, true);
            else if (i >= 123 && i <= 125)
                local.setUnit('black', 'shield', i, true);
            else if (i === 24)
                local.setUnit('white', 'king', i, true);
            else if (i === 23 || i === 25)
                local.setUnit('white', 'horse', i, true);
            else if (i === 133 || i === 135)
                local.setUnit('black', 'horse', i, true);
            else if (i === 134)
                local.setUnit('black', 'king', i, true);
        }

        setTimeout(function () {
            $('#app').fadeIn();
			$('.area-player[data-player=black] .units').scrollLeft($(this).width());
        }, 500);

        if (global.online) {
            if ((global.player === 'black' && global.first === '0') || global.player === 'white' && global.first === '1') {
                online.get('initLoopCheck', 0, function () {
                    $scope.touchLabel();
                });
            }
        }

        if (navigator.platform !== 'Win32') {
            $(document).on('contextmenu', function (e) {
                e.preventDefault();
            });
        }
        window.onbeforeunload = function () {
            if ($scope.status.finished)
                return;
            else
                return true;
        };
    }
});