import {axios} from "./request";
import {URL} from "./baseURL";

export function getDisease() {
  return axios({
    url: `${URL}disease`,
    method: 'GET',
  })
}

export function getDrugs() {
  return axios({
    url: `${URL}drugs`,
    method: 'GET'
  })
}

export function diagnose() {
  return axios({
    url: `${URL}diagnose`,
    method: 'GET'
  })
}

export function diagnosed() {
  return axios({
    url: `${URL}diagnosed`,
    method: 'GET'
  })
}

export function doDiagnose(data) {
  return axios({
    url: `${URL}diagnose`,
    method: 'POST',
    data: data
  })
}

export function prescribe(data) {
  return axios({
    url: `${URL}prescribe`,
    method: 'POST',
    data: data
  })
}
