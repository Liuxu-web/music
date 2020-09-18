import { get } from "./axios";

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
    try {
        const data = await get(`/api/login/status&timestamp=${+new Date()}`);
        return data;
    } catch (err) {}
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
