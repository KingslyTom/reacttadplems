// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams) {
  return request<API.LoginResult>(`${API_DOMAIN}/center-service/sys-service/sys/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: body,
  });
}

export async function getPreLogin() {
  return request(`${API_DOMAIN}/center-service/sys-service/sys/preLogin`);
}
