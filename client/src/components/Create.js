import React, { useState, useEffect } from 'react'
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap'

const Quality = (props) => {
    return (
        <Form.Check
            inline
            type="checkbox"
            label={props.label}
            name="interests"
            value={props.label}
            onChange={props.handleInputs}
        />
    )
}

const Create = () => {

    const d = new FormData();

    const [file, setFile] = useState(null);
    const [userDetails, setuserDetails] = useState();
    const [secondaryDetails, setsecondaryDetails] = useState({
        gender: "", interests: [], dp: d
    });

    //for image
    const handleChange = (e) => {

        setFile(e.target.files[0])
        d.append('file', file);
        console.log(d)
    }

    //storing values from the form(for radio buttons)
    var name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        console.log(name, value)
        setsecondaryDetails({ ...secondaryDetails, [name]: value });
    }

    //for checkbox
    const handleCheck = (e) => {
        let isChecked = e.target.checked;//returns true of false
        name = e.target.name;//name of the input i.e. interest
        value = e.target.value;

        if (isChecked === true) {
            secondaryDetails.interests.push(value);//push the value in array
            secondaryDetails.interests.filter((val, i, arr) => arr.indexOf(value) === i);//filtering & removing the duplicate values
        }

        if (isChecked === false) {
            var index = secondaryDetails.interests.indexOf(value);//getting the index of value that is unseleceted
            if (index > -1) {
                secondaryDetails.interests.splice(index, 1);//splicing that value from the index
            }
        }
        console.log(secondaryDetails)
    }


    useEffect(() => {

        var abc;
        fetch('/active', {
            method: 'POST',
            body: abc
        }).then((response) => {
            response.json().then((res) => {
                //console.log(res.message);
                console.log(res.message.email);
                document.cookie = `name=${res.message.firstName}; SameSite=None; Secure;max-age=3600`;
                document.cookie = `email=${res.message.email}; SameSite=None; Secure;max-age=3600`;
                setuserDetails(res.message);
                if (res.message === "not active") {
                    console.log("not registered");
                }
            })
        }).catch((error) => console.log(error));

    }, [])

    //console.log(document.cookie)
    //ask from here about the details of the user along with the token mail and all to show at profile
    //also run useeffect,,an api back to server to cjeck if user status is active,,,if true only then show the create page to user
    //also ask from this api for user's all details and then save it to cookie  from here (no need to save it from the serverside)  


    const email = "gupta.divya1116@gmail.com";

    console.log(file);
    console.log(secondaryDetails);

    const handleClick = async (e) => {

        e.preventDefault();

        const { gender, interests, dp } = secondaryDetails;
        //console.log(user);


        //secondary details to backend 
        const res = await fetch('/secondarydetails', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gender, interests, file, email
            })
        });

        const data = await res.json();

        console.log(data);
        if (data.error === "fill all details" || !data) {
            window.alert("fill all details");
            console.log("fill all details");
        } else if (data.error === "email already exists") {
            window.alert("email already exists");
        } else if (data.message === "email sent") {
            //setnotify(true);
        } else {
            window.alert("account created successfully");
            console.log("account created successfully");
            document.getElementById('closeSignup').click();
        }
    }


    return (

        <div className="container bg-light p-5 mt-5 mb-5">
            {userDetails ?
                <>
                    <Row>
                        <Col>
                            <div className="mb-3"  >
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="First name"
                                    className="mb-3 "
                                >
                                    {/* <Form.Control type="string" placeholder="" value={userDetails.firstName} readOnly/> */}
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Last name"
                                    className="mb-3 "
                                >
                                    {/* <Form.Control type="string" placeholder="" value={userDetails.lastName} readOnly /> */}
                                </FloatingLabel>

                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3 "
                                >
                                    {/* <Form.Control type="email" placeholder="" value={userDetails.email} readOnly /> */}
                                </FloatingLabel>
                            </div>

                            <Form>
                                <div className="mb-3"  >
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label='Male'
                                        value="male"
                                        name="gender"
                                        onChange={handleInputs}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={`Female`}
                                        value="female"
                                        name="gender"
                                        onChange={handleInputs}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={`Other`}
                                        value="other"
                                        name="gender"
                                        onChange={handleInputs}
                                    />
                                </div>
                            </Form>
                        </Col>

                        <Col>
                            <Form.Group controlId="formFile" className="mb-3 d-flex flex-column align-items-end">
                                <div className="preview mb-1 border">
                                    <img src={file ? URL.createObjectURL(file) : null} alt={file ? file.name : "preview"} className="" />
                                </div>
                                <Form.Control type="file" onChange={handleChange} accept="image/*" className="w-50" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form>
                        <div className="mb-3" >
                            <Form.Label>Describe yourself</Form.Label><br />
                            <Quality label="New in Town" handleInputs={handleCheck} />
                            <Quality label="Swimming" handleInputs={handleCheck} />
                            <Quality label="Athlete" handleInputs={handleCheck} />
                            <Quality label="Stand up Comedy" handleInputs={handleCheck} />
                            <Quality label="Poetry" handleInputs={handleCheck} />
                            <Quality label="Yoga" handleInputs={handleCheck} />
                            <Quality label="Fishing" handleInputs={handleCheck} />
                            <Quality label="House Parties" handleInputs={handleCheck} />
                            <Quality label="90s Kid" handleInputs={handleCheck} />
                            <Quality label="Movies" handleInputs={handleCheck} />
                            <Quality label="Cricket" handleInputs={handleCheck} />
                            <Quality label="Tea" handleInputs={handleCheck} />
                            <Quality label="Gamer" handleInputs={handleCheck} />
                            <Quality label="Writer" handleInputs={handleCheck} />
                            <Quality label="Photography" handleInputs={handleCheck} />
                            <Quality label="Netflix" handleInputs={handleCheck} />
                            <Quality label="Cooking" handleInputs={handleCheck} />
                            <Quality label="Spirituality" handleInputs={handleCheck} />
                        </div>
                    </Form>

                    <div className="mt-5 d-flex justify-content-center"  >
                        <Button variant="outline-danger" className="px-5" onClick={handleClick}>Create</Button>
                    </div>
                </>
                :
                <h1>something went wrong</h1>}
        </div>
    )
}

export default Create