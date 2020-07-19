import {axios} from "./request";
import {URL} from "./baseURL";

export function register(data) {
  return axios({
    url: `${URL}register`,
    method: 'POST',
    data: data
  })
}

export function getRegisterRecords() {
  return axios({
    url: `${URL}register`,
    method: 'GET',
  })
}

export function delRecord(id) {
  return axios({
    url: `${URL}register/${id}`,
    method: 'DELETE',
  })
}

export function getDoctors() {
  return axios({
    url: `${URL}doctors`,
    method: 'GET',
  })
}
