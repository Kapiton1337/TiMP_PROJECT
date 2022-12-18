import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../Routes.js";
import Shop from "../pages/Shop";
import {Context} from "../index";

const AppRouter = () => {
    const {user, devices} = useContext(Context);

    console.log(devices);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component})=>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Shop/>}/>
        </Routes>
    );
};

export default AppRouter;