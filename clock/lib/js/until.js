/**
 * Copyright (C) Qian Chia Studio. All rights reserved.
 * Created by Qian Chia on 09/28/2021.
 */

/****************************************************************************************************************/

/**
 * 自动将 form 表单封装成 json 对象
 */

function formToJSON(f) {
    var d = {};
    var fd = $(f).serializeArray();
    $(fd).each(function () {
        if (d[this.name] !== undefined) {
            if (!Array.isArray(d[this.name])) {
                d[this.name] = [d[this.name]];
            }
            d[this.name].push(this.value == "" ? null : this.value);
        } else {
            d[this.name] = this.value == "" ? null : this.value;
        }
    });
    return d;
}

/****************************************************************************************************************/

/**
 * 时间戳转换
 */

// 阴历 Date
function formatDate_lunarDate(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return new Date(lunarDate["lYear"] + '-' + lunarDate["lMonth"] + '-' + lunarDate["lDay"] + ' ' + formatDateHMS(value));
}

// 年-月-日 时:分:秒
function formatDate(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var Y = date.getFullYear() + '-';
    var M = ((date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-';
    var D = ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate()) + ' ';
    var h = ((date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours()) + ':';
    var m = ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes()) + ':';
    var s = ((date.getSeconds() < 10) ? ('0' + date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
}

// 年-月-日 时:分:秒（阴历）
function formatDate_lunar(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["lYear"] + '-' + lunarDate["lMonth"] + '-' + lunarDate["lDay"] + ' ' + formatDateHMS(value);
}

// 年-月-日 时:分:秒（阴历 大写）
function formatDate_lunar_A(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["gzYear"] + '年' + '-' + lunarDate["IMonthCn"].replace('月', '') + '月' + '-' + lunarDate["IDayCn"] + '日' + ' ' + formatDateHMS(value);
}

// 年-月-日 时:分
function formatDateYMDHM(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var Y = date.getFullYear() + '-';
    var M = ((date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-';
    var D = ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate()) + ' ';
    var h = ((date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours()) + ':';
    var m = ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes());
    return Y + M + D + h + m;
}

// 年-月-日 时
function formatDateYMDH(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var Y = date.getFullYear() + '-';
    var M = ((date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-';
    var D = ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate()) + ' ';
    var h = ((date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours());
    return Y + M + D + h;
}

// 年-月-日
function formatDateYMD(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var Y = date.getFullYear() + '-';
    var M = ((date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-';
    var D = ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate());
    return Y + M + D;
}

// 年
function formatDateY(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var Y = date.getFullYear();
    return Y;
}

// 年（阴历）
function formatDateY_lunar(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["lYear"];
}

// 年（阴历 大写）
function formatDateY_lunar_A(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["gzYear"] + '年';
}

// 月
function formatDateM(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var M = ((date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1));
    return M;
}

// 月（阴历）
function formatDateM_lunar(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["lMonth"];
}

// 月（阴历 大写）
function formatDateM_lunar_A(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["IMonthCn"].replace('月', '') + '月';
}

// 日
function formatDateD(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var D = ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate());
    return D;
}

// 日（阴历）
function formatDateD_lunar(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["lDay"];
}

// 日（阴历 大写）
function formatDateD_lunar_A(value) {
    let lunarDate = solar2lunar(formatDateY(value), formatDateM(value), formatDateD(value));
    return lunarDate["IDayCn"] + '日';
}

// 月-日
function formatDateMD(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var M = ((date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-';
    var D = ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate());
    return M + D;
}

// 时:分:秒
function formatDateHMS(value) {
    var date = new Date(value);  // 时间戳为 10 位需 *1000，时间戳为 13 位的话不需乘 1000
    var h = ((date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours()) + ':';
    var m = ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes()) + ':';
    var s = ((date.getSeconds() < 10) ? ('0' + date.getSeconds()) : date.getSeconds());
    return h + m + s;
}

/****************************************************************************************************************/

/**
 *  公历（阳历）与 农历（阴历） 转换
 *
 * 1900-2100
 *
 * 公历转农历：solar2lunar(1987, 11, 01);    // [you can ignore params of prefix 0]
 * 农历转公历：lunar2solar(1987, 09, 10);    // [you can ignore params of prefix 0]
 */

/**
* 返回农历y年一整年的总天数
* @param lunar Year
* @return Number
* @evar .lYearDays(1987) ;//count=387
*/
function lYearDays(y) {
    /**
     * 农历 1900-2100 的润大小信息表
     * @Array Of Property
     * @return Hex 
     */
    let lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
        0x0d520];//2100

    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) { sum += (lunarInfo[y - 1900] & i) ? 1 : 0; }
    return (sum + leapDays(y));
}

/**
* 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
* @param lunar Year
* @return Number (0-12)
* @eg:var leapMonthM = leapMonth(1987) ;//leapMonth=6
*/
function leapMonth(y) { //闰字编码 \u95f0
    /**
     * 农历 1900-2100 的润大小信息表
     * @Array Of Property
     * @return Hex 
     */
    let lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
        0x0d520];//2100

    return (lunarInfo[y - 1900] & 0xf);
}

/**
* 返回农历y年闰月的天数 若该年没有闰月则返回0
* @param lunar Year
* @return Number (0、29、30)
* @eg:var leapMonthDay = leapDays(1987) ;//leapMonthDay=29
*/
function leapDays(y) {
    /**
     * 农历 1900-2100 的润大小信息表
     * @Array Of Property
     * @return Hex 
     */
    let lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
        0x0d520];//2100

    if (leapMonth(y)) {
        return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    }
    return (0);
}

/**
* 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
* @param lunar Year
* @return Number (-1、29、30)
* @eg:var MonthDay = monthDays(1987,9) ;//MonthDay=29
*/
function monthDays(y, m) {
    /**
     * 农历 1900-2100 的润大小信息表
     * @Array Of Property
     * @return Hex 
     */
    let lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,//1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,//1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,//1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,//1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,//1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,//1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,//1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,//1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,//1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,//1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,//2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,//2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,//2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,//2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,//2040-2049
        /**Add By JJonline@JJonline.Cn**/
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,//2050-2059
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,//2060-2069
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,//2070-2079
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,//2080-2089
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,//2090-2099
        0x0d520];//2100

    if (m > 12 || m < 1) { return -1 }//月份参数从1至12，参数错误返回-1
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

/**
* 返回公历(!)y年m月的天数
* @param solar Year
* @return Number (-1、28、29、30、31)
* @eg:var solarMonthDay = leapDays(1987) ;//solarMonthDay=30
*/
function solarDays(y, m) {
    if (m > 12 || m < 1) { return -1 } //若参数错误 返回-1

    /**
    * 公历每个月份的天数普通表
    * @Array Of Property
    * @return Number 
    */
    let solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var ms = m - 1;
    if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    } else {
        return (solarMonth[ms]);
    }
}

/**
* 农历年份转换为干支纪年
* @param  lYear 农历年的年份数
* @return Cn string
*/
function toGanZhiYear(lYear) {
    /**
    * 天干地支之天干速查表
    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
    * @return Cn string 
    */
    let Gan = ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"];

    /**
    * 天干地支之地支速查表
    * @Array Of Property 
    * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
    * @return Cn string 
    */
    let Zhi = ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"];

    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10;//如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12;//如果余数为0则为最后一个地支
    return Gan[ganKey - 1] + Zhi[zhiKey - 1];
}

/**
* 公历月、日判断所属星座
* @param  cMonth [description]
* @param  cDay [description]
* @return Cn string
*/
function toAstro(cMonth, cDay) {
    var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7";//座
}

/**
* 传入offset偏移量返回干支
* @param offset 相对甲子的偏移量
* @return Cn string
*/
function toGanZhi(offset) {
    /**
    * 天干地支之天干速查表
    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
    * @return Cn string 
    */
    let Gan = ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"];

    /**
    * 天干地支之地支速查表
    * @Array Of Property 
    * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
    * @return Cn string 
    */
    let Zhi = ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"];

    return Gan[offset % 10] + Zhi[offset % 12];
}

/**
* 传入公历(!)y年获得该年第n个节气的公历日期
* @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
* @return day Number
* @eg:var _24 = getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
*/
function getTerm(y, n) {
    /**
    * 1900-2100各年的24节气日期速查表
    * @Array Of Property 
    * @return 0x string For splice
    */
    let sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'];

    if (y < 1900 || y > 2100) { return -1; }
    if (n < 1 || n > 24) { return -1; }
    var _table = sTermInfo[y - 1900];
    var _info = [
        parseInt('0x' + _table.substr(0, 5)).toString(),
        parseInt('0x' + _table.substr(5, 5)).toString(),
        parseInt('0x' + _table.substr(10, 5)).toString(),
        parseInt('0x' + _table.substr(15, 5)).toString(),
        parseInt('0x' + _table.substr(20, 5)).toString(),
        parseInt('0x' + _table.substr(25, 5)).toString()
    ];
    var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),

        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),

        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),

        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),

        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),

        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2),
    ];
    return parseInt(_calday[n - 1]);
}

