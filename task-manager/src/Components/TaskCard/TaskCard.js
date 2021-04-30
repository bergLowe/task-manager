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
        <div className = "card-wrapper mr-5">
            {/* <div class = "card-top" style={{"background-color": "black"}}></div> */}
            <div className = "task-holder">
                <span className = "card-header" 
                style={{"backgroundColor": "white", "borderRadius": "10px", 
                "border":"1px solid black"}}
                >{taskObj.Name}</span>
                <p className = "mt-3">{taskObj.Description}</p>

                <div style={{"position": "absolute", "right" : "20px", "top" : "20px"}}>
                    {/* <i className = "far fa-edit mr-3" style={{"color" : "black", "cursor" : "pointer"}} ></i> */}
                    <i className="fas fa-trash-alt text-white" style = {{"color" : "black", "cursor" : "pointer"}} onClick={handleDelete} ></i>
                </div>

                {/* <div style={{"position": "absolute", "right" : "20%","bottom" : "20px"}}>
                <input type="checkbox" style={{"fontSize":"5rem"}}/>
                </div> */}

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    {/* <i className = "far fa-edit mr-3" style={{"color" : "black", "cursor" : "pointer"}} ></i> */}
                    {/* <i className="fas fa-trash-alt" style = {{"color" : "black", "cursor" : "pointer"}} ></i> */}
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
