import * as constants from '../constants/url'
import baseService from './baseService'

export function getUserlist() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userList);
}
export function getUserdetail(uid) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userDetail + uid);
}
export function getManagers() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.userManager);
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
export function getTeamManager(team_id) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.teamManager + team_id);
}
export function getAttdetail(uid) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.emp_att_detail + uid);
}
export function getEvent() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.events);
}
export function addEvent(data) {
    return baseService(constants.POST_METHOD, constants.baseURL + constants.events, data);
}
export function getLeaveList() {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.leaves);
}
export function getLeavesStatus(status) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.leaves_status+status);
}
export function getEmpLeaveList(id) {
    return baseService(constants.GET_METHOD, constants.baseURL + constants.leaves + id);
}