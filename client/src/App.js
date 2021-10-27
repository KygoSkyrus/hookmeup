import React,{} from 'react'
import './App.css';
import SignIn from './components/Signin'
import Create from './components/Create';
//import Second from './components/Second';






function App() {

  

  return (
    <div className="App">
{/* 
     <div className="main-bg">
        <p className="main-name">hook me up</p>
        <SignIn/>
        <button className="create-acc-btn " data-bs-toggle="modal" href="#exampleModalToggle" >
          Get hooked
        </button> 
      </div>
*/}
<Create/>

    </div>
  );
}

export default App;
