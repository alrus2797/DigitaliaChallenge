import axios from 'axios'
import { LoginResponse } from '../types/LoginResponse'
import { baseUrl } from '../constants'
import { UserInfo } from '../types/UserInfo'

interface LoginParams {
  username: string
  password: string
}

export const login = ({username, password}: LoginParams) => {

  return axios.post<LoginResponse>(`${baseUrl}/Users/login`, {
    username,
    password
  })
}

export const getUserInfo = (access_token: string) => {
  return axios.get<UserInfo>(`${baseUrl}/Users/account/info`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

export const getIp = async () => {
  const res = await axios.get<{ip: string}>("https://api.ipify.org/?format=json");
  return res.data.ip;
};