/**
* 传入农历数字月份返回汉语通俗表示法
* @param lunar month
* @return Cn string
* @eg:var cnMonth = toChinaMonth(12) ;//cnMonth='腊月'
*/
function toChinaMonth(m) { // 月 => \u6708
    if (m > 12 || m < 1) { return -1 } //若参数错误 返回-1

    /**
    * 月份转农历称呼速查表
    * @Array Of Property 
    * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
    * @return Cn string 
    */
    let nStr3 = ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341", "\u51ac", "\u814a"];

    var s = nStr3[m - 1];
    s += "\u6708";//加上月字
    return s;
}

/**
* 传入农历日期数字返回汉字表示法
* @param lunar day
* @return Cn string
* @eg:var cnDay = toChinaDay(21) ;//cnMonth='廿一'
*/
function toChinaDay(d) { //日 => \u65e5
    /**
    * 数字转中文速查表
    * @Array Of Property 
    * @trans ['日','一','二','三','四','五','六','七','八','九','十']
    * @return Cn string 
    */
    let nStr1 = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"];

    /**
    * 日期转农历称呼速查表
    * @Array Of Property 
    * @trans ['初','十','廿','卅']
    * @return Cn string 
    */
    let nStr2 = ["\u521d", "\u5341", "\u5eff", "\u5345"];

    var s;
    switch (d) {
        case 10:
            s = '\u521d\u5341'; break;
        case 20:
            s = '\u4e8c\u5341'; break;
            break;
        case 30:
            s = '\u4e09\u5341'; break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}

/**
* 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
* @param y year
* @return Cn string
* @eg:var animal = getAnimal(1987) ;//animal='兔'
*/
function getAnimal(y) {
    /**
    * 天干地支之地支速查表<=>生肖
    * @Array Of Property 
    * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
    * @return Cn string 
    */
    let Animals = ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21", "\u72d7", "\u732a"];

    return Animals[(y - 4) % 12]
}

/**
* 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
* @param y  solar year
* @param m  solar month
* @param d  solar day
* @return JSON object
* @eg:console.log(solar2lunar(1987,11,01));
*/
function solar2lunar(y, m, d) { //参数区间1900.1.31~2100.12.31
    //年份限定、上限
    if (y < 1900 || y > 2100) {
        return -1;// undefined转换为数字变为NaN
    }
    //公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
        return -1;
    }
    //未传参  获得当天
    if (!y) {
        var objDate = new Date();
    } else {
        var objDate = new Date(y, parseInt(m) - 1, d)
    }
    var i, leap = 0, temp = 0;
    //修正ymd参数
    var y = objDate.getFullYear(),
        m = objDate.getMonth() + 1,
        d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
        temp = lYearDays(i);
        offset -= temp;
    }
    if (offset < 0) {
        offset += temp; i--;
    }

    //是否今天
    var isTodayObj = new Date(),
        isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
        isToday = true;
    }

    /**
    * 数字转中文速查表
    * @Array Of Property 
    * @trans ['日','一','二','三','四','五','六','七','八','九','十']
    * @return Cn string 
    */
    let nStr1 = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341"];

    //星期几
    var nWeek = objDate.getDay(),
        cWeek = nStr1[nWeek];
    //数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
        nWeek = 7;
    }
    //农历年
    var year = i;
    var leap = leapMonth(i); //闰哪个月
    var isLeap = false;

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && isLeap == false) {
            --i;
            isLeap = true; temp = leapDays(year); //计算农历闰月天数
        }
        else {
            temp = monthDays(year, i);//计算农历普通月天数
        }
        //解除闰月
        if (isLeap == true && i == (leap + 1)) { isLeap = false; }
        offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
        if (isLeap) {
            isLeap = false;
        } else {
            isLeap = true; --i;
        }
    }
    if (offset < 0) {
        offset += temp; --i;
    }
    //农历月
    var month = i;
    //农历日
    var day = offset + 1;
    //天干地支处理
    var sm = m - 1;
    var gzY = toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = getTerm(y, (m * 2 - 1));//返回当月「节」为几日开始
    var secondNode = getTerm(y, (m * 2));//返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
        gzM = toGanZhi((y - 1900) * 12 + m + 12);
    }

    /**
    * 24节气速查表
    * @Array Of Property 
    * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
    * @return Cn string 
    */
    let solarTerm = ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206", "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691", "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d", "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"];

    //传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
        isTerm = true;
        Term = solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
        isTerm = true;
        Term = solarTerm[m * 2 - 1];
    }
    //日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = toGanZhi(dayCyclical + d - 1);
    //该日期所属的星座
    var astro = toAstro(m, d);

    return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': getAnimal(year), 'IMonthCn': (isLeap ? "\u95f0" : '') + toChinaMonth(month), 'IDayCn': toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "\u661f\u671f" + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro };
}

