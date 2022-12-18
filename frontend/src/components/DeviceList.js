import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Row} from "react-bootstrap";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import "../styles/DeviceList.css"

const DeviceList = observer(() => {
    const {devices} = useContext(Context);
    return (
        <Row className="deviceList">
            {devices.devices.map((device)=>
                <DeviceItem key={device.id} device={device} currency={devices.currency}/>
            )}
        </Row>
    );
})

export default DeviceList;