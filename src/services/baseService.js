import axios from 'axios'
import * as constants from '../constants/url'

export default function baseService(method, link, data) {
    if (method === constants.GET_METHOD) {
        return axios({
            method: method,
            timeout: 36000,
            url: link,
            headers: {'Accept': 'application/json'}
        });
    }
    return axios({
        method: method,
        timeout: 36000,
        url: link,
        data: data,
        headers: {'Accept': 'application/json'}
    });
}