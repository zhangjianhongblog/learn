export default {
    // 设置用户信息
    setUserInfo(state,config) {
        if (!config) {
            state.userInfo = {};
        }
        for (let key in config) {
            state.userInfo[key] = config[key];
        }
    }
}