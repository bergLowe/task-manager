import React from 'react';
import {useState} from 'react';
import EditTask from '../EditTask/EditTask';
import { Checkbox } from '@material-ui/core';

const TaskCard = ({taskObj,index,deleteTask,updateArray}) => {

    const [modal, setModal] = useState(false);
    const [complete,setComplete] = useState(taskObj.completed);

    const toggle = () => {
        setModal(!modal);
    }

    const editTask = (object) => {
        updateArray(object,index);
    }

    const handleDelete = () => {
        deleteTask(taskObj,index);
    }


    const changeValue = () => {
        setComplete(!complete);
    }

    const completeStatus = (object) => {
        object.completed = complete;
        editTask(object);
        patchTask(taskObj._id);

    }

    async function patchTask (id) {
        var content = await fetch(`https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({completed:complete})
        });
        var post = await content.json();
        console.log("edit: "+post);
        window.location.reload(true)
    }

    return (
        <div className = "card-wrapper mr-5">
            <div className = "task-holder">
                <span className = "card-header" 
                style={{"backgroundColor": "white", "borderRadius": "10px", 
                "border":"1px solid black"}}
                >{taskObj.title}</span>
                {taskObj.completed ? (
                    <span>Task is Completed!</span>
                ) : (
                    <span></span>
                )}
                <p className = "mt-3">{taskObj.description}</p>

                <div style={{"position": "absolute", "right" : "20px", "top" : "20px"}}>
                    <i className="fas fa-trash-alt text-white" style = {{"color" : "black", "cursor" : "pointer"}}
                    onClick={handleDelete} ></i>
                </div>


                <div style={{"position": "absolute", "bottom" : "20px"}}>
                    {/* <input type="checkbox" onChange={changeValue} checked={complete}></input> */}
                    <Checkbox onChange={changeValue} checked={complete}
                    style ={{ color: 'white'}}></Checkbox>
                    <button type="button" className="btn btn-outline-light btn-sm" onClick={completeStatus} 
                    >{taskObj.completed ? (
                        <span>Incomplete</span>
                    ) : (
                        <span>Completed</span>
                    )}</button>
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
