import React from "react";

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
// 验证手机号
export function isPhone(num) {
    const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
    return reg.test(num);
}
// 手机号-密码验证提示
export function verify(hint) {
    const index = hint.length;
    if (index !== 0) {
        return (
            <div className="loginerr">
                <i className="iconfont icon-jinggao" />
                {hint[1]}
            </div>
        );
    }
}
