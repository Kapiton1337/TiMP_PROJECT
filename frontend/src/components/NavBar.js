import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Form, Nav, Navbar, NavDropdown, InputGroup, Dropdown} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, RUB, SHOP_ROUTE, USD} from "../utils/consts";
import {observer} from "mobx-react-lite";
import TypeBar from "./TypeBar";
import Shop from "../pages/Shop";
import {NavLink, useNavigate} from "react-router-dom";
import {fetchDevices, fetchFoundDevice, fetchOneDevice, fetchTypes} from "./https/deviceAPI";
import "../styles/NavBar.css"

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const {devices} = useContext(Context);
    const navigate = useNavigate();
    const [searchItem, setSearchItem] = useState("");

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.setItem('username', '')
        localStorage.setItem('password', '')
    }

    useEffect(() => {
        fetchDevices().then(data => {
            devices.setDevices(data);
        });
        devices.setBasket(devices.basket)
        fetchTypes().then(data => devices.setTypes(data));
    }, [devices.currency])

    const search = (searchItem)=>{
        fetchDevices().then(data=>devices.setDevices(data)).then(()=>devices.setDevices(devices.devices.filter(({name})=>name.indexOf(searchItem) !== -1)))
    }
    return (
        <Navbar expand="lg" className='box'>
            <Container>
                <div className='homepage'>
                    <Nav.Link onClick={()=>navigate(SHOP_ROUTE)}>KAPITON STORE</Nav.Link>
                </div>
                <div className='search'>
                    <InputGroup>
                        <Form.Control  value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} type="search" placeholder="Давайте-ка поищем..." />
                        <button className="searchButton" onClick={()=>search(searchItem)} type="submit">
                            Найти
                        </button>
                    </InputGroup>
                </div>
                <div className='tools'>
                    <div className='authorization'>
                        {user.isAuth ?
                            <div className={"d-flex"}>
                                <div className="logout">
                                    <img src={require('../images/logout.png')} className="logoutIcon" alt="fireSpot"/>
                                    <Nav.Link onClick={logOut}>Выйти</Nav.Link>
                                </div>
                                <div className='basket'>
                                    <img src={require('../images/basket.png')} className="basketIcon" alt="fireSpot"/>
                                    {
                                        user.isAuth && <Nav.Link onClick={() => navigate(BASKET_ROUTE) } >Корзина</Nav.Link>
                                    }
                                </div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {devices.currency}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {devices.currency === USD ?
                                            <Dropdown.Item onClick={()=>devices.setCurrency(RUB)}>Рубль Россия (RUB)</Dropdown.Item>
                                             :
                                            <Dropdown.Item onClick={()=>devices.setCurrency(USD)}>Доллар США (USD)</Dropdown.Item>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            :
                            <div className={"d-flex justify-content-end"}>
                                <div className="login">
                                    <img src={require('../images/login.png')} className="loginIcon" alt="fireSpot"/>
                                    <Nav.Link onClick={()=>navigate(LOGIN_ROUTE)} >Войти</Nav.Link>
                                </div>
                                <div className="registr">
                                    <img src={require('../images/reg.png')} className="regIcon" alt="fireSpot"/>
                                    <Nav.Link onClick={()=>navigate(REGISTRATION_ROUTE)} >Зарегистрироваться</Nav.Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Container>
        </Navbar>
    );
})

export default NavBar;