/**
* 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
* @param y  lunar year
* @param m  lunar month
* @param d  lunar day
* @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
* @return JSON object
* @eg:console.log(lunar2solar(1987,9,10));
*/
function lunar2solar(y, m, d, isLeapMonth) {   //参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonthM = leapMonth(y);
    var leapDay = leapDays(y);
    if (isLeapMonth && (leapMonthM != m)) { return -1; }//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) { return -1; }//超出了最大极限值 
    var day = monthDays(y, m);
    var _day = day;
    //bugFix 2016-9-25 
    //if month is leap, _day use leapDays method 
    if (isLeapMonth) {
        _day = leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) { return -1; }//参数合法性效验

    //计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
        offset += lYearDays(i);
    }
    var leap = 0, isAdd = false;
    for (var i = 1; i < m; i++) {
        leap = leapMonth(y);
        if (!isAdd) {//处理闰月
            if (leap <= i && leap > 0) {
                offset += leapDays(y); isAdd = true;
            }
        }
        offset += monthDays(y, i);
    }
    //转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) { offset += day; }
    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();

    return solar2lunar(cY, cM, cD);
}

/****************************************************************************************************************/

/**
 * 复制文本
 */

function copy(i) {

    const range = document.createRange();
    range.selectNode(document.getElementById('content' + i));
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        selection.removeAllRanges();
    }
    selection.addRange(range);
    document.execCommand('copy');
    // alert("复制成功！");
    myAlert("复制成功！");
}

// 自定义弹窗
var layer = document.createElement("div");
layer.id = "layer";

function myAlert(data) {

    var style = {};
    if (data.indexOf("成功") != -1) {
        style = {
            'zIndex': '50',
            'color': "#048f09",
            'background': "#e1e5e8",
            'position': "absolute",
            'width': "350px",
            'height': "90px",
            'top': "50%",
            'left': "50%",
            'margin-top': '-150px',
            'margin-left': '-150px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'vertical-align': 'middle',
            'border-radius': '10px',
            'font-size': "20px",
            'padding': "20px"
        }
    } else {
        style = {
            'zIndex': '50',
            'color': "#f00",
            'background': "#e1e5e8",
            'position': "absolute",
            'width': "350px",
            'height': "90px",
            'top': "50%",
            'left': "50%",
            'margin-top': '-150px',
            'margin-left': '-150px',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'vertical-align': 'middle',
            'border-radius': '10px',
            'font-size': "20px",
            'padding': "20px"
        }
    }

    for (var i in style) {
        layer.style[i] = style[i];
    }
    if (document.getElementById("layer") == null) {
        layer.innerHTML = data;
        document.body.appendChild(layer);
        setTimeout("document.body.removeChild(layer)", 2000)
    }
}

/****************************************************************************************************************/

/**
 * 获取 url 中的查询字段值
 */

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/****************************************************************************************************************/

/**
 * 首字母大些
 */

function firstToUpper(str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

/****************************************************************************************************************/

/**
 * Cookie
 */

// 设置 cookie
function setCookie(name, value) {
    if (!name || !value) return;
    var Days = 1;  // 默认 1 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString();
}

function setAuthCookie(name, value, expiredDate) {
    if (!name || !value) return;
    var exp = new Date(Date.parse(expiredDate));
    exp.setTime(exp.getTime());
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString();
}

// 获取 cookie
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]);
    return null;
}

// 删除 cookie
function delCookie(name) {
    var Days = 1;  // 默认 1 天
    var exp = new Date();
    exp.setTime(exp.getTime() - Days * 24 * 60 * 60 * 1000);
    var cval = getCookie(name);
    if (cval) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}

/****************************************************************************************************************/

