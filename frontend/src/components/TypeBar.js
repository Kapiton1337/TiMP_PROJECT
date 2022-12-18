import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown, ListGroup} from "react-bootstrap";
import { fetchCatDevices, fetchDevices } from './https/deviceAPI';
import "../styles/TypeBar.css"
import {RUB, USD} from "../utils/consts";

const TypeBar = observer(() => {
    const {devices} = useContext(Context);

    const chooseCategory = () => {
        fetchCatDevices(devices.selectedType).then(data => {
            devices.setDevices(data);
        });
    }
    const allCats = () => {
        fetchDevices().then(data => devices.setDevices(data))
    }
    return (
        <ListGroup className="mt-3 bar">
            {devices.types.map(({id, name}) =>
                <ListGroup.Item
                    style={(id === 0)&(id !== devices.selectedType.id) ? {border:"1px solid white", borderBottom:"1px solid gray", cursor:"pointer"} : id === devices.selectedType.id ? {border: "1px solid purple", cursor:"pointer"} : {background:"white", border: "1px solid white", cursor:"pointer"}}
                    onClick={()=> { 
                        devices.setSelectedType({id, name})
                        id === 0 ? allCats(): chooseCategory();
                    }}
                    key={id}
                >
                    {name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
})

export default TypeBar;