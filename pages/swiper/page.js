import { setGrids, shape, indexToCoordinate, coordinateToIndex, isCross, coordinateChange } from './util';




Page({
    data: {
        grids: [],
        actives: []
    },
    randomIndex() {
        return shape(Math.ceil(Math.random() * 12));
    },
    onLoad() {
        this.setData({ grids: setGrids(20, 15) });
        this.movings = this.randomIndex();
        this.init();
        this.actives = [];
        this.windowWidth = wx.getSystemInfoSync().windowWidth;
    },
    stoptouchmove() {
        return false;
    },
    move() {
        this.movings.forEach((item) => {
            this.data.grids[item].status = 'none';
        });

        this.movings = this.movings.map((item, index) => {
            this.data.grids[item + 15] && (this.data.grids[item + 15].status = 'active');
            return item + 15;
        });

        this.setData({ grids: this.data.grids });
    },
    isGoOn(movings) {
        for(let i = 0; i < 18; i++) {
            let arr = [movings[0] + i * 15, movings[1] + i * 15, movings[2] + i * 15, movings[3] + i * 15];
            
            if(isCross(arr, this.actives)) {
                return i;
            }
        }

        return 100;
    },
    isRightGoOn(movings) {
        for(let i = 0; i < 15; i++) {
            let arr = [movings[0] + i , movings[1] + i, movings[2] + i, movings[3] + i];
            
            if(isCross(arr, this.actives)) {
                return i;
            }
        }
        return 100;
    },
    isLeftGoOn(movings) {
        for(let i = 0; i < 15; i++) {
            let arr = [movings[0] - i, movings[1] - i, movings[2] - i, movings[3] - i];
            
            if(isCross(arr, this.actives)) {
                return i;
            }
        }
        return 100;
    },
    init() {
        this.timer = setInterval(() => {
            let ok = this.isGoOn(this.movings);

            if(ok === 0) {
                clearInterval(this.timer);
                return;
            }
            
            if(this.movings[3] > 284 || ok === 1) {
                this.actives.push(...this.movings);

                this.movings = this.randomIndex();
                this.move();
                return
            };
            this.move();
        }, 500);
    },
    onHandleDeirect(e) {
        if(e.detail.x > this.windowWidth / 2) {
            this.onMoveRight();
        } else {
            this.onMoveLeft();
        }
    },
    onMoveRight() {
        const x = [];

        this.movings.forEach((item) => {
            x.push(indexToCoordinate(item)[0]);
        });

        // 滚到最右边了
        if(Math.max(...x) === 14) return;

        let ok = this.isRightGoOn(this.movings);

        if(ok <= 1) return;

        for(let i = this.movings.length; i--;) {
            this.data.grids[this.movings[i]].status = 'none';
            this.data.grids[this.movings[i] + 1].status = 'active';
            this.movings[i] += 1;
        }

        this.setData(this.data);
    },
    onMoveLeft() {
        const x = [];

        this.movings.forEach((item) => {
            x.push(indexToCoordinate(item)[0]);
        });

        if(Math.min(...x) === 0) return;

        let ok = this.isLeftGoOn(this.movings);

        if(ok <= 1) return;

        this.movings = this.movings.map((item) => {
            this.data.grids[item].status = 'none';
            this.data.grids[item - 1].status = 'active';
            return item - 1;
        });

        this.setData(this.data);
    },
    change(arr) {
        let a = arr[0] % 15;
        let b = Math.floor(arr[0] / 15);
        let tmp = [arr[0]]
        for(let i = 1; i < arr.length; i++) {
            tmp[i] = (a + b - Math.floor(arr[i] / 15)) + 15 * (arr[i] % 15 - a + b - 1);
        }

        return tmp;
    },
    onChangeShape(e) {
        if(e.detail.x > this.windowWidth / 2) {
            const origin = indexToCoordinate(this.movings[0]);
            const points = [];

            for(let i = 1, len = this.movings.length; i < len; i++) {
                const point = indexToCoordinate(this.movings[i]);

                const [x, y] = coordinateChange(origin, point);
                if(x < 0 || x > 14) {
                    return;
                } else {
                    points.push([x, y]);
                }
            }
            points.unshift(origin);
            
            const tmpMovings = points.map((item) => {
                return item[0] + item[1] * 15;
            });

            if(Math.min(...tmpMovings) < 0 || Math.max(...tmpMovings) > 284) {
                return;
            }

            let oks = [this.isGoOn(tmpMovings), this.isLeftGoOn(tmpMovings), this.isRightGoOn(tmpMovings)];

            if(Math.min(...oks) <= 1) {
                return;
            }

            this.movings.forEach((item) => {
                this.data.grids[item].status = 'none';
            });

            this.movings = tmpMovings;
            
            this.movings.forEach((item, index) => {
                this.data.grids[item].status = 'active';
            });
    
            this.setData({ grids: this.data.grids });
            
        } else {
            console.log('直接到底');
        }
    }
});