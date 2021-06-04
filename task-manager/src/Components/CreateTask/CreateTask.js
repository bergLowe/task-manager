import React from 'react';
import { useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal,toggle,task}) => {
    const [newTask, setNewTask] = useState('');
    const [newDesc, setNewDesc] = useState('');

    // const createTask = (e) => {
    //     e.preventDefault()
    //     let taskInfo = {};
    //     taskInfo["Name"] = newTask;
    //     taskInfo["Description"] = newDesc;
    //     task(taskInfo);
    // }
    async function postTask () {
        let task_ = {
            title:newTask,
            description: newDesc
        }
        var content = await fetch('https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(task_)
        });
        var post = await content.json();
        task(post);
        //console.log(post);
    }

    const getValue = (e) => {
        const name_ = e.target.name;
        const val = e.target.value;
        if(name_ === "taskName"){
            setNewTask(val);
        }else{
            setNewDesc(val)
        }
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add New Task</ModalHeader>
                <ModalBody>
                <form>
                    <div className="form-group">
                        <label htmlFor="tname">Task Name</label>
                        <input type="text" id="tname" className="form-control" 
                        name="taskName"
                        value={newTask}
                        onChange={getValue}
                        maxLength={45}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Task Description</label>
                        <textarea id="desc" rows="5" className="form-control"
                         name="description"
                        value={newDesc}
                        onChange={getValue}
                        maxLength={100}></textarea>
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={postTask} >Add Task</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CreateTask;
