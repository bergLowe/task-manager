import React from 'react';
import { useState, useEffect} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTask = ({modal,toggle,editTask,taskObj}) => {
    const [newTask, setNewTask] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();
        let temp = {};
        temp['Name'] = newTask;
        temp['Description'] = newDesc;
        editTask(temp);
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

    useEffect(() => {
        setNewTask(newTask);
        setNewDesc(newDesc);
    }, [])

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
                <ModalBody>
                <form>
                    <div className="form-group">
                        <label for="tname">Task Name</label>
                        <input type="text" id="tname" className="form-control" 
                        name="taskName"
                        value={newTask}
                        onChange={getValue}/>
                    </div>
                    <div className="form-group">
                        <label for="desc">Task Description</label>
                        <textarea id="desc" rows="5" className="form-control"
                         name="description"
                        value={newDesc}
                        onChange={getValue}></textarea>
                    </div>
                </form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleEdit} >Edit</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditTask;
