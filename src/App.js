import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';


class App extends Component {



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h4 className="text-capitalize text-center">todo input</h4>
            <TodoInput />
            <TodoList />
          </div>
        </div>
      </div>
    )
  }
}

export default App
