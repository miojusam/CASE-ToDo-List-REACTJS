import { useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

import './edit.css'

import { RiCheckFill } from 'react-icons/ri'
import { RiCloseCircleLine } from 'react-icons/ri'
import { RiArrowGoBackLine } from 'react-icons/ri'


function Edit() {
    const { id } = useParams()

    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    async function addTask(e) {
        e.preventDefault()
        const response = await axios.patch(`http://127.0.0.1:3001/todo/${id}`,
            { description, dueDate: date, done: false, hide: false })
        setDescription(response.data)
        alert("Tarefa alterada!");
    }

    return (
        <div>
            <main>
                <div className='cardPost'>
                    <h1>Editar Tarefa</h1>
                    <form onSubmit={addTask}>

                        <input
                            className='descriptionInput'
                            type='text'
                            id="description"
                            name='description'
                            placeholder='Descrição'
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <input
                            className='date'
                            type='datetime-local'
                            id='date'
                            name='date'
                            onChange={(e) => setDate(e.target.value)}
                            required
                            
                        />

                        <div className='btns'>

                            <div>
                                <Link to="/">
                                    <button type='reset' className='btnBack'><RiArrowGoBackLine /></button>
                                </Link>
                            </div>
                            <div>
                                <button type='submit' className='btnSubmit'><RiCheckFill /></button>
                            </div>
                            <div >
                                <button type='reset' className='btnCancel'><RiCloseCircleLine /></button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Edit