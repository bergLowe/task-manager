import React from 'react';
import './Main.css';
import {useState, useEffect} from 'react';
import CreateTask from '../CreateTask/CreateTask';
import TaskCard from '../TaskCard/TaskCard';
import Myaccount from '../Myaccount/Myaccount';

const Main = () => {
    const [modal, setModal] = useState(false);

    const [taskCard, setTaskCard] = useState([])

    const createTaskCard = (task) => {
        let task_ = taskCard;
        task_.push(task);  
        setTaskCard(task_);
        console.log("Task_ ="+task_);
        setModal(false);
    }
    
    const updateArray = (object, index) => {
        let temp = taskCard;
        temp[index] = object;
        setTaskCard(temp);
        setModal(false);
    }
    const deleteTask = (object,index) => {
        let temp = taskCard;
        temp.splice(index,1);
        setTaskCard(temp);
        removeTask(object._id);
    }
    
    async function getTask() {
        var content = await fetch('https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        var post = await content.json();
        setTaskCard(post);
        //console.log(post);
        //console.log("taskCard ---->"+ taskCard);

        // Object.entries(taskCard).forEach(
        //     ([key, value]) => console.log(key, value)
        // );
    }


    async function removeTask (id) {
        var content = await fetch(`https://darthremus-cors.herokuapp.com/https://berglowe-task-app.herokuapp.com/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        var post = await content.json();
        console.log(post.title);
        window.location.reload(true)
    }

    useEffect(() => {
        getTask();
        return () => {
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggle = () => setModal(!modal);
    return (
        <>
        <Myaccount></Myaccount>
        <div  className="header1 text-center">
           <button className="btn btn-light btn-lg mt-2"
           onClick = {() => setModal(true)}
           >Add Task  <i className="fas fa-plus mr-auto"></i></button>
          
        </div>
        <hr style={{"borderColor":"#D3D1D0","width":"75%","margin":"2% auto"}}></hr>
        <div className="taskCards">
            {taskCard &&  taskCard.map((item,index) =>
             <TaskCard taskObj = {item} index={index}
             deleteTask = {deleteTask}
             updateArray = {updateArray}
             toggle = {toggle} 
             modal = {modal}/> )
            }
        </div>
        <CreateTask toggle = {toggle} modal = {modal} task = {createTaskCard}></CreateTask>
        </>
        
    )
}

export default Main
