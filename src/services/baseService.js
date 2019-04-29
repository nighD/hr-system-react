import axios from 'axios'
import * as constants from '../constants/url'

export default function baseService(method, link, data) {
    if (method === constants.GET_METHOD) {
        return axios({
            method: method,
            url: link,
            headers: {'Accept': 'application/json'}
        });
    }
    console.log(data);
    return axios({
        method: method,
        url: link,
        data: data,
        headers: {'Accept': 'application/json'}
    });
}