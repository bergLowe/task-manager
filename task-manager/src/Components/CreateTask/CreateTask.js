import React from 'react';
import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal,toggle,task}) => {
    const [newTask, setNewTask] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const createTask = (e) => {
        e.preventDefault()
        let taskInfo = {};
        taskInfo["Name"] = newTask;
        taskInfo["Description"] = newDesc;
        task(taskInfo);
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
                        onChange={getValue}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Task Description</label>
                        <textarea id="desc" rows="5" className="form-control"
                         name="description"
                        value={newDesc}
                        onChange={getValue}></textarea>
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={createTask} >Add Task</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CreateTask;
