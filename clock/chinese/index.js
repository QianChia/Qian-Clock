/*
 * Copyright (C) Qian Chia Studio. All rights reserved.
 * Created by Qian Chia on 02/17/2022.
 */

let app = new Vue({
    el: '#app',
    data: {
        date: new Date(),
        shiChen: [
            { label: '子时', min: '23', max: '1' },
            { label: '丑时', min: '1', max: '3' },
            { label: '寅时', min: '3', max: '5' },
            { label: '卯时', min: '5', max: '7' },
            { label: '辰时', min: '7', max: '9' },
            { label: '巳时', min: '9', max: '11' },
            { label: '午时', min: '11', max: '13' },
            { label: '未时', min: '13', max: '15' },
            { label: '申时', min: '15', max: '17' },
            { label: '酉时', min: '17', max: '19' },
            { label: '戌时', min: '19', max: '21' },
            { label: '亥时', min: '21', max: '23' },
        ],
    },

    mounted() {
        
        setInterval(() => {
            this.getTime();
        }, 1000);
    },

    methods: {
        cn(num) {
            num = Number(num);
            let upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            let length = String(num).length;
            if (length === 1) {
                return upperCaseNumber[num];
            } else if (length === 2) {
                if (num === 10) {
                    return upperCaseNumber[num];
                } else if (num > 10 && num < 20) {
                    return '十' + upperCaseNumber[String(num).charAt(1)];
                } else {
                    return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
                }
            } else {
                let str = '';
                for (let i in String(num)) {
                    str += upperCaseNumber[String(num).charAt(i)]
                }
                return str;
            }
        },

        getTime() {
            this.date = new Date();
        },
    },

    computed: {

        year() {
            return this.cn(this.date.getFullYear());
        },

        monthContentRotate() {
            let deg = this.date.getMonth() * (360 / 12);
            return {
                style: 'transform:rotate(' + deg + 'deg);transition: all 300ms;',
                deg: deg
            };
        },

        dayContentRotate() {
            let deg = (this.date.getDate() - 1) * (360 / this.totalDate);
            return {
                style: 'transform:rotate(' + deg + 'deg);transition: all 300ms;',
                deg: deg
            };
        },

        weekContentRotate() {
            let deg = this.date.getDay() * (360 / 7);
            return {
                style: 'transform:rotate(' + deg + 'deg);transition: all 300ms;',
                deg: deg
            };
        },

        shiChenContentRotate() {
            let hour = this.date.getHours();
            let curr = 0;
            for (let i = 0; i < this.shiChen.length; i++) {
                if (hour >= this.shiChen[i].min && hour <= this.shiChen[i].max) {
                    curr = i;
                    break;
                }
            }
            let deg = curr * (360 / 12);
            return {
                style: 'transform:rotate(' + deg + 'deg);transition: all 300ms;',
                deg: deg
            };
        },

        hourContentRotate() {
            let deg = this.date.getHours() * (360 / 24);
            return {
                style: 'transform:rotate(' + deg + 'deg);transition: all 300ms;',
                deg: deg
            };
        },

        minuteContentRotate() {
            let deg = this.date.getMinutes() * (360 / 60);
            return {
                style: 'transform:rotate(' + deg + 'deg);transition: all 300ms;',
                deg: deg
            };
        },

        secondContentRotate() {
            let deg = this.date.getSeconds() * (360 / 60);
            return {
                style: 'transform:rotate(' + deg + 'deg);transition: all 300ms;',
                deg: deg
            };
        },

        totalDate() {
            let year = this.date.getFullYear();
            let month = this.date.getMonth() + 1;
            return new Date(year, month, 0).getDate();
        },

        monthList() {
            let list = [];
            let total = 12;
            let deg = 360 / total;
            for (let i = 0; i < total; i++) {
                list.push({
                    label: this.cn(i + 1) + '月',
                    deg: -deg * i,
                })
            }
            return list;
        },

        dayList() {
            let list = [];
            let total = this.totalDate;
            let deg = 360 / total;
            for (let i = 1; i <= total; i++) {
                list.push({
                    label: this.cn(i) + '日',
                    deg: -deg * (i - 1),
                })
            }
            return list;
        },

        weekList() {
            let list = [];
            let total = 7;
            let deg = 360 / total;
            let cnList = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            for (let i = 0; i < total; i++) {
                list.push({
                    label: cnList[i],
                    deg: -deg * i,
                })
            }
            return list;
        },

        shiChenList() {
            let list = [];
            let total = 12;
            let deg = 360 / total;
            for (let i = 0; i < total; i++) {
                list.push({
                    label: this.shiChen[i].label,
                    deg: -deg * i,
                })
            }
            return list;
        },

        hourList() {
            let list = [];
            let total = 24;
            let deg = 360 / total;
            for (let i = 0; i < total; i++) {
                list.push({
                    label: this.cn(i) + '时',
                    deg: -deg * i,
                })
            }
            return list;
        },

        minuteList() {
            let list = [];
            let total = 60;
            let deg = 360 / total;
            for (let i = 0; i < total; i++) {
                list.push({
                    label: this.cn(i) + '分',
                    deg: -deg * i,
                })
            }
            return list;
        },

        secondList() {
            let list = [];
            let total = 60;
            let deg = 360 / total;
            for (let i = 0; i < total; i++) {
                list.push({
                    label: this.cn(i) + '秒',
                    deg: -deg * i,
                })
            }
            return list;
        }
    }
})