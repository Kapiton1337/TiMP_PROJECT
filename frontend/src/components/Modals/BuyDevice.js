import React, {useContext} from 'react';
import {Button, Modal} from "react-bootstrap";
import {Context} from "../../index";

const BuyDevice = ({show, onHide}) => {
    const {devices} = useContext(Context);
    if(devices.basket.length !== 0){
        return (
            <Modal show={show} onHide={onHide} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Для завершения покупки отсканируйте QR-Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>Random QR-Code</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onHide}>
                        Хорошо
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default BuyDevice;