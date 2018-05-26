import { setGrids, shape, indexToCoordinate, coordinateToIndex, isCross, coordinateChange } from './util';


Page({
    data: {
        grids: [],
        actives: []
    },
    randomIndex() {
        // return shape(Math.ceil(Math.random() * 12));
        return shape(1);
    },
    onLoad() {
        this.rows = 20;
        this.columns = 15;

        this.setData({ grids: setGrids(this.rows, this.columns) });
        this.movings = this.randomIndex();
        this.init();
        this.actives = [];
        this.windowWidth = wx.getSystemInfoSync().windowWidth;
    },
    checkScore() {
        for(let r = 0; r < this.rows; r++) {
            let flag = true;

            inner: for(let i = 0; i < this.columns; i++) {
                if(this.data.grids[r * this.columns + i].status !== 'active') {
                    flag = false;
                    break inner;
                }
            }

            if(flag) {
                console.log(r);
                // 下移该得分行上面的行
                for(let i = 0, tar = r * this.columns; i < tar; i++) {
                    this.actives[i] += this.columns;
                }

                // 清除该行
                this.actives.splice(r * this.columns, this.columns);
            }
        }

        this.data.grids.forEach(item => {
            item.status = 'none';
        });

        this.actives.forEach(item => {
            this.data.grids[item].status = 'active';
        });

        this.setData(this.data);
    },
    stoptouchmove() {
        return false;
    },
    move() {
        this.movings.forEach((item) => {
            this.data.grids[item].status = 'none';
        });

        this.movings = this.movings.map((item, index) => {
            this.data.grids[item + this.columns] && (this.data.grids[item + this.columns].status = 'active');
            return item + this.columns;
        });

        this.setData({ grids: this.data.grids });
    },
    isGoOn(movings) {
        for(let i = 0; i < 18; i++) {
            let arr = [movings[0] + i * this.columns, movings[1] + i * this.columns, movings[2] + i * this.columns, movings[3] + i * this.columns];
            
            if(isCross(arr, this.actives)) {
                return i;
            }
        }

        return 100;
    },
    isRightGoOn(movings) {
        for(let i = 0; i < this.columns; i++) {
            let arr = [movings[0] + i , movings[1] + i, movings[2] + i, movings[3] + i];
            
            if(isCross(arr, this.actives)) {
                return i;
            }
        }
        return 100;
    },
    isLeftGoOn(movings) {
        for(let i = 0; i < this.columns; i++) {
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
            
            if(this.movings[3] > this.columns * (this.rows - 1) || ok === 1) {
                this.actives.push(...this.movings);
                this.checkScore();
                // 重新开始下一轮下落
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
        if(Math.max(...x) === this.columns - 1) return;

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
    onChangeShape(e) {
        if(e.detail.x > this.windowWidth / 2) {
            const start = indexToCoordinate(this.movings[1]);
            const end = indexToCoordinate(this.movings[3]);
            // const origin = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];

            const origin = indexToCoordinate(this.movings[1]);
            const points = [];

            for(let i = 0, len = this.movings.length; i < len; i++) {
                const point = indexToCoordinate(this.movings[i]);

                const [x, y] = coordinateChange(origin, point);
                if(x < 0 || x > this.columns - 1) {
                    return;
                } else {
                    points.push([x, y]);
                }
            }
            
            const tmpMovings = points.map((item) => item[0] + item[1] * this.columns)
                                     .sort((a, b) => a - b);

            if(Math.min(...tmpMovings) < 0 || Math.max(...tmpMovings) > this.columns * (this.rows - 1)) {
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