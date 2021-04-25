import React from 'react';
import {useState} from 'react';
import EditTask from '../EditTask/EditTask';

const TaskCard = ({taskObj,index,deleteTask,updateArray}) => {

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const editTask = (object) => {
        updateArray(object,index);
    }

    const handleDelete = () => {
        deleteTask(index);
    }

    return (
        <div class = "card-wrapper mr-5">
            {/* <div class = "card-top" style={{"background-color": "black"}}></div> */}
            <div class = "task-holder">
                <span class = "card-header" 
                style={{"background-color": "white", "border-radius": "10px", 
                "border":"1px solid black"}}
                >{taskObj.Name}</span>
                <p className = "mt-3">{taskObj.Description}</p>

                <div style={{"position": "absolute", "right" : "20px", "top" : "20px"}}>
                    {/* <i className = "far fa-edit mr-3" style={{"color" : "black", "cursor" : "pointer"}} ></i> */}
                    <i className="fas fa-trash-alt" style = {{"color" : "black", "cursor" : "pointer"}} onClick={handleDelete} ></i>
                </div>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    {/* <i className = "far fa-edit mr-3" style={{"color" : "black", "cursor" : "pointer"}} ></i> */}
                    {/* <i className="fas fa-trash-alt" style = {{"color" : "black", "cursor" : "pointer"}} ></i> */}
                    <button type="button" class="btn btn-outline-dark btn-sm" 
                    style = {{"color" : "black", "cursor" : "pointer"}} 
                    onClick={() => setModal(!modal)}>Edit</button>
                </div>
        </div>
        <EditTask modal={modal} toggle={toggle} 
        editTask={editTask} taskObj={taskObj}></EditTask>
        </div>
    )
}

export default TaskCard;
