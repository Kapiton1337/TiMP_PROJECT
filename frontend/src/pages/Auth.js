import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useLocation} from "react-router-dom";
import {login, registration} from "../components/https/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import "../styles/Auth.css"

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigation = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isWrong, setIsWrong] = useState(false);

    const click = async () => {
        try {
            let data;
            if(isLogin){
                data = await login(name, password);
            } else {
                data = await registration(email, name, password);
            }
            user.setUser(user);
            user.setIsAuth(true);
            navigation(SHOP_ROUTE);
        }
        catch (e) {
            setIsWrong(true);
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder={"Введите имя пользователя..."} value={name} onChange={e=>setName(e.target.value)}/>
                    {!isLogin && <Form.Control className="mt-3" placeholder={"Введите email..."} value={email} onChange={e=>setEmail(e.target.value)}/>}
                    <Form.Control className="mt-3" placeholder={"Введите ваш пароль..."} value={password} onChange={e=>setPassword(e.target.value)}/>
                    <Row className="d-flex justify-content-between mt-3">
                        {isWrong &&
                        <div>
                            Данные для входа не верны
                        </div>
                        }
                        {isLogin ?
                            <div>
                                Еще не зарегистрированы? <NavLink to={REGISTRATION_ROUTE}> Пройти регистрацию</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            className="submitButton"
                        >
                            <div>{isLogin ? "Войти" : "Зарегистрироваться"}</div>
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;