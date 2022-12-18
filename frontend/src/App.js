import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {useContext, useEffect, useState} from "react";
import {check, login} from "./components/https/userApi";
import {Spinner} from "react-bootstrap";
import "./styles/App.css"

const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        login(localStorage.getItem('username'), localStorage.getItem('password')).then(data => {
            user.setIsAuth(true)
            user.setUser(user);
        })
            .catch(e => e)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation="grow"/>
    }

    return (
        <BrowserRouter >
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App;
