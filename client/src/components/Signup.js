import React, { useState } from 'react';
//import { Toast, ToastContainer, Form, FloatingLabel } from 'react-bootstrap'
import Notification from './Notification';




const SignUp = () => { 

    const [user, setuser] = useState({
        firstName: "", lastName: "", email: "", password: ""
    });

    const [notify, setnotify] = useState(false);//for notifications
    

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setuser({ ...user, [name]: value });
    }

    const handleClick = async (e) => {

        e.preventDefault();

        const { firstName, lastName, email, password } = user;
        console.log(user);


        //sending data
        const res = await fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, lastName, email, password
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
            setnotify(true);
        } else {
            window.alert("account created successfully");
            console.log("account created successfully");
            document.getElementById('closeSignup').click();
        }
    }


    return (
        <>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">New Account</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSignup"></button>
                    </div>
                    <div className="modal-body">

                        <div className="container padding">
                            <form method="post">
                                <div className="mb-3">
                                    <div className=" w-50 d-inline-block ">
                                        <input type="text" className="form-control" id="firstName" name="firstName" autoComplete="off" placeholder="First name*" value={user.firstName} onChange={handleInputs} />
                                    </div>
                                    <div className=" w-50  d-inline-block ">
                                        <input type="text" className="form-control" id="lastName" name="lastName" autoComplete="off" placeholder="Last name*" value={user.lastName} onChange={handleInputs} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="email1" name="email" aria-describedby="emailHelp" placeholder="Email address*" value={user.email} onChange={handleInputs} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control"
                                        placeholder="Password*" id="password" name="password" value={user.password} onChange={handleInputs} />
                                </div>
                                <button type="submit" onClick={handleClick} className="btn btn-outline-danger w-100">Create</button>
                            </form>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <a href="#exampleModalToggle2" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Already have an account? SignIn</a>
                    </div>
                </div>
            </div>

            {notify === true ?
                <Notification text="An email has been sent, please verify" bg="danger" />
                : null}

        </>
    )
}

export default SignUp