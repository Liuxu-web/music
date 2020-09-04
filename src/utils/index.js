// 根据歌曲时间(单位:S) 推算 时间 (单位00:00)
export function musicTime(num) {
    num = parseInt(num) / 60;
    const F = num.toString().substr(1),
        I = num.toString().substr(0, 1);
    return supplement(I) + ":" + supplement(Math.round(F * 60));
}
// 字符串小于10位 补零
export function supplement(num) {
    const STR_NUM = num + "";
    if (STR_NUM.length <= 1) return STR_NUM.padStart(2, 0);
    return STR_NUM;
}
