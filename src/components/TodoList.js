import React, { Component } from 'react'
import TodoItem from './TodoItem'
import axios from 'axios'


export class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titles: [],
            msg: false,
            deltitle: ''

        }

    }

    hanldeDelete = (e, t) => {
        if (window.confirm('Are you sure')) {
            axios.delete('https://boilar.herokuapp.com/api/v1/user/tododelete/' + e)
                .then(res => {
                    console.log("delete success", res.data)
                    this.setState({ msg: true, deltitle: t })
                    this.props.handle()
                })
                .catch(err => {
                    console.log("delete faild", err)

                })
        }
    }
    handleClose = () => {
        this.setState({ msg: false })
    }



    render() {
        const { msg, deltitle } = this.state
        const { titles, handleUpdate } = this.props

        return (
            <div  >
                <ul className="list-group my-5">
                    <h3 className="text-capitalize text-center">Todo List</h3>
                    {
                        msg ? <div className="alert alert-danger" role="alert">
                            <b>Delete: </b>{deltitle} item deleted
                        <button onClick={this.handleClose} type="button" className="close btn btn-default" data-dismiss="alert" aria-label="Close">
                                <span className="text-danger">
                                    <i className="fal fa-times"></i>
                                </span>
                            </button>
                        </div> : null
                    }
                    {titles.length ?
                        titles.map(title => {
                            return <TodoItem key={title._id} item={title.title}
                                msg={msg} deltitle={deltitle}
                                handleUpdate={() => handleUpdate(title._id)}
                                handleDelete={() => { this.hanldeDelete(title._id, title.title) }}
                            />
                        }) : <p className="text-info text-center">Empty list</p>
                    }

                </ul>

            </div>
        )
    }
}

export default TodoList
