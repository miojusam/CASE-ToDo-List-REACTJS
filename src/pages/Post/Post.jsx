import { useState } from 'react'
import axios from 'axios'

import './post.css'

import { RiCheckFill } from 'react-icons/ri'
import { RiCloseCircleLine } from 'react-icons/ri'

function Post({ callback }) {


    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    async function addTask(e) {
        e.preventDefault()
        const response = await axios.post('http://127.0.0.1:3001/todo',
            { description, dueDate: date, done: false, hide: false })
        callback(response.data)

        alert("Tarefa criada");
    }

    return (
        <div>
            <main>
                <div className='cardPost'>
                    <h1>Nova Tarefa</h1>
                    <div class='msg'></div>
                    <form onSubmit={addTask}>

                        <input
                            className='descriptionInput'
                            type='text'
                            id="description"
                            name='description'
                            placeholder='Descrição'
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            maxLength={50}
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

export default Post


