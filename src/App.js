import { useState } from 'react';
import './App.css'
import deleteIcon from './Assets/cross.svg'
import editIcon from './Assets/edit.svg'

const App = () => {

    let data = JSON.parse(localStorage.getItem("todoData")) || []

    const [input, setInput] = useState('')
    const [list, setList] = useState(data)
    const [editInput, setEditInput] = useState("")
    const [update, setUpdate] = useState(false)


    const handleInput = (e) => {
        console.log("event", e)
        setInput(e.target.value)
    }

    const handleTask = (e) => {
        if (input === "") {
            alert("Please Enter the Task")
            return;
        } else {
            localStorage.setItem('todoData', JSON.stringify([...list, input]))
            let saveData = JSON.parse(localStorage.getItem("todoData"))
            setList([...saveData])
            setInput("")
        }
    }

    const handleUpdate = () => {
        console.log(list.splice(editInput, 1, input), editInput, input, "inppp")
        setInput("")
        setUpdate(false)
    }
    const handleDelete = (i) => {
        const filterList = list.filter((ele) => ele !== list[i])
        console.log("filter::", filterList)
        localStorage.setItem('todoData', JSON.stringify(filterList))

        setList(filterList)
    }
    const handleEdit = (i) => {
        const filterList = list.filter((ele) => ele === list[i])
        console.log("edit::", filterList)
        setInput(filterList[0])
        setEditInput(i)
        setUpdate(true)
    }

    return (
        <div className="App">
            <h2>Todo App</h2>
            <div className="container">
                <div className="input-box">
                    <input type='text' className='textInput' value={input} onChange={(e) => handleInput(e)} placeholder='    Enter task' />
                    {update ? <button onClick={handleUpdate}>Update</button> : <button onClick={handleTask}>Add Task</button>}
                </div>

                <div className="list-parent">
                    <ul>
                        {list.map((item, i) => <li className='list' key={i} > {item} <img className='deleteIcon' src={deleteIcon} alt="delete" onClick={() => handleDelete(i)} />
                            <img className='editIcon' src={editIcon} alt="editIcon" onClick={() => handleEdit(i)} /> </li>)}
                    </ul>
                </div>

            </div>

        </div>
    )
};

export default App

