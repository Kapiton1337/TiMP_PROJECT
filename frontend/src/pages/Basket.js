import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import BasketItem from "../components/BasketItem";
import {observer} from "mobx-react-lite";
import "../styles/Basket.css"
import {SHOP_ROUTE, USD} from '../utils/consts';
import {useNavigate} from 'react-router-dom';
import BuyDevice from "../components/Modals/BuyDevice";

const Basket = observer(() => {
    const {devices} = useContext(Context);
    const navigate = useNavigate();
    const [buyVisible, setBuyVisible] = useState(false);

    const removeItem = (deviceId) => {
        devices.setBasket(devices.basket.filter(({id, price}) => {
            if (id !== deviceId) return true;
            devices.setBasketPrice(devices.basketPrice - price);
            return false;
        }));
    }
    return (
        <Container>
            <BuyDevice show={buyVisible} onHide={() => setBuyVisible(false)}/>
            <div className='content'>
                <div className='left'>
                    <div>
                        <div className='basketHeadTop'>
                            <div className='mainHead'>Корзина</div>
                            <div className='subHead'>{devices.basket.length} товар(ов)</div>
                        </div>
                        <div className='basketHeadBot'>
                            <button className='basketButton' onClick={()=>setBuyVisible(true)}>Выбрать все</button>
                            <button
                                onClick={() => {
                                    devices.setBasket([]);
                                    devices.setBasketPrice(0);
                                }} className='basketButton'>Удалить все
                            </button>
                        </div>
                    </div>

                    {devices.basket.length !== 0 ?
                        devices.basket.map(device => <BasketItem k={device.id} img={device.image} name={device.name}
                                                                 price={device.price} rub={device.rub} removeItem={removeItem}
                                                                 openPay={()=>setBuyVisible(true)} currency={devices.currency}/>)
                        :
                        <div className='empty'>
                            <img src={require("../images/empty.png")}></img>
                            <p>Корзина пуста</p>
                            <p className='small'>пожалуйста добавьте что-либо для покупки</p>
                            <button onClick={() => navigate(SHOP_ROUTE)} className='return'>На главную</button>
                        </div>
                    }
                </div>
                <div className='right'>
                    <div className='buyBox'>
                        <div className='topBox'>
                            Заказ
                        </div>
                        <div className='midBox'>
                            <div className='midBoxHead'>Итого:</div>
                            <div className='midBoxBody'>
                                <div>{devices.basket.length} товар(ов)</div>
                                {devices.currency === USD ?
                                    <div>{devices.basketPrice} $.</div> :
                                    <div>{devices.basketPrice * devices.qoutation} р.</div>
                                }
                            </div>
                            <button className='buyButton' onClick={() => setBuyVisible(true)}>Купить</button>
                        </div>
                        <div className='botBox'>
                            <button className='mistake' onClick={() => {
                                window.location.href = "https://vk.com/a_azatjonov"
                            }}>Нашли ошибку? Сообщите нам
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
})

export default Basket;
