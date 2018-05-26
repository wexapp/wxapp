Page({
    data: {
        range: [
            ['2018年', '2019年', '2020年', '2021年', '2022年', '2023年'],
            ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
            ['01日', '02日', '03日', '04日', '05日', '06日', '07日', '08日', '09日', '10日', '11日', '12日', '13日', '14日', '15日'],
            ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
        ],
        active: true,
        value: [1, 1, 1, 1]
    },
    btntap(e) {
        this.setData({ active: true });
    },
    onColumnChange(e) {
        // let column = e.detail.column;
        // if(e.detail.column === 2) {
        //     this.data.range[column + 1] = this.data.range[column + 1].slice(1, 5);
        // }

        // this.setData({ range: this.data.range });
    },
    onChange(e) {
        this.setData({ active: false, value: e.detail.value });
    },
    onCancel(e) {
        this.setData({ active: false });
    }
});