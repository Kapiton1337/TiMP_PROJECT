import {$authHost, $host} from "./index";

export const fetchTypes = async () => {
    const {data} = await $host.get('api/category_list/');
    return data;
}

export const fetchDevices = async () => {
    const {data} = await $host.get('api/product_list/');
    return data;
}

export const fetchCatDevices = async (typeId) => {
    const {data} = await $host.get(`api/product_list/?category=${typeId.id}`);
    return data;
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(`api/product/${id}/`);
    return data;
}

export const fetchFoundDevice = async (name) => {
    const {data} = await $host.get(`api/search_product/?search=${name}`);
    return data;
}