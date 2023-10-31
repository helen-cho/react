import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';
const ModalPostCode = ({user, setUser}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onCompleted =  (e) => {
        console.log(e);
        setUser({
            ...user,
            address1: e.buildingName ? `${e.address}(${e.buildingName})` : e.address
        });
        handleClose();
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                검색
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>주소검색</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DaumPostcodeEmbed onComplete={onCompleted}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalPostCode