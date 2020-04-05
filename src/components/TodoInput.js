import React, { Component } from 'react'
import axios from 'axios'


export class TodoInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: ''

        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('https://boilar.herokuapp.com/api/v1/user/todo', this.state)
            .then(res => {
                console.log(res.data)
                alert(`Todo add is ${res.data.register}`)

            })
            .catch(error => {
                console.log(error)
                alert('Todo add is failed')
            })
    }



    render() {
        const { title, body } = this.state

        return (
            <div className="card card-body my-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-primary text-white">
                                <i class="fal fa-save"></i>
                            </div>
                        </div>
                        <input type="text" className="form-control text-capitalize"
                            placeholder="add todo item"
                            name='title'
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-primary text-white">
                                <i class="fal fa-save"></i>
                            </div>
                        </div>
                        <input type="text" className="form-control text-capitalize"
                            placeholder="add todo body"
                            name='body'
                            value={body}
                            onChange={this.handleChange} />

                    </div>
                    <button type="submit" className="btn btn-primary btn-block text-capitalize mt-3 ">add item</button>
                </form>
            </div>
        )
    }
}

export default TodoInput
