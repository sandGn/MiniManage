/*
 * 包含所有基于 state 的 getter 计算属性的对象
 */
const getters = {
    device: state => state.app.device,
    roles: state => state.user.roles,
    permissionList: state => state.user.permissionList,
}
export default getters