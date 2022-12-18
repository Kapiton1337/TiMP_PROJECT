import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import context from 'react-bootstrap/esm/AccordionContext';
import "../styles/BasketItem.css"
import { Context } from '..';
import BuyDevice from "./Modals/BuyDevice";
import {observer} from "mobx-react-lite";
import {DEVICE_ROUTE, USD} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const BasketItem = ({k, img, name, price, removeItem, openPay, rub, currency}) => {
    const {devices} = useContext(Context)
    const navigate = useNavigate();
    return (
        <div className='item'>
            <div className="info" onClick={()=>navigate(DEVICE_ROUTE + "/" + k)}>
                <div className='leftItem'>
                    <Image className="itemImg" src={process.env.REACT_APP_API_URL + img} />
                </div>
                <div className='midItem'>
                    {name}
                </div>
            </div>

            <div className='rightItem'>
                {currency === USD ?
                    <div className="itemPrice">{price} $</div> :
                    <div className="itemPrice">{rub} ₽</div>
                }
                <div className='rightItemButtons'>
                    <button className="chooseButton" onClick={() => openPay()}>
                        Оплатить
                    </button>
                    <button className="removeButton" onClick={() => removeItem(k)}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BasketItem;
