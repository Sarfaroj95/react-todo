import React, { Component } from 'react'
import axios from 'axios'


class TodoItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titles: []
        }
    }


    componentWillMount() {
        axios.get('https://boilar.herokuapp.com/api/v1/user/todolist')
            .then(res => {
                console.log('Data', res.data)
                this.setState({ titles: res.data })
            })
            .catch(error => {
                console.log("error", error)
            })
    }


    render() {
        const { titles } = this.state
        return (
            <div>

                {
                    titles.map(title =>
                        // <li key="title._id">
                        //     {title.title}
                        // </li>

                        <li key="title._id" className=" pt-2 list-group-item text-capitalize d-flex justify-content-between my-2">

                            <h6>{title.title}</h6>
                            <div className="todo-icon">
                                <span className="mx-2 text-success">
                                    <i className="fas fa-pen"></i>
                                </span>
                                <span className="mx-2 text-danger">
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                            </div>
                        </li>
                    )
                }
            </div>
        )
    }
}

export default TodoItem
