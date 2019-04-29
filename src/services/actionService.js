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
