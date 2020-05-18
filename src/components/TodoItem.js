import React, { Component } from 'react'
import axios from 'axios'

class TodoItem extends Component {

    render() {
        const { item, handleDelete, handleUpdate } = this.props
        return (
            <div>
                <li className=" pt-2 list-group-item text-capitalize d-flex justify-content-between my-2">

                    <h6>{item}</h6>

                    <div className="todo-icon">
                        <button onClick={handleUpdate} className="btn btn-default btn-sm">
                            <span className="mx-2 text-success">
                                <i className="fas fa-pen"></i>
                            </span>
                        </button>
                        <button onClick={handleDelete} className="btn btn-default btn-sm">
                            <span className="mx-2 text-danger">
                                <i className="fas fa-trash-alt"></i>
                            </span>
                        </button>
                    </div>
                </li>

            </div>
        )
    }
}

export default TodoItem
