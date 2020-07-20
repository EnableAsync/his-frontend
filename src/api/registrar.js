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

export function getNeedPay() {
  return axios({
    url: `${URL}pay`,
    method: 'GET',
  })
}

export function pay(data) {
  return axios({
    url: `${URL}pay`,
    method: 'POST',
    data: data,
  })
}

export function getNeedSend() {
  return axios({
    url: `${URL}send`,
    method: 'GET',
  })
}

export function sendDrug(data) {
  return axios({
    url: `${URL}send`,
    method: 'POST',
    data: data,
  })
}
