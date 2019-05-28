import * as constants from '../constants/url'
import baseService from './baseService'

export function getUserlist() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userList);
}
export function getUserdetail(uid) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userDetail + uid);
}
export function updateUserdetail(uid,data) {
    return baseService(constants.POST_METHOD, constants.baseURL + constants.userDetail + uid,data);
}
export function getTeamlist() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.teamList);
}
export function getTeamdetail(team_id) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.teamDetail + team_id);
}
export function getAttdetail(uid) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.emp_att_detail + uid);
}
