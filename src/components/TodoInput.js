import React, { Component } from 'react'
import axios from 'axios'
import TodoList from './TodoList'
import { toast } from 'react-toastify';


export class TodoInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titles: [],
            title: '',
            body: '',
            msg: false,
            errorMsg: false,
            update: false,
            btn: true,
            up_id: ''

        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        axios.get('https://boilar.herokuapp.com/api/v1/user/todolist')
            .then(res => {
                this.setState({ titles: res.data })
            })
            .catch(error => {
                console.log("error", error)
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        if (this.state.btn == true) {
            axios.post('https://boilar.herokuapp.com/api/v1/user/todo', this.state)
                .then(res => {
                    this.setState({ title: '', body: '' })
                    console.log(res.data)
                    this.setState({ msg: true })
                    if (res.data.register === true) {
                        console.log("I am right")
                        toast.success("Register Success", { autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
                        this.componentDidMount()
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errorMsg: true })
                })
        } else {
            axios.post('https://boilar.herokuapp.com/api/v1/user/todoupdate/' + this.state.up_id, this.state)
                .then(res => {
                    console.log(res.data)
                    this.setState({ update: true, btn: true, title: '', body: '' })

                    if (res.data.success === true) {
                        this.componentDidMount()
                        console.log("I am update")

                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errorMsg: true, })
                })
        }

    }

    handleClose = () => {
        this.setState({ msg: false })
    }

    handleClose1 = () => {
        this.setState({ errorMsg: false })

    }
    handleClose2 = () => {
        this.setState({ update: false })

    }
    handleGet = () => {
        this.componentDidMount()
    }

    handleUpdate = (e) => {
        this.setState({ up_id: e })
        axios.get('https://boilar.herokuapp.com/api/v1/user/tododetails/' + e)
            .then(res => {
                this.setState({ title: res.data.title, body: res.data.body, btn: false })
                console.log("Update data", res.data)
            })
            .catch(error => {
                console.log("error", error)
            })
    }


    render() {
        const { title, body, msg, errorMsg, titles, btn, update } = this.state
        return (

            <div>
                <div className="card card-body my-3">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text bg-primary text-white">
                                    <i class="fal fa-save"></i>
                                </div>
                            </div>
                            <input type="text" className="form-control "
                                placeholder="Enter todo item"
                                name='title'
                                value={title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-group mt-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text bg-primary text-white">
                                    <i className="fas fa-pen"></i>

                                </div>
                            </div>
                            <input type="text" className="form-control"
                                placeholder="Enter todo body"
                                name='body'
                                value={body}
                                onChange={this.handleChange} />

                        </div>
                        {
                            btn ? <button type="submit" className="btn btn-primary btn-block text-capitalize mt-3 ">add item</button> :
                                <button type="submit" className="btn btn-info btn-block text-capitalize mt-3 ">Update item</button>

                        }
                    </form>

                    {
                        msg ? <div className="alert alert-success mt-4 alert-sm" role="alert">
                            You <b>successfully</b> created your todo item

                        <button onClick={this.handleClose} type="button" className="close btn btn-default" data-dismiss="alert" aria-label="Close">
                                <span className="text-danger">
                                    <i className="fal fa-times"></i>
                                </span>
                            </button>
                        </div> : null
                    }

                    {
                        update ? <div className="alert alert-info mt-4 alert-sm" role="alert">
                            You <b>successfully</b> Update your todo item

                        <button onClick={this.handleClose2} type="button" className="close btn btn-default" data-dismiss="alert" aria-label="Close">
                                <span className="text-danger">
                                    <i className="fal fa-times"></i>
                                </span>
                            </button>
                        </div> : null
                    }

                    {
                        errorMsg ? <div className="alert alert-warning mt-4 alert-sm" role="alert">
                            <b>Warning: </b>{title} title already exists

                        <button onClick={this.handleClose1} type="button" className="close btn btn-default" data-dismiss="alert" aria-label="Close">
                                <span className="text-danger">
                                    <i className="fal fa-times"></i>
                                </span>
                            </button>
                        </div> : null
                    }
                </div>

                <TodoList response={msg} titles={titles} handle={this.handleGet}
                    handleUpdate={this.handleUpdate} />
            </div>
        )
    }
}


export default TodoInput