/**
 * Local Storage
 */

// 设置 Local Storage
function setLocalStorageData(name, value) {
    if (!name) return;

    let dataCache = JSON.parse(window.localStorage.getItem(name));
    let dataCacheHash = hex_md5(JSON.stringify(dataCache));
    let valueHash = hex_md5(JSON.stringify(value));

    // console.log("set Local Storage: ", name, dataCacheHash != valueHash);

    if (dataCacheHash != valueHash) {
        try {
            window.localStorage.setItem(name, JSON.stringify(value));
        } catch (error) {
            console.log('setLocalStorageData error: "QuotaExceededError: The quota has been exceeded."');
        }
        return true;
    }
    return false;
}

// 获取 Local Storage
function getLocalStorageData(name) {
    return JSON.parse(window.localStorage.getItem(name));
}

// 删除 Local Storage
function delLocalStorageData(name) {
    window.localStorage.removeItem(name);
}

// 删除 所有 Local Storage
function delAllLocalStorageData() {
    window.localStorage.clear();
}

/****************************************************************************************************************/

/**
 * Link List
 */

function listLink(type, category) {

    if (type == "" || type == null || type == "null" || category == "" || category == null || category == "null") {

        var html = '<table border=1 style="margin: 10px 20px 0 20px;">';
        html += '<p style="color: red; margin: 20px 20px 0 20px;">资源不存在 。。。😔</p>';
        html += '</table>';

        $("#link-list").empty();
        $("#link-list").append(html);

    } else {

        let key = category + "-list";
        let dataCache = getLocalStorageData(key);     // 获取 数据
        if (dataCache) {
            if (category != "Tool" && category != "Study" && category != "Blogs" && category != "Open" && category != "Demos" && category != "Tests" && category != "Repos") {
                initLinkListTable("Company", dataCache);
            } else {
                initLinkListTable(category, dataCache);
            }
        }

        $.ajax({
            url: "https://query.qianchia.com/api/link/type_category/" + type + "/" + category,
            type: "GET",
            headers: { Authorization: getCookie("token") },
            success: function (res) {
                if (setLocalStorageData(key, res.result)) {    // 存储 数据

                    if (category != "Tool" && category != "Study" && category != "Blogs" && category != "Open" && category != "Demos" && category != "Tests" && category != "Repos") {
                        initLinkListTable("Company", res.result);
                    } else {
                        initLinkListTable(category, res.result);
                    }
                }
            }
        })
    }
}

