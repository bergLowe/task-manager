import React from 'react';
import {useState} from 'react';
import EditTask from '../EditTask/EditTask';
import { Checkbox } from '@mui/material';
import { Card,CardBody } from 'reactstrap';
import './TaskCard.css';


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
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({completed:complete})
        }).then(res => {
            if (res.status === 200) {
                window.location.reload(true);
            }
        }).catch(err => console.error(err));
        // var post = await content.json();
        // console.log("edit: "+post);
    }

    return (
        <div className = "card-wrapper mr-5">
            <div className = "task-holder">
                <p className = "card-header" 
                style={{"backgroundColor": "white", "borderRadius": "3px", 
                "border":"1px solid white"}}
                >{taskObj.title}</p>
                {taskObj.completed ? (
                    <span className="istask_complete">Task is Completed!</span>
                ) : (
                    <span></span>
                )}
                <Card className = "mt-3" style={{backgroundColor: 'inherit',border:'0'}}>
                    <CardBody className="card-body-desc">{taskObj.description}</CardBody>
                </Card>
                {/* <p className = "mt-3">{taskObj.description}</p> */}

                <div style={{"position": "absolute", "right" : "20px", "top" : "20px"}}>
                    <i className="fas fa-trash-alt text-white" style = {{"color" : "black", "cursor" : "pointer"}}
                    onClick={handleDelete} ></i>
                </div>

                <div style={{"position": "absolute", "right" : "50px", "top" : "12px"}}>
                    <Checkbox onChange={changeValue} checked={complete}
                    style ={{ color: 'white'}}></Checkbox>
                    <button type="button" className="btn btn-outline-light btn-sm" onClick={completeStatus} 
                    >{taskObj.completed ? (
                        <span>Incomplete</span>
                    ) : (
                        <span>Completed</span>
                    )}</button>
                </div>
                {/* <div style={{"position": "absolute", "bottom" : "20px"}}>
                    <Checkbox onChange={changeValue} checked={complete}
                    style ={{ color: 'white'}}></Checkbox>
                    <button type="button" className="btn btn-outline-light btn-sm" onClick={completeStatus} 
                    >{taskObj.completed ? (
                        <span>Incomplete</span>
                    ) : (
                        <span>Completed</span>
                    )}</button>
                </div> */}

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
