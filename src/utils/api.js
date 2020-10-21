import { get } from "./axios";
// 获取cookie
function getCookie(cookieStr) {
    const obj = {};
    let arr = cookieStr.split("; ");
    arr.forEach(function (item) {
        let newArr = item.split("=");
        obj[newArr[0]] = newArr[1];
    });
    return obj;
}

// 注册账号-修改密码
export async function api_sign_reset(phone, password, captcha, nickname) {
    const data = await get("/api/register/cellphone", {
        phone,
        password,
        captcha,
    });
    return data;
}
// 检测手机号码是否已注册
export async function api_isSign(phone) {
    const data = await get("/api/cellphone/existence/check", {
        phone,
    });
    return data;
}
// 获取验证码
export async function api_getcode(phone) {
    const data = await get("/api/captcha/sent", {
        phone,
    });
    return data;
}
// 验证验证码
export async function api_verifyCode(phone, captcha) {
    const data = await get("/api/captcha/verify", {
        phone,
        captcha,
    });
    return data;
}
// 退出登录
export async function api_logout() {
    const data = await get("/api/logout");
    return data;
}
// 获取登录状态
export async function api_login_status() {
    const cookie = getCookie(document.cookie);
    // console.log("cookie", cookie);
    if (cookie.MUSIC_U && cookie.__csrf && cookie.__remember_me) {
        const data = await get(`/api/login/status?timestamp=${+new Date()}`);
        return data;
    } else {
        return false;
    }
}
// 获取用户详情 参数用户uid
export async function api_user_detail(id) {
    const data = await get(`/api/user/detail?uid=${id}`);
    return data;
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export async function api_user_subcount() {
    const data = await get(`/api/user/subcount`);
    return data;
}
// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)
export async function api_playlist_detail(id) {
    const data = await get(`/api/playlist/detail?id=${id}`);
    return data;
}
// 推荐歌单
// 说明 : 调用此接口 , 可获取推荐歌单
export async function api_personalized(list = 30) {
    const data = await get(`/api/personalized`, {
        limit: list,
    });
    return data;
}