function initLinkListTable(category, listJsonData) {

    var jsonLinkData = new Array();

    for (var j in listJsonData) {
        var obj = listJsonData[j];
        if (obj.group != null || obj.group != "") {
            if (jsonLinkData[obj.group] == null) {
                jsonLinkData[obj.group] = [obj];
            } else {
                jsonLinkData[obj.group].push(obj);
            }
        }
    }
    delete jsonLinkData[""];

    // Render Link List Table

    var sortData = new Array();
    var sortJsonLinkData = Object.keys(jsonLinkData).sort();

    for (ki in sortJsonLinkData) {
        sortData[sortJsonLinkData[ki]] = jsonLinkData[sortJsonLinkData[ki]];
    }

    var html = '<table border=1 style="margin: 10px 20px 20px 0;">';

    if (!listJsonData || listJsonData.length == 0) {
        html += '<p style="color: red; margin: 20px 20px 0 20px;">资源不存在 。。。</p>';
    } else {

        var nameStr = "";
        var urlStr = "";
        var descriptionStr = "";
        var tag = "";
        var groupStr = "";

        if (category == "Company") {

            // 倒序
            sortData.reverse();

            var object = sortData[sortData.length - 1];
            for (var i in object) {

                var obj = object[i];

                if (obj.name == null) { nameStr = "" } else { nameStr = obj.name };
                if (obj.url == null) { urlStr = "" } else { urlStr = obj.url };
                if (obj.description == null) { descriptionStr = "" } else { descriptionStr = obj.description };
                if (obj.tag == null) { tag = "" } else { tag = obj.tag };
                if (obj.group == null) { groupStr = "" } else { groupStr = obj.group };

                // 分组 0
                html += '<tr>';
                html += '<td style="padding-left: 0; padding-top: 1px; padding-bottom: 1px; border-color: transparent; background-color: #fff;" colspan="3"><a href="' + urlStr + '" target="_blank">' + nameStr + '</a></td>';
                html += '</tr>';
            }

            for (var j in sortData) {

                var object = sortData[j];

                if (j != (sortData.length - 1)) {

                    // 空行
                    html += '<tr style="height: 25px; background-color: transparent;">'
                    html += '<td style="border-left-color: transparent; border-right-color: transparent;"></td>'
                    html += '<td style="border-left-color: transparent; border-right-color: transparent;"></td>'
                    html += '<td style="border-left-color: transparent; border-right-color: transparent;"></td>'
                    html += '</tr>';

                    // 分组标题
                    html += '<tr style="height: 30px; background-color: #ddd;">'
                    html += '<td style="border-left-color: #ddd; border-right-color: #ddd; padding: 0 10px;">' + object[0]["description"] + '</td>'
                    html += '<td style="border-left-color: #ddd; border-right-color: #ddd; padding: 0 13px;">' + object[0]["tag"] + '</td>'
                    html += '<td style="border-left-color: #ddd; border-right-color: #ddd; padding: 0 5px; text-align: center; color: #E7E7E7; font-size: 15px;">' + (sortData.length - 1 - j) + '</td>'
                    html += '</tr>';

                    // 空行
                    html += '<tr><td style="padding: 5px; border-color: transparent; background-color: #fff;" colspan="3"></td></tr>';

                    // 分组数据
                    for (var i in object) {

                        var obj = object[i];

                        if (obj.name == null) { nameStr = "" } else { nameStr = obj.name };
                        if (obj.url == null) { urlStr = "" } else { urlStr = obj.url };
                        if (obj.description == null) { descriptionStr = "" } else { descriptionStr = obj.description };
                        if (obj.tag == null) { tag = "" } else { tag = obj.tag };
                        if (obj.group == null) { groupStr = "" } else { groupStr = obj.group };

                        html += '<tr>';
                        html += '<td style="padding-top: 1px; padding-bottom: 1px; border-color: transparent; background-color: #fff; padding-left: 45px;"><a href="' + urlStr + '" target="_blank">' + nameStr + '</a></td>';
                        html += '<td style="padding-top: 1px; padding-bottom: 1px; border-color: transparent; background-color: #fff;"></td>';
                        html += '<td style="padding-top: 1px; padding-bottom: 1px; border-color: transparent; background-color: #fff;"></td>';
                        html += '</tr>';
                    }
                }
            }

        } else {

            for (var j in sortData) {

                var object = sortData[j];

                // 空行
                if (j != 1) {
                    html += '<tr style="height: 25px; background-color: transparent;">'
                    if (category == "Demos" || category == "Tests" || category == "Repos") {
                        html += '<td style="border-color:  #ddd transparent transparent transparent;"></td>'
                        html += '<td style="border-color:  #ddd transparent transparent transparent;"></td>'
                        html += '<td style="border-color:  #ddd transparent transparent transparent;"></td>'
                        html += '<td style="border-color:  #ddd transparent transparent transparent;"></td>'
                        html += '</tr>';
                        html += '<tr style="height: 25px; background-color: transparent;">'
                        html += '<td style="border-color: transparent transparent #ddd transparent;"></td>'
                        html += '<td style="border-color: transparent transparent #ddd transparent;"></td>'
                        html += '<td style="border-color: transparent transparent #ddd transparent;"></td>'
                        html += '<td style="border-color: transparent transparent #ddd transparent;"></td>'
                    } else {
                        html += '<td style="border-color: transparent;"></td>'
                        html += '<td style="border-color: transparent;"></td>'
                    }
                    html += '</tr>';
                }

                // 分组数据
                for (var i in object) {

                    var obj = object[i];

                    if (obj.name == null) { nameStr = "" } else { nameStr = obj.name };
                    if (obj.url == null) { urlStr = "" } else { urlStr = obj.url };
                    if (obj.description == null) { descriptionStr = "" } else { descriptionStr = obj.description };
                    if (obj.tag == null) { tag = "" } else { tag = obj.tag };
                    if (obj.group == null) { groupStr = "" } else { groupStr = obj.group };

                    html += '<tr>';
                    if (category == "Demos" || category == "Tests" || category == "Repos") {
                        if (i == 0) {
                            html += '<td style="padding-top: 1px; padding-bottom: 1px; text-align: center; border-color: #ddd transparent; background-color: #fff; color: #E7E7E7; font-size: 15px;">' + j + '</td>';
                        } else {
                            html += '<td style="padding-top: 1px; padding-bottom: 1px; text-align: center; border-color: #ddd transparent; background-color: #fff;"></td>';
                        }
                        html += '<td style="padding-top: 1px; padding-bottom: 1px; border-color: #ddd transparent; background-color: #fff;"><a href="' + urlStr + '" target="_blank">' + nameStr + '</a></td>';
                        html += '<td style="padding-top: 1px; padding-bottom: 1px; border-color: #ddd transparent; background-color: #fff;">' + descriptionStr + '</td>';
                        html += '<td style="padding-top: 1px; padding-bottom: 1px; border-color: #ddd transparent; background-color: #fff;">' + tag + '</td>';
                    } else {
                        if (i == 0) {
                            html += '<td style="padding-top: 1px; padding-bottom: 1px; text-align: center; border-color: transparent; background-color: #fff; color: #E7E7E7; font-size: 15px;">' + j + '</td>';
                        } else {
                            html += '<td style="padding-top: 1px; padding-bottom: 1px; text-align: center; border-color: transparent; background-color: #fff; "></td>';
                        }
                        html += '<td style="padding-top: 1px; padding-bottom: 1px; border-color: transparent; background-color: #fff;"><a href="' + urlStr + '" target="_blank" title="' + descriptionStr + '">' + nameStr + '</a></td>';
                    }
                    html += '</tr>';
                }
            }
        }
    }

    html += '</table>';

    $("#link-list").empty();
    $("#link-list").append(html);
}

/****************************************************************************************************************/

/**
 * user auth
 */

function initialStatus() {
    let token = getCookie("token");
    let userName = getCookie("userName");

    if (token != null && userName != null) {
        $("#login").attr("style", "display: none;");
        $("#logout").attr("style", "display: block;");
        $("#auth").attr("style", "display: block; height: 30px; margin-top: 20px; margin-bottom: 10px;");    // 计算登录模块高度
        $("#userNameInfo").empty();
        $("#userNameInfo").append('<i class="fa fa-user fa-lg" aria-hidden="true" style="margin-left: 15px; margin-right: 10px; color: #444;"></i>');
        $("#userNameInfo").append('<span style="color: #444; font-size: 18px;">' + userName + '</span>');
    } else {
        $("#login").attr("style", "display: block;");
        $("#logout").attr("style", "display: none;");
    }
}

