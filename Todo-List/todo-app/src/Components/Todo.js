import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
export default App;
    function App() {
    const [allTodos,setAllTodos]=useState([]);
    const [newTodoTitle,setNewTodoTitle]=useState('');
    const [newDescription,setNewDescription]=useState('');
    const [CompletedTodos,setCompletedTodos] = useState([]);
    const[isCompletedScreen,setIsCompletedScreen] = useState(false);

    const handleAddNewTodo =()=>{
        let newToDoObj = {
            title:newTodoTitle,
            description:newDescription,
        };
        //console.log(newToDoObj);
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newToDoObj);
        //console.log(updatedTodoArr);
        setAllTodos(updatedTodoArr);
        localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
        setNewDescription('');
        setNewTodoTitle('');
    };


    useEffect(()=>{
        let savedTodos = JSON.parse(localStorage.getItem('todolist'));
        let savedCompletedToDos = JSON.parse(localStorage.getItem('completedTodo'));
        if(savedTodos){
            setAllTodos(savedTodos);
        }

        if(savedCompletedToDos){
           setCompletedTodos(savedCompletedToDos);
        }
    },[]);

    const handleToDoDelete = (index)=>{
        let reducedTodos = [...allTodos];
        reducedTodos.splice(index,1);
        //console.log(index);

        //console.log(reducedTodo);
        localStorage.setItem('todolist',JSON.stringify(reducedTodos));
        setAllTodos(reducedTodos);
    };

    const handleCompletedTodoDelete = (index)=>{
        let reducedCompletedTodos = [...CompletedTodos];
        reducedCompletedTodos.splice(index);
        //console.log(reducedCompletedTodos);
        
        localStorage.setItem('completedTodos',JSON.stringify(reducedCompletedTodos));
        setCompletedTodos(reducedCompletedTodos);
    };

    const handleComplete = index =>{
        const date = new Date();
        let dd = date.getDate;
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        let hh = date.getHours();
        let minutes = date.getMinutes();
        let ss = date.getSeconds();
        let finalDate = dd + '-' + mm + '-' + yyyy + 'at' + hh + ':' + minutes + ':' + ss;

        let filteredTodo = {
            ...allTodos[index],
            completedOn: finalDate,
        };

        //console.log(filteredTodo);

        let updatedCompletedList = [...CompletedTodos, filteredTodo];
        console.log(updatedCompletedList);
        setCompletedTodos(updatedCompletedList);
        localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedList));

        // console.log (index);
        handleToDoDelete (index);
    };

    
    return (
    <div className='App'>
        <h1>My Todos</h1>
        <div className='todo-wrapper'>
            <div className='todo-input'>
                <div className='todo-input-item'>
                    <label>Title</label>
                    <input text="text" value={newTodoTitle} onChange={(e)=>setNewTodoTitle(e.target.value)} placeholder="What's the title of your To Do?" ></input>
                </div>
                <div className='todo-input-item'>
                    <label>Description</label>
                    <input text="text"  value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the discription of your To Do?" ></input>
                </div>    
                <div className='todo-input-item'>
                    <button type='button'onClick={handleAddNewTodo} className='primary-Btn'>Add</button>    
                </div>
            </div>
            <div className='btn-area'>
                <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`} onClick={()=> setIsCompletedScreen(false)}>TOdo</button>
                <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`} onClick={()=> setIsCompletedScreen(true)}>Completed</button>   
            </div>
            <div className='todo-list'>

                {isCompletedScreen === false && allTodos.map((item,index)=>{
                    return(
                        <div className='todo-list-item' key={index}>
                         <div>   
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
                <div>
                <AiOutlineDelete  className='icon' onClick={()=>handleToDoDelete(index)} title='Delete?'/>
                <BsCheckLg  className='check-icon' onClick={()=>handleComplete(index)} title='Completed?'/>
                </div>   
            </div>
                  );
                })}


                {isCompletedScreen === true && CompletedTodos.map((item,index)=>{
                    return(
                        <div className='todo-list-item'key={index}>
                         <div>   
                    <h3>{item.title}</h3>
                    <p><i>completed at: {item.completedOn}</i></p>
                </div>
                <div>
                <AiOutlineDelete  className='icon' onClick={()=>handleCompletedTodoDelete(index)} title='Delete?'/>
                </div>
                
            </div>
                  );
                })}
                
        </div>    
    </div>
    </div>
  );
}
