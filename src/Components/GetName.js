import React from 'react';
import Myaccount from '../Components/Myaccount/Myaccount';
const GetName = (name) => {
    return (
        <div>
            <Myaccount name={name}></Myaccount>
        </div>
    )
}

export default GetName;
