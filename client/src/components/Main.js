import React, { } from 'react';
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
             <div aria-live="polite" aria-atomic="true" class="bg-dark bd-example-toasts ">
  <div class="toast-container position-absolute p-3 " id="toastPlacement">
    <div class="toast">
      <div class="toast-header">
        <img src="..." class="rounded me-2" alt="..."/>
        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </div>
      <div class="toast-body">
        Hello, world! This is a toast message.
      </div>
    </div>
  </div>
</div>
        </>
    )
}

