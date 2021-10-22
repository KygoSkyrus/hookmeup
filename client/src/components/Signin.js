import React, { useState } from 'react'
import SignUp from './Signup';


const SignIn = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const loginuser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        //console.log(data);
        if (data.error === "account doesn't exists") {
            window.alert("account doesn't exists");
        } else if (data.error === "fill all details") {
            window.alert("fill all details");
        } else if (data.error === "invalid credentials") {
            window.alert("invalid credentials");
        } else if (data.message === "user logged in successfully") {
            window.alert("user logged in successfully");
            document.getElementById('closeSignin').click();
        } else {
            window.alert("login success");
            console.log("login success");
        }
    }


    return (
        <>
            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="2" tabIndex="-1" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">SIGN IN</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSignin"></button>
                        </div>

                        <div className="modal-body">

                            <div className="padding" >
                                <form method="POST">
                                    <div className="mb-3">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email address*" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-outline-danger w-100" onClick={loginuser}>SIGN IN</button>
                                </form>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <a data-bs-target="#exampleModalToggle" href="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">New to Shopp-itt? create new account</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <SignUp />
            </div>
        </>
    )
}

export default SignIn