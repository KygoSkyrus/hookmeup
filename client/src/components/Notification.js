import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap'


const Notification = (props) => {

const { bg, text } = props;
const [show, setShow] = useState(true);

    return (
    <ToastContainer className="p-3 tst" >
            <Toast bg={bg} show={show} onClose={() => setShow(false)} delay={3000} autohide>
                <Toast.Header>
                    <img src='' className="rounded me-2" alt="" />
                    <strong className="me-auto">HookMeUp</strong>
                </Toast.Header>
                <Toast.Body className="text-light">{text}</Toast.Body>
            </Toast>
    </ToastContainer>
    )
}

export default Notification

