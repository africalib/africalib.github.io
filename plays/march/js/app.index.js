let app = new Vue({
    el: '#app',
    data: {
        base: {
            maxCrop: 30,
            time: 120,
            fieldCount: 10,
            columNum: 10,
            rowNum: 16,
            maxUnit: 300,
            nature: {
                start: 50,
                end: 109
            },
            area: {
                info: {},
                status: null,
                unit: {},
                shelter: {},
                weapon: {},
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
                    buffed: null,
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
                    attack: 5,
                    accel: false,
                    defense: 0,
                    distance: 1,
                    maxDistance: 1,
                    through: false,
                    multiple: false,
                    hp: 7,
                    maxHp: 7,
                    crop: 3,
                    power: 1,
                    restorePower: 1,
                    maxPower: 5,
                    farm: 0,
                    restoreHp: 1,
                    buff: false,
                    buffed: null,
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
                    attack: 4,
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
                    buffed: null,
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
                    restoreHp: 1,
                    buff: false,
                    buffed: null,
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
                    buffed: null,
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
                    maxExp: 11,
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
                    crop: 11,
                    power: 1.5,
                    restorePower: 1.5,
                    maxPower: 6,
                    farm: 0,
                    restoreHp: 1,
                    buff: false,
                    buffed: null,
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
                    maxExp: 12,
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
                    crop: 12,
                    power: 0.5,
                    restorePower: 0.5,
                    maxPower: 5,
                    farm: 0,
                    restoreHp: 1,
                    buff: false,
                    buffed: null,
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
                    maxExp: 13,
                    move: 5,
                    maxMove: 10,
                    attack: 1,
                    accel: false,
                    defense: 0,
                    distance: 1,
                    maxDistance: 1,
                    through: false,
                    multiple: false,
                    hp: 20,
                    maxHp: 20,
                    crop: 13,
                    power: 1,
                    restorePower: 1,
                    maxPower: 5,
                    farm: 0,
                    restoreHp: 1,
                    buff: false,
                    buffed: null,
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
                    level: 1,
                    maxLevel: 9,
                    exp: 0,
                    maxExp: 15,
                    move: 5,
                    maxMove: 10,
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
                    buffed: null,
                    status: null,
                    weapon: null,
                    rided: [],
                    ridable: false,
                    maxRideCount: 0,
                    destory: 0,
                    rotate: 0,
                    style: {}
                }
            },
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
        label: {
            player: null,
            message: null
        },
        grabbed: {
            name: null
        },
        active: {
            idx: null,
            tempIdx: null,
            unit: null
        },
        status: {
            turn: '',
            started: false,
            finished: false,
            paused: true,
            touchable: true,
            passable: false,
            droppable: true,
            white: {
                crop: 0,
                incomeCrop: 10,
                maxCrop: 0,
                time: 0,
                units: 0,
                maxUnit: 0
            },
            black: {
                crop: 0,
                incomeCrop: 10,
                maxCrop: 0,
                time: 0,
                units: 0,
                maxUnit: 0
            }
        },
        areas: [],
        global: null,
        modal: {
            idx: null,
            info: {},
            type: null
        },
        timer: {},
        interval: {},
        touchStart: 0,
        messageTime: 2000,
        transTime: 200,
        autoRotateArr: []
    },
    methods: {
        goHome: function () {
            location.reload();
            return;

            let args = {
                id: global.id,
                kind: 'delete'
            };

            $.post('./?ctrl=api&act=connect', args, function () {
                location.href = './';
            });
        },
        getReversed: function (obj) {
            let newObject = {};
            let keys = [];

            for (let key in obj) {
                keys.push(key);
            }

            for (let i = keys.length - 1; i >= 0; i -= 1) {
                let value = obj[keys[i]];
                newObject[keys[i]] = value;
            }

            return newObject;
        },
        getPlayer: function () {
            if (global.online)
                return global.player;
            else if (this.status.turn)
                return this.status.turn;

            return global.first === '0' ? 'black' : 'white';
        },
        getLang: function (lang, keyword) {
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
        },
        getModalInfoProp: function (prop) {
            if (this.modal.info.buffed && this.modal.info.buffed[prop] !== undefined) {
                if (this.modal.info.name) {
                    let unitProp = this.modal.info[prop] + this.modal.info.buffed[prop];
                    let defaultProp = this.base.units[this.modal.info.name][prop];
                    let gap = unitProp - defaultProp;
                    return unitProp + (gap ? ' (+' + gap + ' up)' : '');
                }
            }

            return '';
        },
        setDrop: function (rideIdx, ridedIdx, isPosted) {
            let t = this;
            if (t.getIsUnitInArea(rideIdx)) {
                let rideArea = t.areas[rideIdx];
                let rideUnit = rideArea.unit;

                if (rideUnit.ridable && rideUnit.rided.length) {
                    let dropIdx = null;

                    for (let i = 1; i < t.base.columNum; i += 1) {
                        if (t.getIsUnitInArea(rideIdx - i) && !t.getHasUnit(rideIdx - i)) {
                            appLib.bandMessage(t.getPlayer(), '유닛을 내릴 수 없습니다.', t.messageTime, !global.online);
                            return;
                        }
                        else if (!t.getIsUnitInArea(rideIdx - i)) {
                            dropIdx = rideIdx - i;
                            break;
                        }
                    }

                    if (dropIdx != null) {
                        t.status.droppable = false;
                        t.active.idx = dropIdx;
                        t.areas[dropIdx].unit = appLib.renew(rideUnit.rided[ridedIdx]);
                        t.areas[dropIdx].unit.direction = t.getDirection(dropIdx, rideIdx);
                        rideUnit.rided.splice(ridedIdx, 1);
                        rideUnit.attack = t.base.units[rideUnit.name].attack;
                        rideUnit.distance = t.base.units[rideUnit.name].distance;

                        for (let i in rideUnit.rided) {
                            if (rideUnit.attack < rideUnit.rided[i].attack)
                                rideUnit.attack = rideUnit.rided[i].attack;

                            if (rideUnit.distance < rideUnit.rided[i].distance) {
                                rideUnit.distance = rideUnit.rided[i].distance;
                                rideUnit.weapon = rideUnit.rided[i].weapon;
                            }
                        }

                        t.setAnimate(rideIdx, dropIdx, false, function () {
                            t.status.droppable = true;
                            t.setCounterAttack();
                            t.setAutoRotate();
                            t.setAreaDefault();
                            t.setActiveDefault();
                            t.setGrabbedDefault();
                        });

                        if (!isPosted && global.online)
                            t.post('setDrop', rideIdx, ridedIdx);
                    }
                    else {
                        appLib.bandMessage(this.getPlayer(), '더 이상 유닛을 내릴 수 없습니다.', t.messageTime, !global.online);
                    }
                }
            }
        },
        setAreas: function (val) {
            if (val)
                this.areas = JSON.parse(val);
        },
        pass: function (player, isPosted) {
            if (this.status.turn !== player) {
                let randomNum = appLib.getRandom(1, 10);

                if (randomNum === 1)
                    this.setRandomShelter(player);

                this.setTurn(player);

                if (!isPosted && global.online) {
                    t.post('pass', player);
                    t.post('setAreas', JSON.stringify(this.areas));
                }
            }
        },
        setShelter: function (player, name, idx, isPosted) {
            let shelter = appLib.renew(this.base.shelters[name]);
            shelter.player = player;
            this.areas[idx].shelter = shelter;

            if (!isPosted && global.online)
                t.post('setShelter', player, name, idx);
        },
        touch: function (idx, isPosted) {
            let t = this;
            let targetArea = t.areas[idx];
            let activeArea = t.areas[t.active.idx];

            if (!isPosted && global.online)
                t.post('touch', idx);

            // 내 유닛 선택
            if (t.getIsUnitInArea(idx) && targetArea.unit.player === t.status.turn) {
                if (targetArea.status === 'ride' && targetArea.unit.ridable && activeArea.unit.name) {
                    if (targetArea.unit.rided.length < targetArea.unit.maxRideCount) {
                        activeArea.unit.direction = t.getDirection(idx, t.active.idx);
                        activeArea.unit.power -= idx - t.active.idx === 1 ? 0.5 : 1;
                        targetArea.unit.rided.push(appLib.renew(activeArea.unit));

                        t.setAnimate(t.active.idx, idx, 'ride', function () {
                            if (activeArea.unit.attack > targetArea.unit.attack)
                                targetArea.unit.attack = activeArea.unit.attack;

                            if (activeArea.unit.distance > targetArea.unit.distance) {
                                targetArea.unit.distance = activeArea.unit.distance;
                                targetArea.unit.weapon = activeArea.unit.weapon;
                            }

                            activeArea.unit = {};
                        });
                    }
                    else {
                        appLib.bandMessage(t.getPlayer(), '더 이상 유닛이 탈 수 없습니다.', t.messageTime, !global.online);
                    }

                    t.setAreaDefault();
                    t.setActiveDefault();
                    t.setGrabbedDefault();
                    return;
                }

                if (t.active.idx === idx || !targetArea.unit.power) {
                    targetArea.unit.direction = Number(targetArea.unit.direction) + 3;

                    if (targetArea.unit.direction > 12)
                        targetArea.unit.direction = 3;
                }

                t.setAreaDefault();
                t.setActiveDefault();
                t.setGrabbedDefault();

                t.active.idx = idx;
                t.active.unit = targetArea.unit;
                activeArea = t.areas[t.active.idx];

                if (targetArea.unit.power > 0) {
                    let attackable = targetArea.unit.power >= 1 ? true : false;
                    let movePoint = targetArea.unit.power >= 1 ? targetArea.unit.move + targetArea.unit.buffed['move'] : 1;

                    let accessable = {
                        up: true,
                        down: true,
                        left: true,
                        right: true
                    }

                    let getEachCond = function (direction, i) {
                        return accessable[direction] && t.areas[i];
                    }

                    for (let i = 0; i < movePoint; i += 1) {
                        let num = {
                            up: (i + 1) * -10 + idx,
                            down: (i + 1) * 10 + idx,
                            left: idx - i - 1,
                            right: idx + i + 1
                        };

                        for (let j = 0; j < 4; j += 1) {
                            let each = {}

                            switch (j) {
                                case 0:
                                    each.direction = 'up';
                                    each.idx = (i + 1) * -(t.base.columNum) + idx;
                                    each.cond = getEachCond(each.direction, each.idx);
                                    break;

                                case 1:
                                    each.direction = 'down';
                                    each.idx = (i + 1) * t.base.columNum + idx;
                                    each.cond = getEachCond(each.direction, each.idx);
                                    break;

                                case 2:
                                    each.direction = 'right';
                                    each.idx = idx + i + 1;
                                    each.cond = getEachCond(each.direction, each.idx) && targetArea.hnum === t.getVerticalNum(each.idx);
                                    break;

                                case 3:
                                    each.direction = 'left';
                                    each.idx = idx - i - 1;
                                    each.cond = getEachCond(each.direction, each.idx) && targetArea.hnum === t.getVerticalNum(each.idx);
                                    break;

                                default:
                                    return;
                            }

                            let eachArea = t.areas[each.idx];

                            if (each.cond && eachArea) {
                                let eachUnit = eachArea.unit;
                                t.areas[num[each.direction]].player = t.status.turn;

                                if (attackable && ((t.getIsShelterInArea(each.idx) && !t.getHasShelter(each.idx)) || (t.getIsUnitInArea(each.idx) && !t.getHasUnit(each.idx) && (activeArea.unit.type === eachUnit.type ? true : activeArea.unit.type === 'sea' ? i === 0 : true))) && targetArea.unit.distance === 1)
                                    t.areas[num[each.direction]].status = 'attack';
                                else if (activeArea.unit.type === eachArea.type && !t.getIsUnitInArea(each.idx) && (!t.getIsShelterInArea(each.idx) || t.getHasShelter(each.idx)))
                                    t.areas[num[each.direction]].status = 'move';
                                else if (t.getHasUnit(each.idx) && eachUnit.ridable && !activeArea.unit.ridable)
                                    t.areas[num[each.direction]].status = 'ride';
                            }
                            else {
                                accessable[each.direction] = false;
                            }
                        }
                    }

                    if (targetArea.unit.distance > 1) {
                        if (targetArea.unit.multiple) {
                            let minNum = 0;
                            let minVerticalNum = targetArea.hnum - (targetArea.unit.distance + targetArea.unit.buffed['distance']);
                            let maxVerticalNum = targetArea.hnum + (targetArea.unit.distance + targetArea.unit.buffed['distance']);
                            let minLastNum = idx - (targetArea.unit.distance + targetArea.unit.buffed['distance']) - (targetArea.hnum * 10);
                            let maxLastNum = idx + (targetArea.unit.distance + targetArea.unit.buffed['distance']) - (targetArea.hnum * 10);

                            if (minVerticalNum < 0)
                                minVerticalNum = 0;

                            if (minLastNum < 0)
                                minLastNum = 0;

                            for (let i in t.areas) {
                                let eachVerticalNum = t.getVerticalNum(i);
                                let eachLastNum = i - (eachVerticalNum * 10);
                                let eachUnit = t.areas[i].unit;

                                if (attackable && ((t.getIsShelterInArea(i) && !t.getHasShelter(i)) || (t.getIsUnitInArea(i) && !t.getHasUnit(i))) && eachVerticalNum >= minVerticalNum && eachVerticalNum <= maxVerticalNum && eachLastNum >= minLastNum && eachLastNum <= maxLastNum && !t.getHasShelter(i))
                                    t.areas[i].status = 'attack';
                            }
                        }
                        else if (attackable) {
                            for (let i = 0; i < targetArea.unit.distance + targetArea.unit.buffed['distance']; i += 1) {
                                let num = {
                                    up: (i + 1) * -(t.base.columNum) + idx,
                                    down: (i + 1) * t.base.columNum + idx,
                                    right: idx + i + 1,
                                    left: idx - i - 1
                                };

                                if (t.areas[num.up] && t.areas[num.up].vnum === activeArea.vnum && ((t.getIsShelterInArea(num.up) && !t.getHasShelter(num.up)) || (t.getIsUnitInArea(num.up) && !t.getHasUnit(num.up))))
                                    t.areas[num.up].status = 'attack';
                                if (t.areas[num.down] && t.areas[num.down].vnum === activeArea.vnum && ((t.getIsShelterInArea(num.down) && !t.getHasShelter(num.down)) || (t.getIsUnitInArea(num.down) && !t.getHasUnit(num.down))))
                                    t.areas[num.down].status = 'attack';
                                if (t.areas[num.left] && t.areas[num.left].hnum === activeArea.hnum && ((t.getIsShelterInArea(num.left) && !t.getHasShelter(num.left)) || (t.getIsUnitInArea(num.left) && !t.getHasUnit(num.left))))
                                    t.areas[num.left].status = 'attack';
                                if (t.areas[num.right] && t.areas[num.right].hnum === activeArea.hnum && ((t.getIsShelterInArea(num.right) && !t.getHasShelter(num.right)) || (t.getIsUnitInArea(num.right) && !t.getHasUnit(num.right))))
                                    t.areas[num.right].status = 'attack';
                            }
                        }
                    }
                }
            }
            else if (targetArea.status === 'attack' || targetArea.status === 'move') {
                let obj = {
                    loopArr: [],
                    compare: null,
                    addedNum: 0,
                    destIdx: 0,
                    powerUse: 1,
                    startIdx: t.active.idx,
                    endIdx: 0,
                    aniType: null,
                    afterAnimateFunc: null
                };

                if (activeArea.hnum === targetArea.hnum) {
                    obj.gap = targetArea.idx - t.active.idx;

                    if (obj.gap > 0) {
                        for (let i = t.active.idx; i <= obj.gap + t.active.idx; i += 1)
                            obj.loopArr.push(i);
                    }
                    else {
                        for (let i = t.active.idx; i >= obj.gap + t.active.idx; i -= 1)
                            obj.loopArr.push(i);
                    }
                }
                else if (activeArea.vnum === targetArea.vnum) {
                    obj.gap = targetArea.idx - t.active.idx;

                    if (obj.gap > 0) {
                        for (let i = t.active.idx; i <= obj.gap + t.active.idx; i += t.base.columNum)
                            obj.loopArr.push(i);
                    }
                    else {
                        for (let i = t.active.idx; i >= obj.gap + t.active.idx; i -= t.base.columNum)
                            obj.loopArr.push(i);
                    }
                }

                if (t.areas[t.active.idx].unit.distance === 1 || (t.areas[t.active.idx].unit.distance > 1 && targetArea.status === 'move')) {
                    let teamUnits = [];

                    for (let i in obj.loopArr) {
                        let loopIdx = obj.loopArr[i];
                        let loopArea = t.areas[loopIdx];
                        activeArea = t.areas[t.active.idx];
                        activeArea.unit.direction = t.getDirection(idx, t.active.idx);

                        if (loopIdx !== t.active.idx) {
                            if ((t.getIsShelterInArea(loopIdx) && !t.getHasShelter(loopIdx)) || t.getIsUnitInArea(loopIdx)) {
                                if (loopArea.unit.player === activeArea.unit.player) {
                                    teamUnits.push({
                                        idx: loopIdx,
                                        unit: appLib.renew(loopArea.unit)
                                    });

                                    loopArea.unit = activeArea.unit;
                                    t.areas[t.active.idx].unit = {};
                                    t.active.idx = loopIdx;
                                }
                                else if (t.setAttack(loopIdx, false, i > 1, i)) {
                                    let removeIdx = obj.loopArr.indexOf(loopIdx);
                                    obj.loopArr.splice(removeIdx, obj.loopArr.length - removeIdx);
                                    break;
                                }
                            }
                            else {
                                loopArea.unit = activeArea.unit;
                                activeArea.unit = {};
                                t.active.idx = loopIdx;

                                if (obj.loopArr.length === 2)
                                    obj.powerUse = 0.5;
                            }
                        }
                    }

                    teamUnits.reverse();

                    for (let i in teamUnits) {
                        if (t.getIsUnitInArea(teamUnits[i].idx)) {
                            var objArr = appLib.renew(obj.loopArr);
                            objArr.reverse();

                            for (let j in objArr) {
                                if (!t.getIsUnitInArea(objArr[j])) {
                                    t.areas[objArr[j]].unit = teamUnits[i].unit;
                                    break;
                                }
                            }
                        }
                        else {
                            t.areas[teamUnits[i].idx].unit = teamUnits[i].unit;
                        }
                    }

                    obj.endIdx = t.active.idx;
                }
                else if (t.areas[t.active.idx].unit.distance > 1) {
                    obj.endIdx = idx;
                    obj.aniType = 'weapon';
                    obj.afterAnimateFunc = function () {
                        delete t.areas[obj.endIdx]['weapon'];
                    }

                    t.$set(t.areas[obj.endIdx], 'weapon', {
                        name: activeArea.unit.weapon,
                        direction: t.getDirection(idx, t.active.idx),
                        status: null,
                        style: {}
                    });

                    if (activeArea.unit.through) {
                        for (let i in obj.loopArr) {
                            if (i > 0 && !t.getIsMine(obj.loopArr[i])) {
                                let targetDirection = t.getDirection(t.active.idx, obj.loopArr[i]);
                                t.setAttack(obj.loopArr[i], false, true);
                                t.autoRotateArr.push({ idx: obj.loopArr[i], direction: targetDirection })
                            }
                        }
                    }
                    else {
                        let targetDirection = t.getDirection(t.active.idx, idx);
                        t.setAttack(idx, false, true);
                        t.autoRotateArr.push({ idx: idx, direction: targetDirection })
                    }
                }

                t.areas[t.active.idx].unit.power -= obj.powerUse;
                t.setAreaDefault();

                t.setAnimate(obj.startIdx, obj.endIdx, obj.aniType, function () {
                    if (typeof obj.afterAnimateFunc === 'function')
                        obj.afterAnimateFunc();

                    t.setOwner(t.active.idx);
                    t.setBuff();
                    t.setCounterAttack();
                    t.setCheckLevel();
                    t.setAutoRotate();
                    t.setActiveDefault();
                    t.setGrabbedDefault();
                });
            }
            else if (targetArea.status === 'enter') {
                t.active.idx = idx;
                t.setUnit(t.status.turn, t.grabbed.name, idx);
                t.setBuff();
                t.setAutoRotate();
                t.setAreaDefault();
                t.setActiveDefault();
                t.setGrabbedDefault();
            }
            else if (t.grabbed.name) {
                appLib.bandMessage(t.getPlayer(), '해당 위치에 배치할 수 없습니다.', t.messageTime, !global.online);
                return;
            }
            else {
                t.setAreaDefault();
                t.setActiveDefault();
                t.setGrabbedDefault();
            }
        },
        touchLabel: function (isPosted) {
            let t = this;

            if (global.online)
                clearInterval(t.interval['initLoopCheck']);

            if (!t.status.started) {
                let isShelterSettable = false;
                let mc = new Hammer(document.querySelector('body'));

                t.status.started = true;
                t.status.paused = false;
                t.label.message = 'ready';

                if (global.online) {
                    t.get('loopCheck', 1);

                    if (global.player === 'white') {
                        if (global.first === '0') {
                            t.status.white.crop += 5;
                            t.pass('black');
                            isShelterSettable = true;
                        }
                        else {
                            t.status.black.crop += 5;
                        }
                    }
                    else if (global.player === 'black') {
                        if (global.first === '1') {
                            t.status.black.crop += 5;
                            t.pass('white');
                            isShelterSettable = true;
                        }
                        else {
                            t.status.white.crop += 5;
                        }
                    }
                }
                else {
                    t.pass(global.first === '0' ? 'black' : 'white');
                    t.status[global.first === '0' ? 'white' : 'black']['crop'] += 5;
                    isShelterSettable = true;
                }

                if (isShelterSettable) {
                    t.setRandomShelter('white', true);
                    t.setRandomShelter('black', true);
                }

                setTimeout(function () {
                    t.status.passable = true;
                }, global.online ? 5000 : 100);

                $('.area-player .units').each(function () {
                    $(this).animate({
                        'scrollLeft': $(this).width() * ($(this).parent('.area-player').data('player') === 'black' ? -1 : 1)
                    }, 1200);
                });

                mc.on('press', function (e) {
                    let eachArea = $(e.target).closest('.each-area');
                    let eachUnit = $(e.target).closest('.each-unit');

                    if (eachArea.length && eachArea.data('idx')) {
                        let idx = eachArea.data('idx');
                        t.modal.idx = idx;

                        if (t.areas[idx] && t.getIsShelterInArea(idx)) {
                            if (t.getPlayer() === t.areas[idx].shelter.player && t.areas[idx].unit && t.areas[idx].unit.name) {
                                t.modal.info = t.areas[idx].unit;
                                t.modal.type = 'unit';
                            }
                            else {
                                t.modal.info = t.areas[idx].shelter;
                                t.modal.type = 'shelter';
                            }
                        }
                        else if (t.areas[idx] && t.areas[idx].unit) {
                            t.modal.info = t.areas[idx].unit;
                            t.modal.type = 'unit';
                        }
                        else
                            return;
                    }
                    else if (eachUnit.length) {
                        t.modal.type = 'unit';
                        t.modal.info = t.base.units[eachUnit.data('name')];
                        t.modal.info.player = eachUnit.closest('.area-player').data('player');
                    }

                    t.setAreaDefault();
                    t.setActiveDefault();
                    t.setGrabbedDefault();
                });
            }
            else if (t.label.message === 'pause') {
                appLib.bandMessage('hide');
                appLib.bandMessage(t.getPlayer(), '플레이를 재개합니다.', t.messageTime, !global.online);
                t.setTimer(t.status.turn);
                t.status.paused = false;
                t.label.message = null;

                if (!isPosted && global.online)
                    t.post('touchLabel');
            }
            else if (t.label.message !== 'ready') {
                t.label.message = null;
            }
        },
        closeModal: function () {
            this.setModalClose();
        },
        pause: function (player, isPosted) {
            player = global.online ? global.player : player;
            appLib.bandMessage(player, '플레이를 멈추었습니다. 재개하시려면 중간에 있는 라벨을 클릭해주세요.', 0, !global.online);
            this.setLabel(player, 'pause', 0);
            this.status.paused = true;
            clearInterval(this.interval['timer']);

            if (!isPosted && global.online)
                t.post('pause', player);
        },
        grab: function (player, name, isPosted) {
            if (this.status.turn === player) {
                let unit = this.base.units[name];
                let fieldCount = 0;

                for (let i in this.areas) {
                    if (this.areas[i].unit.player === player) {
                        if (this.areas[i].unit.name === name)
                            fieldCount += 1;

                        if (this.areas[i].unit.rided.length) {
                            for (let j in this.areas[i].unit.rided) {
                                if (this.areas[i].unit.rided[j].name === name)
                                    fieldCount += 1;
                            }
                        }
                    }
                }

                if (fieldCount >= this.base.fieldCount) {
                    appLib.bandMessage(this.getPlayer(), '유닛당 ' + this.base.fieldCount + '기까지 배치할 수 있습니다.', this.messageTime, !global.online);
                    return;
                }

                if (this.status[player].crop < unit.crop) {
                    appLib.bandMessage(this.getPlayer(), '농작물이 부족합니다.', this.messageTime, !global.online);
                    return;
                }
                else if (this.status[player].units + unit.crop > this.status[player].maxUnit) {
                    appLib.bandMessage(this.getPlayer(), '유닛을 더 이상 배치할 수 없습니다.', this.messageTime, !global.online);
                    return;
                }

                this.setAreaDefault();
                this.setActiveDefault();
                this.setGrabbedDefault();

                this.grabbed.name = name;

                for (let i in this.areas) {
                    let area = this.areas[i];
                    if (!area.unit.name && unit.type === area.type && (!this.getIsShelterInArea(i) || this.getHasShelter(i))) {
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
                    t.post('grab', player, name);
            }
        },
        getIsInCross: function (i, j) {
            return this.areas[i] && this.areas[j] && (this.areas[i].vnum === this.areas[j].vnum || this.areas[i].hnum === this.areas[j].hnum);
        },

        getIsMine: function (i) {
            return this.getHasUnit(i) || this.getHasShelter(i);
        },

        getIsInShelterOrArea: function (i) {
            if (this.getIsUnitInArea(i)) {
                let eachArea = this.areas[i];
                let eachUnit = eachArea.unit;
                return eachArea.owner === eachUnit.player || (this.getIsShelterInArea(i) && eachArea.shelter.player === this.getPlayer());
            }

            return false;
        },

        getVerticalNum: function (val, isRowNum) {
            return Math.floor(val / (isRowNum ? this.base.rowNum : this.base.columNum));
        },

        getIsShelterInArea: function (idx) {
            return this.areas[idx] && this.areas[idx].shelter && this.areas[idx].shelter.name;
        },

        getHasShelter: function (idx) {
            return this.getIsShelterInArea(idx) && this.areas[idx].shelter.player === this.status.turn;
        },

        getIsUnitInArea: function (idx) {
            return this.areas[idx] && this.areas[idx].unit && this.areas[idx].unit.name;
        },

        getHasUnit: function (idx) {
            return this.getIsUnitInArea(idx) && this.areas[idx].unit.player === this.status.turn;
        },

        getDirection: function (targetIdx, presentIdx) {
            let target = this.areas[targetIdx];
            let present = this.areas[presentIdx];
            let returnValue = present.direction;

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
                let hGap = Math.abs(present.hnum - target.hnum);
                let vGap = Math.abs(present.vnum - target.vnum);

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
            let buffArr = [];

            for (let i in this.areas) {
                let area = this.areas[i];
                let unit = area.unit;

                if (unit.buff) {
                    i = Number(i);

                    if (this.areas[i - this.base.columNum - 1] && this.areas[i - this.base.columNum - 1].vnum + 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i - this.base.columNum - 1 });

                    if (this.areas[i - this.base.columNum] && this.areas[i - this.base.columNum].vnum === area.vnum)
                        buffArr.push({ player: unit.player, idx: i - this.base.columNum });

                    if (this.areas[i - this.base.columNum + 1] && this.areas[i - this.base.columNum + 1].vnum - 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i - this.base.columNum + 1 });

                    if (this.areas[i - 1] && this.areas[i - 1].hnum === area.hnum)
                        buffArr.push({ player: unit.player, idx: i - 1 });

                    if (this.areas[i + 1] && this.areas[i + 1].hnum === area.hnum)
                        buffArr.push({ player: unit.player, idx: i + 1 });

                    if (this.areas[i + this.base.columNum - 1] && this.areas[i + this.base.columNum - 1].vnum + 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i + this.base.columNum - 1 });

                    if (this.areas[i + this.base.columNum] && this.areas[i + this.base.columNum].vnum === area.vnum)
                        buffArr.push({ player: unit.player, idx: i + this.base.columNum });

                    if (this.areas[i + this.base.columNum + 1] && this.areas[i + this.base.columNum + 1].vnum - 1 === area.vnum)
                        buffArr.push({ player: unit.player, idx: i + this.base.columNum + 1 });
                }
            }

            return buffArr;
        },

        setAnimate: function (startIdx, endIdx, type, func) {
            let t = this;

            if (startIdx !== endIdx) {
                let startArea = t.areas[startIdx];
                let endArea = t.areas[endIdx];
                let unit = null;
                let $startArea = $('#app .each-area[data-idx=' + startIdx + ']');

                switch (type) {
                    case 'weapon':
                        unit = t.areas[endIdx].weapon;
                        break;

                    case 'ride':
                        unit = t.areas[startIdx].unit;
                        break;

                    default:
                        unit = t.areas[endIdx].unit;
                        break;
                }

                t.status.touchable = false;
                unit.status = 'move';
                t.$set(unit, 'style', { top: 0, left: 0 });

                if (type === 'ride') {
                    setTimeout(function () {
                        unit.style.left = (endIdx - startIdx) * $startArea.width() + 'px'

                        setTimeout(function () {
                            unit.status = null;
                            unit.style = {};
                            t.status.touchable = true;

                            if (typeof func === 'function')
                                func();
                        }, t.transTime);
                    });
                    return;
                }
                else {
                    if (startArea.vnum === endArea.vnum)
                        unit.style.top = (startArea.vidx - endArea.vidx) * $startArea.height() + 'px';
                    else if (startArea.hnum === endArea.hnum)
                        unit.style.left = (startIdx - endIdx) * $startArea.width() + 'px';

                    setTimeout(function () {
                        unit.style.top = 0;
                        unit.style.left = 0;

                        setTimeout(function () {
                            unit.status = null;
                            unit.style = {};
                            t.status.touchable = true;

                            if (typeof func === 'function')
                                func();
                        }, t.transTime - 100);
                    }, 100);
                }
            }
            else if (typeof func === 'function') {
                func();
            }
        },

        setOwner: function (idx, isRunned) {
            if (this.getIsUnitInArea(idx) && this.areas[idx].unit.name === 'king') {
                let kingUnit = this.areas[idx].unit;
                let startIdx = (Math.floor(idx / this.base.columNum) * this.base.columNum) + (this.base.columNum * (kingUnit.player === 'black' ? -1 : 1));
                let endIdx = startIdx + this.base.columNum - 1;
                let anotherKingIdx = null;

                for (let i in this.areas) {
                    let eachArea = this.areas[i];
                    let idx = Number(i);
                    let eachCond = kingUnit.player === 'black' ? idx >= startIdx : idx <= endIdx;

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
            let buffArr = this.getBuff();

            for (let i in this.areas) {
                if (this.getIsUnitInArea(i)) {
                    let eachArea = this.areas[i];
                    let eachUnit = eachArea.unit;
                    let inInBuffArr = false;

                    for (let j in buffArr) {
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
                        eachUnit.buffed = appLib.renew(this.base.buffed);
                    }
                }
            }
        },
        setCounterAttack: function () {
            let t = this;
            let isBlackTurn = t.status.turn === 'black';
            let i = isBlackTurn ? t.areas.length : 0;

            while (isBlackTurn ? i > 0 : i < t.areas.length) {
                let idx = Number(i);
                let eachArea = t.areas[idx];

                if (t.getIsUnitInArea(idx) && eachArea.unit.player !== t.status.turn && eachArea.unit.distance && eachArea.unit.power) {
                    let eachUnit = eachArea.unit;

                    for (let j = 0; j < eachUnit.distance + eachUnit.buffed['distance']; j += 1) {
                        let targetIdx = null;
                        let lineCond = false;

                        switch (eachUnit.direction) {
                            case 12:
                                targetIdx = idx - (t.base.columNum * (j + 1));
                                lineCond = t.areas[targetIdx] && eachArea.vnum === t.areas[targetIdx].vnum;
                                break;
                            case 6:
                                targetIdx = idx + (t.base.columNum * (j + 1));
                                lineCond = t.areas[targetIdx] && eachArea.vnum === t.areas[targetIdx].vnum;
                                break;
                            case 3:
                                targetIdx = idx + j + 1;
                                lineCond = t.areas[targetIdx] && eachArea.hnum === t.areas[targetIdx].hnum;
                                break;
                            case 9:
                                targetIdx = idx - (j + 1);
                                lineCond = t.areas[targetIdx] && eachArea.hnum === t.areas[targetIdx].hnum;
                                break;
                        }

                        lineCond = lineCond && t.getIsInCross(idx, targetIdx);

                        if (targetIdx && lineCond && !t.getIsShelterInArea(targetIdx) && targetIdx === t.active.idx && targetIdx >= 0 && t.getIsUnitInArea(targetIdx) && eachUnit.player !== t.areas[targetIdx].unit.player) {
                            t.active.tempIdx = t.active.idx;
                            t.active.idx = idx;

                            if (eachUnit.distance > 1) {
                                t.$set(t.areas[targetIdx], 'weapon', {
                                    name: eachUnit.weapon,
                                    direction: eachUnit.direction,
                                    status: null,
                                    style: {}
                                });

                                t.setAnimate(idx, targetIdx, 'weapon', function () {
                                    delete t.areas[targetIdx]['weapon'];
                                });

                                if (eachUnit.through) {
                                    let attackArr = [];

                                    for (let x = 0; x < eachUnit.distance + eachUnit.buffed['distance']; x += 1) {
                                        switch (eachUnit.direction) {
                                            case 12:
                                                attackArr.push(idx - (t.base.columNum * (x + 1)));
                                                break;
                                            case 6:
                                                attackArr.push(idx + (t.base.columNum * (x + 1)));
                                                break;
                                            case 3:
                                                attackArr.push(idx + x + 1);
                                                break;
                                            case 9:
                                                attackArr.push(idx - (x + 1));
                                                break;
                                        }
                                    }

                                    for (let y in attackArr)
                                        t.setAttack(attackArr[y], true, true);
                                }
                                else {
                                    t.setAttack(targetIdx, true, true);
                                }

                                eachUnit.power -= 0.5;
                            }
                            else {
                                t.setAttack(targetIdx, true, false);
                                eachUnit.power -= 0.5;
                            }

                            t.active.idx = t.active.tempIdx;
                        }
                    }
                }

                i = i + (isBlackTurn ? -1 : 1);
            }
        },

        setAttack: function (targetIdx, stay, delay, runDistance) {
            let t = this;
            let targetArea = t.areas[targetIdx];
            let activeArea = t.areas[t.active.idx];
            let isAlive = true;

            if (((t.getIsShelterInArea(targetIdx) && targetArea.shelter.player !== activeArea.unit.player) || (t.getIsUnitInArea(targetIdx) && targetArea.unit.player !== activeArea.unit.player)) && t.getIsUnitInArea(t.active.idx)) {
                let demage = activeArea.unit.attack + activeArea.unit.buffed['attack'];
                let accelDemage = 0;
                let activeDirection = t.getDirection(targetIdx, t.active.idx);

                activeArea.unit.direction = activeDirection;

                if (activeArea.unit.accel && Number(runDistance))
                    accelDemage = Number(runDistance);

                if (t.getIsShelterInArea(targetIdx)) {
                    demage += accelDemage;
                    targetArea.shelter.hp -= demage;
                    isAlive = targetArea.shelter.hp > 0 || t.getIsUnitInArea(targetIdx);

                    setTimeout(function () {
                        t.setShowUp('attack', targetIdx, demage, true);
                    }, delay ? t.transTime : 0);

                    if (targetArea.shelter.hp <= 0)
                        activeArea.unit.destory += 1;

                    if (targetArea.shelter.hp <= 0 && activeArea.unit.distance < 2 && !t.getIsUnitInArea(targetIdx)) {
                        targetArea.unit = appLib.renew(activeArea.unit);
                        activeArea.unit = {};
                        t.active.idx = targetIdx;
                    }
                }
                else {
                    let critical = 1;
                    let multi = activeDirection * targetArea.unit.direction;
                    let defense = 0;

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

                    if (activeArea.unit.hp <= 0) {
                        activeArea.unit.hp = 0;
                        targetArea.unit.exp += activeArea.unit.crop + activeArea.unit.level;
                    }

                    if (targetArea.unit.hp <= 0) {
                        targetArea.unit.hp = 0;
                        activeArea.unit.exp += targetArea.unit.crop + targetArea.unit.level;
                        activeArea.unit.destory += 1;

                        if (activeArea.unit.distance < 2 && !stay && activeArea.unit.type === targetArea.type) {
                            targetArea.unit = appLib.renew(activeArea.unit);
                            activeArea.unit = {};
                            t.active.idx = targetIdx;
                        }
                    }

                    setTimeout(function () {
                        t.setShowUp('attack', targetIdx, demage, true);
                    }, delay ? t.transTime : 0);
                }

                setTimeout(function () {
                    for (let i in t.areas) {
                        if (t.areas[i].unit && t.areas[i].unit.name && t.areas[i].unit.hp <= 0)
                            t.areas[i].unit = {};
                        else if (t.areas[i].shelter && t.areas[i].shelter.name && t.areas[i].shelter.hp <= 0)
                            t.areas[i].shelter = {};
                    }

                    t.setFinished();
                }, delay ? t.transTime : 0);
            }

            return isAlive;
        },

        setRandomShelter: function (player, first) {
            let t = this;
            let loopIdx = 0;
            let shelterCount = 2;
            let shelterEmptyArr = [];
            let shelterRandomArr = [];
            let shelterTimer;
            let setStopTimer = function () {
                clearInterval(shelterTimer);
            }

            for (let i in t.areas) {
                let eachArea = t.areas[i];
                if (eachArea.type === 'land' && !t.getIsShelterInArea(i) && !t.getIsUnitInArea(i)) {
                    if (first) {
                        if (player === 'white' ? i >= 50 && i <= 79 : i >= 80 && i <= 109)
                            shelterEmptyArr.push(i);
                    }
                    else {
                        shelterEmptyArr.push(i);
                    }
                }
            }

            if (shelterEmptyArr.length >= shelterCount) {
                for (let i = 0; i < shelterCount; i += 1) {
                    let randomIdx = appLib.getRandom(0, shelterEmptyArr.length - 1)
                    shelterRandomArr.push(shelterEmptyArr[randomIdx]);
                    shelterEmptyArr.splice(randomIdx, 1);
                }

                shelterTimer = setInterval(function () {
                    if (loopIdx < shelterRandomArr.length)
                        t.setShelter(player, loopIdx % 2 ? 'rock' : 'tree', Number(shelterRandomArr[loopIdx]));
                    else
                        setStopTimer();

                    loopIdx += 1;
                }, global.online ? 250 : 0);
            }
        },

        setLevel: function (i) {
            let eachUnit = this.areas[i].unit;

            if (eachUnit.name && eachUnit.level && eachUnit.exp >= eachUnit.maxExp && eachUnit.level < eachUnit.maxLevel) {
                let upLevel = 0;

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

                    if (!eachUnit.ridable)
                        eachUnit.attack += 1;

                    eachUnit.hp += 1;
                    eachUnit.maxHp += 1;
                    eachUnit.power += 1;
                    eachUnit.maxPower += 1;
                    eachUnit.defense += 1;
                    eachUnit.restoreHp += 1;

                    if (eachUnit.name === 'king') {
                        this.status[eachUnit.player].incomeCrop += 1;
                        this.status[eachUnit.player].maxCrop += 10;
                        this.status[eachUnit.player].maxUnit += 100;
                    }

                    upLevel += 1;
                }

                this.setShowUp('levelUp', i, upLevel);
            }
        },

        setCheckLevel: function () {
            for (let i in this.areas) {
                if (this.getIsUnitInArea(i) && this.areas[i].unit.name === 'king') {
                    this.setLevel(i);
                }
                else if (this.getIsInShelterOrArea(i)) {
                    this.setLevel(i);
                }
            }
        },

        setShowUp: function (act, idx, val, isImportant) {
            let visible = val || isImportant;

            if (act !== 'attack' && global.online && this.areas[idx] && this.areas[idx].unit && this.areas[idx].unit.name)
                visible = visible && global.player === this.areas[idx].unit.player;

            if (visible) {
                let player = global.online ? global.player : this.areas[idx].unit.player;
                let $area = $('#app .each-area[data-hidx=' + idx + ']');
                let $showUp = null;
                let obj = { opacity: 0 };
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
            let targetArea = this.areas[idx];
            let activeArea = this.areas[this.active.idx];

            activeArea.unit.direction = this.getDirection(idx, this.active.idx);
            targetArea.unit = activeArea.unit;
            activeArea.unit = {};
            this.active.idx = idx;
        },

        setAreaDefault: function () {
            for (let i in this.areas)
                delete this.areas[i].status;
        },

        setGrabbedDefault: function () {
            this.grabbed = {
                name: null
            };
        },

        setActiveDefault: function () {
            this.active = {
                idx: null,
                tempIdx: null,
                unit: null
            };
        },

        setUnit: function (player, name, idx, init) {
            if (this.base.units[name]) {
                let unit = appLib.renew(this.base.units[name]);
                let area = this.areas[idx];

                if (init) {
                    unit.power = 0;
                }
                else {
                    this.status[player].crop = (parseFloat(this.status[player].crop) - parseFloat(unit.crop)).toFixed(2);
                    this.status[player].crop = Number(this.status[player].crop.toString());
                }

                if (unit.crop)
                    this.status[player].units += unit.crop;

                unit.player = player;
                unit.direction = player === 'white' ? 6 : 12;
                area.unit = unit;
            }
            else {
                appLib.bandMessage(this.getPlayer(), '오류가 있습니다.', this.messageTime, !global.online);
                console.error('error');
            }
        },

        setLabel: function (player, txt, time) {
            let t = this;
            clearTimeout(t.timer['label']);
            $('#labelArea').stop().fadeIn(0);

            t.label.player = global.online ? global.player : player;
            t.label.message = txt;

            if (time === 0) {
                t.label.message = txt;
            }
            else {
                t.timer['label'] = setTimeout(function () {
                    $('#labelArea').stop().fadeOut(500, function () {
                        t.label.message = null;
                    });
                }, 2000);
            }
        },

        setTurn: function (player) {
            let crop = 0;
            let buffArr = this.getBuff();

            this.status.turn = player;
            this.setLabel(player, player + ' player turn');

            for (let i in this.areas) {
                let eachArea = this.areas[i];
                let eachUnit = eachArea.unit;

                if (eachUnit.name) {
                    if (eachUnit.player === player) {
                        let inInBuffArr = false;
                        let restoreHp = 0;
                        let isInShelterOrArea = this.getIsInShelterOrArea(i);

                        for (let j in buffArr) {
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
                            let each = 0;

                            if (player === eachArea.owner) {
                                if (player === 'white')
                                    each = eachArea.hnum + 1;
                                else if (player === 'black')
                                    each = eachArea.hnum - ((eachArea.hnum - Math.round(this.base.rowNum / 2)) * 2);
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

                        if (eachUnit.rided.length) {
                            for (let i in eachUnit.rided) {
                                eachUnit.rided[i].hp += eachUnit.rided[i].restoreHp;
                                eachUnit.rided[i].power += eachUnit.rided[i].restorePower;

                                if (eachUnit.rided[i].hp > eachUnit.rided[i].maxHp)
                                    eachUnit.rided[i].hp = eachUnit.rided[i].maxHp;

                                if (eachUnit.rided[i].power > eachUnit.rided[i].maxPower)
                                    eachUnit.rided[i].power = eachUnit.rided[i].maxPower;
                            }
                        }
                    }
                }
            }

            if (this.status.turn)
                appLib.bandMessage(this.getPlayer(), this.getLang('ko', player) + ' 플레이어에게 턴을 넘겼습니다.', this.messageTime, !global.online);

            crop = parseFloat(crop).toFixed(2);
            this.status[player].crop = (parseFloat(this.status[player].crop) + parseFloat(this.status[player].incomeCrop) + parseFloat(crop)).toFixed(2);
            this.status[player].crop = Number(this.status[player].crop.toString());
            this.status[player].time = this.base.time;

            if (this.status[player].crop > this.status[player].maxCrop)
                this.status[player].crop = this.status[player].maxCrop;

            this.setBuff();
            this.setCheckLevel();
            this.setAreaDefault();
            this.setActiveDefault();
            this.setGrabbedDefault();
            this.setTimer(player);
        },
        setAutoRotate: function () {
            let autoRotates = [{
                area: this.areas[this.active.idx - this.base.columNum],
                direction: this.areas[this.active.idx].unit === 'black' ? 12 : 6
            }, {
                area: this.areas[this.active.idx + 1],
                direction: 9
            }, {
                area: this.areas[this.active.idx + this.base.columNum],
                direction: this.areas[this.active.idx].unit === 'black' ? 6 : 12
            }, {
                area: this.areas[this.active.idx - 1],
                direction: 3
            }];

            for (let i in autoRotates) {
                let area = autoRotates[i].area;

                if (area && area.unit && area.unit.name && this.getIsUnitInArea(this.active.idx) && area.unit.player !== this.areas[this.active.idx].unit.player && this.getIsInCross(this.active.idx, area.idx))
                    area.unit.direction = autoRotates[i].direction;
            }

            if (this.autoRotateArr.length) {
                for (let i in this.autoRotateArr) {
                    if (this.getIsUnitInArea(this.autoRotateArr[i].idx))
                        this.areas[this.autoRotateArr[i].idx].unit.direction = this.autoRotateArr[i].direction;
                }

                this.autoRotateArr = [];
            }
        },
        setTimer: function (player) {
            let t = this;
            clearInterval(t.interval['timer']);

            t.interval['timer'] = setInterval(function () {
                if (t.status[player].time > 0) {
                    t.status[player].time -= 1;
                }
                else {
                    let nextPlayer = player === 'white' ? 'black' : 'white';
                    appLib.bandMessage(t.getPlayer(), '유효 시간이 지났습니다.', t.messageTime, !global.online);
                    t.setTurn(nextPlayer);
                    t.setModalClose();
                }
            }, 1000);
        },
        setModalClose: function () {
            this.modal = {
                idx: null,
                info: {},
                type: null
            };
        },
        setFinished: function () {
            if (!this.status.finished) {
                let king = {
                    white: 0,
                    black: 0
                };

                for (let i in this.areas) {
                    let unit = this.areas[i].unit;

                    if (unit.name) {
                        if (unit.name === 'king') {
                            king[unit.player] += 1;

                            if (king.white && king.black)
                                break;
                        }
                        else if (unit.rided.length) {
                            for (let j in unit.rided) {
                                if (unit.rided[j].name === 'king') {
                                    king[unit.player] += 1;

                                    if (king.white && king.black)
                                        break;
                                }
                            }
                        }
                    }
                }

                if (!king.white || !king.black) {
                    let winner = !king.white ? 'black' : 'white';
                    let player = global.online ? global.player : winner;

                    this.setLabel(player, winner + ' player won', 0);
                    appLib.bandMessage(player, this.getLang('ko', winner) + ' 플레이어가 승리하였습니다. 홈(home) 버튼을 통해 새로고침이 가능합니다.', 0, !global.online);
                    clearInterval(this.interval['timer']);

                    for (let i in this.areas)
                        this.areas[i].owner = winner;

                    this.status.finished = true;
                }
            }
        },
        get: function (key, update, func) {
            let t = this;

            t.interval[key] = setInterval(function () {
                let args = {
                    id: global.id,
                    player: global.player,
                    type: 'check',
                    update: update
                };

                $.post('./?ctrl=api&act=check', args, function (res) {
                    if (res) {
                        let data = JSON.parse(res);
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
                                    t[data.method](data.arg1, data.arg2, data.arg3, true);
                                else if (!appLib.isNullOrEmpty(data.arg1) && !appLib.isNullOrEmpty(data.arg2))
                                    t[data.method](data.arg1, data.arg2, true);
                                else if (!appLib.isNullOrEmpty(data.arg1))
                                    t[data.method](data.arg1, true);
                                else
                                    t[data.method](true);
                            }
                        }
                    }
                });
            }, 500);
        },
        post: function (method, arg1, arg2, arg3) {
            let args = {
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
    },
    created: function () {
        this.global = global;

        if (global.online) {
            this.label.player = global.player;
        }
        else {
            global.first = ['0', '1'][appLib.getRandom(0, 1)];
            this.label.player = global.first === '0' ? 'black' : 'white';
        }

        this.status['white'].maxCrop = this.base.maxCrop;
        this.status['white'].maxUnit = this.base.maxUnit;
        this.status['black'].maxCrop = this.base.maxCrop;
        this.status['black'].maxUnit = this.base.maxUnit;

        this.label.message = "let's march";
        this.device = appLib.isMobileDevice() ? 'mobile' : 'pc';

        for (let i in this.base.units) {
            this.base.units[i].buffed = appLib.renew(this.base.buffed);
        }

        for (let i = 0; i < 160; i += 1) {
            let each = appLib.renew(this.base.area);
            let remain = i % this.base.columNum;
            let hnum = this.getVerticalNum(i);

            each.idx = i;
            each.hidx = i;
            each.vidx = hnum + (remain * this.base.rowNum);
            each.vnum = this.getVerticalNum(each.vidx, true);
            each.hnum = hnum;

            if (i % 10 === 9)
                each.type = 'sea';

            if (i < this.base.nature.start) {
                each.owner = 'white';
                each.ownOnly = true;
            }
            else if (i > this.base.nature.end) {
                each.owner = 'black';
                each.ownOnly = true;
            }

            this.areas.push(each);

            if (i >= 33 && i <= 35)
                this.setUnit('white', 'shield', i, true);
            else if (i >= 123 && i <= 125)
                this.setUnit('black', 'shield', i, true);
            else if (i === 24)
                this.setUnit('white', 'king', i, true);
            else if (i === 23 || i === 25)
                this.setUnit('white', 'horse', i, true);
            else if (i === 133 || i === 135)
                this.setUnit('black', 'horse', i, true);
            else if (i === 134)
                this.setUnit('black', 'king', i, true);
        }

        setTimeout(function () {
            $('#app').fadeIn();
            $('.area-player[data-player=black] .units').scrollLeft($(this).width());
        }, 500);

        if (global.online) {
            if ((global.player === 'black' && global.first === '0') || global.player === 'white' && global.first === '1') {
                t.get('initLoopCheck', 0, function () {
                    this.touchLabel();
                });
            }
        }

        if (navigator.platform !== 'Win32') {
            $(document).on('contextmenu', function (e) {
                e.preventDefault();
            });
        }

        window.onbeforeunload = function () {
            if (this.status.finished)
                return;
            else
                return true;
        };
    }
});