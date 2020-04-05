import React, { Component } from 'react'
import TodoItem from './TodoItem'

export class TodoList extends Component {
    render() {
        return (
            <ul className="list-group my-5">
                <h3 className="text-capitalize text-center">Todo List</h3>
                <TodoItem />

            </ul>


        )
    }
}

export default TodoList
