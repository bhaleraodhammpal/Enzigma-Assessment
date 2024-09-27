// src/components/Home.js
import React from "react";
import './Home.css';
// import TaskForm from "../component/TaskForm";
import ParentComponent from "../component/ParentComponent";
function Home() {
    
     function addData() {
        ParentComponent();
    }
    

    return (
     <>
            <nav className="nav">
                <div className="logo">
                    <img src="../image/logo192.png" alt="logo" />
                    <h1>Task</h1>
                </div>

                <div className="nav-buttons">
                    <button className="nav-button" onClick={()=>{addData()}}>New Task</button>
                    <button className="nav-button">Refresh</button>
                    
                </div>
                
            </nav>

            <div className="search">
                <div><input
                        type="text"
                        placeholder="Search tasks..."
                        className="nav-input"
                    /></div>
                </div>

            {/* <main className="main">
                <h2>Welcome to the Task Manager!</h2>
            </main>

            <footer className="footer">
                <p>&copy; 2024 Task Manager. All rights reserved.</p>
            </footer> */}
            </>
    );
}

export default Home;
