import React from 'react';
import {Link} from 'react-router-dom'
//import Main from './Main';
import Notification from './Notification';

const Verification = () => {
    return (
        <div className="cont">
            <section>
               <Link to='/create'>create account</Link>
            </section>

            <Notification text="Your email has been verified, Proceed to Main page" bg="success" />
        </div>
    )
}

export default Verification