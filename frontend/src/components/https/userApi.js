import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, username, password) => {
    const {data} = await $host.post('api/auth/users/', {email, username, password});
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    return data.token;
}

export const login = async (username, password) => {
    const {data} = await $host.post('auth/token/login/', {password, username,});
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    return data.token;
}

/*
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return data.token;
}*/
