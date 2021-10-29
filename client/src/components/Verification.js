import React from 'react';
//import Main from './Main';
import Notification from './Notification';

const Verification = () => {
    return (
        <div>
            <section>
                <a href="/">Go to Main page</a>
            </section>

            <Notification text="Your email has been verified, Proceed to Main page" bg="success" />
        </div>
    )
}

export default Verification