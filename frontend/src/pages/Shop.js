import React, {useContext, useEffect} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCatDevices, fetchDevices, fetchTypes} from "../components/https/deviceAPI";
import "../styles/Shop.css"
import {RUB, USD} from "../utils/consts";

const Shop = observer(() => {
    const {devices} = useContext(Context);

    useEffect(() => {
        fetchDevices().then(data => {
            devices.setDevices(data);
        });
        fetchTypes().then(data => devices.setTypes(data));
    }, )

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={8}>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    );
})

export default Shop;