function login() {
    var userName = document.getElementById("userName").value;
    var pwd = document.getElementById("pwd").value;
    if (userName == null || userName == '') {
        alert("请填写用户名！");
        return;
    } else if (pwd == null || pwd == '') {
        alert("请填写密码！");
        return;
    }
    let body = {
        "userName": userName,
        "password": hex_sha512(pwd)
    }
    $.ajax({
        method: "POST",
        data: body,
        url: "https://query.qianchia.com/api/auth/login",
        success: function (result) {
            if (result.code == 200) {
                setAuthCookie("token", result.result.token, result.result.expired_at);
                if (result.result.name != null && result.result.name != "") {
                    setAuthCookie("userName", result.result.name, result.result.expired_at);
                } else {
                    setAuthCookie("userName", result.result.username, result.result.expired_at);
                }
                $("#login").attr("style", "display: none;");
                $("#logout").attr("style", "display: block;");
                $("#auth").attr("style", "display: block; height: 30px; margin-top: 20px; margin-bottom: 10px;");    // 计算登录模块高度
                $("#userNameInfo").empty();
                $("#userNameInfo").append('<i class="fa fa-user fa-lg" aria-hidden="true" style="margin-left: 15px; margin-right: 10px; color: #444;"></i>');
                if (result.result.name != null && result.result.name != "") {
                    $("#userNameInfo").append('<span style="color: #444; font-size: 18px;">' + result.result.name + '</span>');
                } else {
                    $("#userNameInfo").append('<span style="color: #444; font-size: 18px;">' + result.result.username + '</span>');
                }

                initialMenuData();
            } else {
                alert("登录失败: " + result.message);
            }
        }
    })
}

function logout() {
    $.ajax({
        method: "GET",
        url: "https://query.qianchia.com/api/auth/logout",
        headers: { Authorization: getCookie("token") },
        success: function (result) {
            delCookie("token");
            delCookie("userName");

            let sidebarData = getLocalStorageData(":sidebar");              // 获取 数据
            let toolListData = getLocalStorageData("Tool-list");
            let studyListData = getLocalStorageData("Study-list");
            let blogsListData = getLocalStorageData("Blogs-list");
            let openListData = getLocalStorageData("Open-list");
            let grayingListData = getLocalStorageData("Graying-list");
            let counterListData = getLocalStorageData("Counter-list");

            delAllLocalStorageData();                                       // 删除 数据

            setLocalStorageData(":sidebar", sidebarData)                    // 存储 数据
            setLocalStorageData("Tool-list", toolListData)
            setLocalStorageData("Study-list", studyListData)
            setLocalStorageData("Blogs-list", blogsListData)
            setLocalStorageData("Open-list", openListData)
            setLocalStorageData("Graying-list", grayingListData)
            setLocalStorageData("Counter-list", counterListData)

            $("#auth").attr("style", "display: none;");

            let path = window.location.pathname.replace("/tools/", "").replace(".html", "");
            if (path == "internal") {
                window.location = "/tools/tool.html";
            } else {
                $("#menu-results").empty();
            }
        }
    })
}
/****************************************************************************************************************/

/**
 * 菜单
 */

function initialMenuData() {
    let token = getCookie("token");
    if (token != null) {
        let menuKey = "menu";
        let menuData = getLocalStorageData(menuKey);     // 获取 数据
        if (menuData) {
            showMenuResult(menuData);
        }
        $.ajax({
            method: "GET",
            url: "https://query.qianchia.com/api/menu?type=tools",
            headers: { Authorization: token },
            success: function (result) {
                if (result.code == 200 && result.result.length > 0) {
                    if (setLocalStorageData(menuKey, result.result)) {    // 存储 数据
                        showMenuResult(result.result);
                    }
                } else {
                    delCookie("token");
                    delCookie("userName");
                    delLocalStorageData(menuKey);           // 删除 数据
                    alert("登录已过期，请重新登录！");

                    let path = window.location.pathname.replace("/tools/", "").replace(".html", "");
                    if (path == "internal") {
                        window.location = "/tools/tool.html";
                    }
                }
            }
        })
    } else {
        let path = window.location.pathname.replace("/tools/", "").replace(".html", "");
        if (path == "internal") {
            alert("登录已过期，请重新登录！");
            window.location = "/tools/tool.html";
        }
    }
}

function showMenuResult(jsonData) {
    var html = '';
    var groupNum = 1;
    let path = window.location.pathname.replace("/tools/", "").replace(".html", "");
    for (var j in jsonData) {
        var obj = jsonData[j];
        if (obj.group_num != groupNum) {
            html += '<li class="divider"></li>';
            groupNum = obj.group_num;
        }
        if ((path == "internal") && (obj.code == getQueryString("code").replace("-edit", ""))) {
            if (obj.group_num == 3) {
                if (obj.code.indexOf("-edit") != -1) {
                    html += '<li style="margin-left: 20px;"><a href="internal.html?group=' + obj.group_num + '&code=' + obj.code + '&name=' + obj.name.replace("编辑", "") + '编辑" style="color: #008cff; text-decoration: unset;">' + obj.name + '</a></li>';
                } else {
                    html += '<li style="margin-left: 20px;"><a href="internal.html?group=' + obj.group_num + '&code=' + obj.code + '&name=' + obj.name.replace("查询", "") + '查询" style="color: #008cff; text-decoration: unset;">' + obj.name + '</a></li>';
                }
            } else {
                html += '<li style="margin-left: 20px;"><a href="internal.html?group=' + obj.group_num + '&code=' + obj.code + '&name=' + obj.name + '" style="color: #008cff; text-decoration: unset;">' + obj.name + '</a></li>';
            }
        } else {
            if (obj.group_num == 3) {
                if (obj.code.indexOf("-edit") != -1) {
                    html += '<li style="margin-left: 20px;"><a href="internal.html?group=' + obj.group_num + '&code=' + obj.code + '&name=' + obj.name.replace("编辑", "") + '编辑">' + obj.name + '</a></li>';
                } else {
                    html += '<li style="margin-left: 20px;"><a href="internal.html?group=' + obj.group_num + '&code=' + obj.code + '&name=' + obj.name.replace("查询", "") + '查询">' + obj.name + '</a></li>';
                }
            } else {
                html += '<li style="margin-left: 20px;"><a href="internal.html?group=' + obj.group_num + '&code=' + obj.code + '&name=' + obj.name + '">' + obj.name + '</a></li>';
            }
        }
    }
    html += '<li class="divider"></li>';
    $("#menu-results").empty();
    $("#menu-results").append(html);
}

