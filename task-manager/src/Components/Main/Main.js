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
        localStorage.setItem("taskCard",JSON.stringify(task_));    
        setTaskCard(task_);
        setModal(false);
    }

    const updateArray = (object, index) => {
        let temp = taskCard;
        temp[index] = object;
        localStorage.setItem("taskCard",JSON.stringify(temp))
        setTaskCard(temp);
        window.location.reload();
    }
    const deleteTask = (index) => {
        let temp = taskCard;
        temp.splice(index,1);
        localStorage.setItem("taskCard",JSON.stringify(temp));
        setTaskCard(temp);
        console.log(taskCard);
        window.location.reload();
    }
    

    useEffect(() => {
        let taskList = localStorage.getItem("taskCard");

        if(taskList){
            let taskObj = JSON.parse(taskList);
            setTaskCard(taskObj);
        }
        return () => {
            
        }
    }, [])

    const toggle = () => setModal(!modal);
    return (
        <>
        <Myaccount></Myaccount>
        <div  className="header1 text-center">
           {/* <h3>To-Do List</h3> */}
           <button className="btn btn-light mt-2"
           onClick = {() => setModal(true)}
           >Add Task  <i className="fas fa-plus mr-auto"></i></button>
          
        </div>
        <hr style={{"borderColor":"#D3D1D0","width":"75%","margin":"2% auto"}}></hr>
        <div className="taskCards">
            {taskCard && taskCard.map((item,index) => 
            // <TaskCard taskName = {item.name} taskDesc = {item.description} index={item.id}
            <TaskCard taskObj = {item} index={index}
            deleteTask = {deleteTask}
            updateArray = {updateArray}/>)
            }
        </div>
        <CreateTask toggle = {toggle} modal = {modal} task = {createTaskCard}></CreateTask>
        </>
        
    )
}

export default Main
