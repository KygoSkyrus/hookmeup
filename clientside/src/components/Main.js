import React from 'react';
import SignIn from './Signin'

  
export default function Main() {

  return (
    <>
      <div className="main-bg">
        <p className="main-name">hook me up</p>
        <SignIn />
        <button className="create-acc-btn" data-bs-toggle="modal" href="#exampleModalToggle" >
          Get hooked
        </button>
      </div>

    </>
  )
}

