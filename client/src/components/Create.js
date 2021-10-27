import React, { useState } from 'react'
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap'

const Quality = (props) => {
    return (
        <Form.Check
            inline
            type="checkbox"
            label={props.label}
            name="checkbox1"
        />
    )
}

const Create = () => {

    const [file, setFile] = useState(null)

    const handleChange = (e) => {
        setFile(e.target.files[0])
    }




    return (
        <div className="container bg-light p-5 mt-5 mb-5" >
            <Row>
                <Col>
                <div className="mb-3"  >
                    <FloatingLabel
                        controlId="floatingInput"
                        label="First name"
                        className="mb-3 "
                    >
                        <Form.Control type="string" placeholder="" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Last name"
                        className="mb-3 "
                    >
                        <Form.Control type="string" placeholder="" />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3 "
                    >
                        <Form.Control type="email" placeholder="" />
                    </FloatingLabel>
                    </div>

                    <Form>
                <div className="mb-3"  >
                    <Form.Label>Gender</Form.Label>
                    <Form.Check
                        type="radio"
                        label={`Male`}
                        name="radio1"
                    />
                    <Form.Check
                        type="radio"
                        label={`Female`}
                        name="radio1"
                    />
                    <Form.Check
                        type="radio"
                        label={`Other`}
                        name="radio1"
                    />
                </div>
            </Form>
                </Col>

                <Col>
                    <Form.Group controlId="formFile" className="mb-3 d-flex flex-column align-items-end">
                        <div className="preview mb-1 border">
                        <img src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : "preview"} className=""/>
                        </div>
                        <Form.Control type="file" onChange={handleChange} accept="image/*" className="w-50"/>
                    </Form.Group>
                </Col>
            </Row>

            <Form>
                <div className="mb-3" >
                    <Form.Label>Describe yourself</Form.Label><br />
                    <Quality label="New in Town" />
                    <Quality label="Swimming" />
                    <Quality label="Athlete" />
                    <Quality label="Stand up Comedy" />
                    <Quality label="Poetry" />
                    <Quality label="Yoga" />
                    <Quality label="Fishing" />
                    <Quality label="House Parties" />
                    <Quality label="90s Kid" />
                    <Quality label="Movies" />
                    <Quality label="Cricket" />
                    <Quality label="Tea" />
                    <Quality label="Gamer" />
                    <Quality label="Writer" />
                    <Quality label="Photography" />
                    <Quality label="Netflix" />
                    <Quality label="Cooking" />
                    <Quality label="Spirituality" />
                </div>
            </Form>

            <div className="mt-5 d-flex justify-content-center"  >
            <Button variant="outline-danger" className="px-5">Create</Button>
            </div>
        </div>
    )
}

export default Create