/****************************************************************************************************************/

/**
 * md5
 */

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) { return binl2hex(core_md5(str2binl(s), s.length * chrsz)); }
function b64_md5(s) { return binl2b64(core_md5(str2binl(s), s.length * chrsz)); }
function str_md5(s) { return binl2str(core_md5(str2binl(s), s.length * chrsz)); }
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16)
            | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8)
            | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}

/****************************************************************************************************************/

/**
 * sha512
 */

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-512, as defined
 * in FIPS 180-2
 * Version 2.2 Copyright Anonymous Contributor, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 * http://www.sharejs.com/codes
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase    */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance  */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha512(s) { return rstr2hex(rstr_sha512(str2rstr_utf8(s))); }
function b64_sha512(s) { return rstr2b64(rstr_sha512(str2rstr_utf8(s))); }
function any_sha512(s, e) { return rstr2any(rstr_sha512(str2rstr_utf8(s)), e); }
function hex_hmac_sha512(k, d) { return rstr2hex(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha512(k, d) { return rstr2b64(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha512(k, d, e) { return rstr2any(rstr_hmac_sha512(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha512_vm_test() {
    return hex_sha512("abc").toLowerCase() ==
        "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a" +
        "2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";
}

/*
 * Calculate the SHA-512 of a raw string
 */
function rstr_sha512(s) {
    return binb2rstr(binb_sha512(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA-512 of a key and some data (raw strings)
 */
function rstr_hmac_sha512(key, data) {
    var bkey = rstr2binb(key);
    if (bkey.length > 32) bkey = binb_sha512(bkey, key.length * 8);

    var ipad = Array(32), opad = Array(32);
    for (var i = 0; i < 32; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binb_sha512(ipad.concat(rstr2binb(data)), 1024 + data.length * 8);
    return binb2rstr(binb_sha512(opad.concat(hash), 1024 + 512));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
    try { hexcase } catch (e) { hexcase = 0; }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F)
            + hex_tab.charAt(x & 0x0F);
    }
    return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
    try { b64pad } catch (e) { b64pad = ''; }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16)
            | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
            | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8) output += b64pad;
            else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
    }
    return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
        (Math.log(encoding.length) / Math.log(2)));
    var remainders = Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q;
        }
        remainders[j] = x;
        dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);

    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
                0x80 | (x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                0x80 | ((x >>> 6) & 0x3F),
                0x80 | (x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                0x80 | ((x >>> 12) & 0x3F),
                0x80 | ((x >>> 6) & 0x3F),
                0x80 | (x & 0x3F));
    }
    return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
            (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
            input.charCodeAt(i) & 0xFF);
    return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
    return output;
}

/*
 * Calculate the SHA-512 of an array of big-endian dwords, and a bit length
 */
var sha512_k;
function binb_sha512(x, len) {
    if (sha512_k == undefined) {
        //SHA512 constants
        sha512_k = new Array(
            new int64(0x428a2f98, -685199838), new int64(0x71374491, 0x23ef65cd),
            new int64(-1245643825, -330482897), new int64(-373957723, -2121671748),
            new int64(0x3956c25b, -213338824), new int64(0x59f111f1, -1241133031),
            new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736),
            new int64(-670586216, -1560083902), new int64(0x12835b01, 0x45706fbe),
            new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, -704662302),
            new int64(0x72be5d74, -226784913), new int64(-2132889090, 0x3b1696b1),
            new int64(-1680079193, 0x25c71235), new int64(-1046744716, -815192428),
            new int64(-459576895, -1628353838), new int64(-272742522, 0x384f25e3),
            new int64(0xfc19dc6, -1953704523), new int64(0x240ca1cc, 0x77ac9c65),
            new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483),
            new int64(0x5cb0a9dc, -1119749164), new int64(0x76f988da, -2096016459),
            new int64(-1740746414, -295247957), new int64(-1473132947, 0x2db43210),
            new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340),
            new int64(-958395405, 0x3da88fc2), new int64(-710438585, -1828018395),
            new int64(0x6ca6351, -536640913), new int64(0x14292967, 0xa0e6e70),
            new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926),
            new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, -1651133473),
            new int64(0x650a7354, -1951439906), new int64(0x766a0abb, 0x3c77b2a8),
            new int64(-2117940946, 0x47edaee6), new int64(-1838011259, 0x1482353b),
            new int64(-1564481375, 0x4cf10364), new int64(-1474664885, -1136513023),
            new int64(-1035236496, -789014639), new int64(-949202525, 0x654be30),
            new int64(-778901479, -688958952), new int64(-694614492, 0x5565a910),
            new int64(-200395387, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8),
            new int64(0x19a4c116, -1194143544), new int64(0x1e376c08, 0x5141ab53),
            new int64(0x2748774c, -544281703), new int64(0x34b0bcb5, -509917016),
            new int64(0x391c0cb3, -976659869), new int64(0x4ed8aa4a, -482243893),
            new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, -692930397),
            new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60),
            new int64(-2067236844, -1578062990), new int64(-1933114872, 0x1a6439ec),
            new int64(-1866530822, 0x23631e28), new int64(-1538233109, -561857047),
            new int64(-1090935817, -1295615723), new int64(-965641998, -479046869),
            new int64(-903397682, -366583396), new int64(-779700025, 0x21c0c207),
            new int64(-354779690, -840897762), new int64(-176337025, -294727304),
            new int64(0x6f067aa, 0x72176fba), new int64(0xa637dc5, -1563912026),
            new int64(0x113f9804, -1090974290), new int64(0x1b710b35, 0x131c471b),
            new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493),
            new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, -1676669620),
            new int64(0x4cc5d4be, -885112138), new int64(0x597f299c, -60457430),
            new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817));
    }

    //Initial hash values
    var H = new Array(
        new int64(0x6a09e667, -205731576),
        new int64(-1150833019, -2067093701),
        new int64(0x3c6ef372, -23791573),
        new int64(-1521486534, 0x5f1d36f1),
        new int64(0x510e527f, -1377402159),
        new int64(-1694144372, 0x2b3e6c1f),
        new int64(0x1f83d9ab, -79577749),
        new int64(0x5be0cd19, 0x137e2179));

    var T1 = new int64(0, 0),
        T2 = new int64(0, 0),
        a = new int64(0, 0),
        b = new int64(0, 0),
        c = new int64(0, 0),
        d = new int64(0, 0),
        e = new int64(0, 0),
        f = new int64(0, 0),
        g = new int64(0, 0),
        h = new int64(0, 0),
        //Temporary variables not specified by the document
        s0 = new int64(0, 0),
        s1 = new int64(0, 0),
        Ch = new int64(0, 0),
        Maj = new int64(0, 0),
        r1 = new int64(0, 0),
        r2 = new int64(0, 0),
        r3 = new int64(0, 0);
    var j, i;
    var W = new Array(80);
    for (i = 0; i < 80; i++)
        W[i] = new int64(0, 0);

    // append padding to the source string. The format is described in the FIPS.
    x[len >> 5] |= 0x80 << (24 - (len & 0x1f));
    x[((len + 128 >> 10) << 5) + 31] = len;

    for (i = 0; i < x.length; i += 32) //32 dwords is the block size
    {
        int64copy(a, H[0]);
        int64copy(b, H[1]);
        int64copy(c, H[2]);
        int64copy(d, H[3]);
        int64copy(e, H[4]);
        int64copy(f, H[5]);
        int64copy(g, H[6]);
        int64copy(h, H[7]);

        for (j = 0; j < 16; j++) {
            W[j].h = x[i + 2 * j];
            W[j].l = x[i + 2 * j + 1];
        }

        for (j = 16; j < 80; j++) {
            //sigma1
            int64rrot(r1, W[j - 2], 19);
            int64revrrot(r2, W[j - 2], 29);
            int64shr(r3, W[j - 2], 6);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;
            //sigma0
            int64rrot(r1, W[j - 15], 1);
            int64rrot(r2, W[j - 15], 8);
            int64shr(r3, W[j - 15], 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;

            int64add4(W[j], s1, W[j - 7], s0, W[j - 16]);
        }

        for (j = 0; j < 80; j++) {
            //Ch
            Ch.l = (e.l & f.l) ^ (~e.l & g.l);
            Ch.h = (e.h & f.h) ^ (~e.h & g.h);

            //Sigma1
            int64rrot(r1, e, 14);
            int64rrot(r2, e, 18);
            int64revrrot(r3, e, 9);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;

            //Sigma0
            int64rrot(r1, a, 28);
            int64revrrot(r2, a, 2);
            int64revrrot(r3, a, 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;

            //Maj
            Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
            Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);

            int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
            int64add(T2, s0, Maj);

            int64copy(h, g);
            int64copy(g, f);
            int64copy(f, e);
            int64add(e, d, T1);
            int64copy(d, c);
            int64copy(c, b);
            int64copy(b, a);
            int64add(a, T1, T2);
        }
        int64add(H[0], H[0], a);
        int64add(H[1], H[1], b);
        int64add(H[2], H[2], c);
        int64add(H[3], H[3], d);
        int64add(H[4], H[4], e);
        int64add(H[5], H[5], f);
        int64add(H[6], H[6], g);
        int64add(H[7], H[7], h);
    }

    //represent the hash as an array of 32-bit dwords
    var hash = new Array(16);
    for (i = 0; i < 8; i++) {
        hash[2 * i] = H[i].h;
        hash[2 * i + 1] = H[i].l;
    }
    return hash;
}

