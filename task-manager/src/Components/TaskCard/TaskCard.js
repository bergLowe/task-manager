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
        deleteTask(taskObj,index);
    }

    return (
        <div className = "card-wrapper mr-5">
            <div className = "task-holder">
                <span className = "card-header" 
                style={{"backgroundColor": "white", "borderRadius": "10px", 
                "border":"1px solid black"}}
                >{taskObj.title}</span>
                <p className = "mt-3">{taskObj.description}</p>

                <div style={{"position": "absolute", "right" : "20px", "top" : "20px"}}>
                    <i className="fas fa-trash-alt text-white" style = {{"color" : "black", "cursor" : "pointer"}}
                    onClick={handleDelete} ></i>
                </div>


                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    <button type="button" className="btn btn-outline-light btn-sm" 
                    onClick={() => setModal(!modal)}>Edit</button>
                </div>
        </div>
        <EditTask modal={modal} toggle={toggle} 
        editTask={editTask} taskObj={taskObj}></EditTask>
        </div>
    )
}

export default TaskCard;
