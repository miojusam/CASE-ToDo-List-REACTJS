import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './taskList.css'

import { Link } from "react-router-dom";
import Post from '../Post/Post'

import { BiCheck } from 'react-icons/bi'
import { BiTrash } from 'react-icons/bi'
import { BiEditAlt } from 'react-icons/bi'
import { BiArchiveIn } from 'react-icons/bi'




const List = () => {
    const [posts, setPosts] = useState([])

    // GET TASKS
    useEffect(() => {
        axios.get("http://127.0.0.1:3001/todo")
            .then((response) => {
                setPosts(response.data)
                console.log(response.data)
            })
            .catch(() => {
                console.log("err")
            })
    }, [])

    //POST INSTANT
    function callback(todo) {
        console.log(todo)
        setPosts([...posts, todo])
    }

    //DELETE
    function deletePost(id) {
        axios.delete(`http://127.0.0.1:3001/todo/${id}`)
        let confirmDelete = window.confirm('Deseja deletar esta tarefa?')
        if (confirmDelete === true) {
            setPosts(posts.filter(post => post._id !== id))

        }


    }
    //DONE TASK
    const taskDone = async (id) => {
        await axios.patch(`http://127.0.0.1:3001/todo/${id}`, {
            done: true
        })
        const varFilter = posts.filter(post => post._id !== id)
        const postFinded = posts.find(post => post._id === id)
        postFinded.done = true
        alert('Tarefa Concluída')
        setPosts([...varFilter, postFinded])
    }


    //HIDE TASK
    const taskHide = async (id) => {
        await axios.patch(`http://127.0.0.1:3001/todo/${id}`, {
            hide: true
        })
        setPosts(posts.filter(post => post._id !== id))
        alert('Tarefa Arquivada')
    }



    //SEARCH
    const handleSearch = async (search) => {
        let searching = search.target.value
        axios.get(`http://127.0.0.1:3001/todo?search=${searching}`)
            .then((response) => {
                setPosts(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (

        <div>
            <div className='title'>
                <h1>ToDo-List</h1>
            </div>
            <div className='searchBar'>
                <input
                    type="text"
                    className='descriptionInput'
                    placeholder='Pesquisa'
                    onChange={handleSearch}

                />
            </div>
            <Post callback={callback} />
            <main>
                <section className='container'>
                    <div className="cards">
                        {posts.map((post, key) => {

                            return (

                                <div className="card" key={key} id="card">

                                    <header className='taskCard'>

                                        <h2 className='taskCardTitle'
                                            id='taskCardTitle'
                                            style={{
                                                textDecoration: post.done ? 'line-through' : ''
                                            }}>{post.description}
                                        </h2>
                                    </header>

                                    <div>

                                        <p>
                                            {
                                                new Intl.DateTimeFormat('pt-BR', {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',

                                                }).format(new Date(post.dueDate))
                                            }
                                        </p>

                                    </div>

                                    <div className="btns">

                                        <div className="btnArchive" >
                                            <button onClick={() => taskHide(post._id)}
                                                style={{
                                                    visibility: post.done ? 'visible' : 'hidden'
                                                }}><BiArchiveIn /></button>

                                        </div>

                                        <div className='btnEdit'>
                                            <Link to={{ pathname: `/edit/${post._id}` }} >
                                                <button><BiEditAlt /></button>
                                            </Link>
                                        </div>



                                        <div className="btnCheck" >
                                            <button onClick={() => taskDone(post._id)}  ><BiCheck /></button>
                                        </div>

                                        <div className="btnDelete" >
                                            <button onClick={() => deletePost(post._id)}><BiTrash /></button>
                                        </div>



                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </div>
    )
}


export default List