//A constructor for 64-bit numbers
function int64(h, l) {
    this.h = h;
    this.l = l;
    //this.toString = int64toString;
}

//Copies src into dst, assuming both are 64-bit numbers
function int64copy(dst, src) {
    dst.h = src.h;
    dst.l = src.l;
}

//Right-rotates a 64-bit number by shift
//Won't handle cases of shift>=32
//The function revrrot() is for that
function int64rrot(dst, x, shift) {
    dst.l = (x.l >>> shift) | (x.h << (32 - shift));
    dst.h = (x.h >>> shift) | (x.l << (32 - shift));
}

//Reverses the dwords of the source and then rotates right by shift.
//This is equivalent to rotation by 32+shift
function int64revrrot(dst, x, shift) {
    dst.l = (x.h >>> shift) | (x.l << (32 - shift));
    dst.h = (x.l >>> shift) | (x.h << (32 - shift));
}

//Bitwise-shifts right a 64-bit number by shift
//Won't handle shift>=32, but it's never needed in SHA512
function int64shr(dst, x, shift) {
    dst.l = (x.l >>> shift) | (x.h << (32 - shift));
    dst.h = (x.h >>> shift);
}

//Adds two 64-bit numbers
//Like the original implementation, does not rely on 32-bit operations
function int64add(dst, x, y) {
    var w0 = (x.l & 0xffff) + (y.l & 0xffff);
    var w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16);
    var w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16);
    var w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
    dst.l = (w0 & 0xffff) | (w1 << 16);
    dst.h = (w2 & 0xffff) | (w3 << 16);
}

//Same, except with 4 addends. Works faster than adding them one by one.
function int64add4(dst, a, b, c, d) {
    var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
    var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16);
    var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16);
    var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
    dst.l = (w0 & 0xffff) | (w1 << 16);
    dst.h = (w2 & 0xffff) | (w3 << 16);
}

//Same, except with 5 addends
function int64add5(dst, a, b, c, d, e) {
    var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff);
    var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16);
    var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16);
    var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
    dst.l = (w0 & 0xffff) | (w1 << 16);
    dst.h = (w2 & 0xffff) | (w3 << 16);
}
