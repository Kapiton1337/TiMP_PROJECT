import React, { useContext, useState } from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE, STAR, USD} from "../utils/consts";
import "../styles/DeviceItem.css"
import { Context } from '../index';
import {observer} from "mobx-react-lite";


const DeviceItem = observer(({device, currency}) => {
    const {devices} = useContext(Context)

    const navigate = useNavigate();
    return (
        <Col md={3} className='deviceItem'>
            <div className='img'>
                <Image width={150} height={150} src={device.image}/>
            </div>
            <div className='info' onClick={()=>navigate(DEVICE_ROUTE + "/" + device.id)}>
                <div className='name'>{device.name}</div>
                <div className='description'>{device.description}</div>
            </div>
            <div className='bars'>
                {currency === USD ?
                    <div className='price'>
                        <div className='oldPrice'>{device.price/0.8}</div>
                        <div>{device.price} $</div>
                        <div className='credit'>{(device.price / 12).toFixed(3)} $/мес</div>
                    </div> :
                    <div className='price'>
                        <div className='oldPrice'>{device.rub/0.8}</div>
                        <div>{device.rub} ₽</div>
                        <div className='credit'>{(device.rub / 12).toFixed(3)} ₽/мес</div>
                    </div>
                }

                <div className='buttons'>
                    <button className={ !(device.id === devices.like.id)?'notLiked':'liked'} onClick={() => {
                        devices.setLike(device)
                    }}>
                        { !(device.id === devices.like.id)?
                            <img src={require('../images/like.png')} alt="fireSpot" className='likeIconOff'></img>
                        :
                            <img src={require('../images/like-clicked.png')} alt="fireSpot" className='likeIconOn'></img>
                        }
                    </button>
                    <button onClick={()=>{
                        devices.addBasket(device)
                        }} className='miniBasket'>
                        В корзину
                    </button>
                </div>
            </div>
        </Col>
    );
})

export default DeviceItem;