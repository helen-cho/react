import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BoxContext } from './BoxContext';

const BoxModal = () => {
    const { box, setBox } = useContext(BoxContext);
    const onClose = () => {
        setBox({
            ...box,
            show:false
        });
    }

    const onConfirm = () => {
        if(box.action) {
            box.action();
        }
        onClose();
    }

    return (
        <>
            <Modal
                show={box.show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{box.action ? 'CONFIRM' : '알림'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {box.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onConfirm}>
                        확인
                    </Button>
                    {box.action &&
                        <Button variant="outline-primary" onClick={onClose}>
                            취소
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BoxModal