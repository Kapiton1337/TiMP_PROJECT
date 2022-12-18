import {makeAutoObservable} from "mobx";
import {RUB, USD} from "../utils/consts";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._devices = []
        this._basketPrice = 0
        this._basket = []
        this._selectedType = {}
        this._like = {}
        this._currency = USD
        this._qoutation = 1;
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = [{id: 0, name: "Все товары"}, ...types];
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setSelectedType(type) {
        this._selectedType = type;
    }

    setCurrency(currency) {
        return this._currency = currency;
    }

    addBasket(basket) {
        this._basket = [...this._basket, basket];
        console.log(basket)
        this._basketPrice =
            this._currency === USD
                ?
                this._basket.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)
                :
                this._basket.reduce((previousValue, currentValue) => previousValue + currentValue.rub, 0)
    }

    setBasket(basket) {
        this._basket = [...basket];
        this._basketPrice =
            this._currency === USD
                ?
                this._basket.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)
                :
                this._basket.reduce((previousValue, currentValue) => previousValue + currentValue.rub, 0)
    }

    setBasketPrice(price) {
        this._basketPrice = price;
    }

    setLike(device) {
        this._like = device;
    }

    setQoutation(qoutation) {
        this._qoutation = qoutation;
    }

    get types() {
        return this._types;
    }

    get devices() {
        return this._devices;
    }

    get selectedType() {
        return this._selectedType;
    }

    get basket() {
        return this._basket;
    }

    get basketPrice() {
        return this._basketPrice;
    }

    get like() {
        return this._like;
    }

    get currency() {
        return this._currency;
    }

    get qoutation() {
        return this._qoutation;
    }
}