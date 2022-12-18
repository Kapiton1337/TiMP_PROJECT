import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {LOGIN_ROUTE, STAR, USD} from "../utils/consts";
import {Navigate, useParams} from "react-router-dom";
import {addBasketItem, fetchOneDevice} from "../components/https/deviceAPI";
import UserStore from '../store/UserStore';
import { useNavigate } from 'react-router-dom';
import "../styles/DevicePage.css"
import {observer} from "mobx-react-lite";

const DevicePage = observer(() => {

    const {devices} = useContext(Context);
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [devices.currency])

    return (
        <Container md={4} className="mt-3">
            <div className='deviceHead'>
                {device.name}
            </div>
            <div className='deviceBody'>
                <div className='deviceImg'>
                    <Image width={"100%"} height={"auto"} src={process.env.REACT_APP_API_URL + device.image}/>
                </div>
                <div className='deviceInfo'>
                    <div className='deviceShow'>
                        {devices.currency === USD ?
                            <div className='devicePrice'>{device.price} $</div> :
                            <div className='devicePrice'>{device.rub} ₽</div>
                        }
                        <button
                            className='deviceButton' 
                            onClick={() => {
                                user.isAuth? devices.addBasket(device): navigate(LOGIN_ROUTE)
                            }}>
                            Добавить в корзину
                        </button>
                    </div>
                    <div className='deviceText'>
                        {device.description}
                    </div>
                </div>
            </div>
        </Container>
    );
})

export default DevicePage;