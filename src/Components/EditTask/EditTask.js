import React from 'react';
import { useState, useEffect} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditTask = ({modal,toggle,editTask,taskObj}) => {
    const [newTask, setNewTask] = useState('');
    const [newDesc, setNewDesc] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();
        // let temp = {};
        // temp['title'] = newTask;
        // temp['description'] = newDesc;
        // console.log("id: "+temp._id);
        taskObj.title= newTask.trim()[0].toUpperCase() + newTask.slice(1).toLowerCase();
        taskObj.description=newDesc;
        editTask(taskObj);
        patchTask(taskObj._id) 
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

    async function patchTask (id) {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({title:newTask,description: newDesc})
        }).then((res) => {	
            if (res.status === 200) {	
                toggle();	
            };
        });
        // var post = await content.json();
        // console.log("edit: "+post);
        // window.location.reload(true);
    }

    useEffect(() => {
        setNewTask(taskObj.title);
        setNewDesc(taskObj.description);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
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
                <Button color="primary" onClick={handleEdit} >Edit</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditTask;
