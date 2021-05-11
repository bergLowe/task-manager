import React from 'react';
import  './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h3>Task Manager</h3>
            <div>
            <ul>
                <li>
                    <Link to="./">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/create-task">Add Task</Link>
                </li>
            </ul>
            </div>
        </div>

    )
}

export default Home;