import {axios} from "./request";
import {URL} from "./baseURL";

export function login(data) {
  return axios({
    url: `${URL}login`,
    method: 'POST',
    data: data
  })
}
