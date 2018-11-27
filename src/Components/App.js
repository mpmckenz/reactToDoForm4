import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "../App.css";
import InitialTodoList from "../todos.json";
import TodoList from "./TodoList.js";

class App extends Component {
  state = { todos: InitialTodoList };

  handleDeleteCompletedTodos = event => {
    const newTodos = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({
      todos: newTodos
    });
  };

  handleDeleteTodo = todoIdThatWasClicked => event => {
    const newTodos = this.state.todos.filter(todo => {
      if (todo.id === todoIdThatWasClicked) {
        return false;
      }
      return true;
      //look for matched id todoIdThatWasClicked = todo.id
    });
    this.setState({
      todos: newTodos
    });
  };

  handleCompletedTodo = idUserClicked => event => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === idUserClicked) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setState({
      todos: newTodos
    });
  };

  addNewTodo = event => {
    const newTodos = this.state.todos.slice(0);
    if (event.keyCode === 13) {
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 314) + 1,
        title: event.target.value,
        completed: false
      };
      newTodos.push(newTodo);
      this.setState({
        todos: newTodos
      });
      event.target.value = "";
    }
  };

  countItemsLeft = () => {
    return this.state.todos.filter(todo => {
      return todo.completed === false;
    }).length;
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.addNewTodo}
          />
        </header>
        <section className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <TodoList
                  todos={this.state.todos}
                  completeTodo={this.handleCompletedTodo}
                  handleDeleteTodo={this.handleDeleteTodo}
                />
              )}
            />
            <Route
              path="/active"
              render={() => (
                <TodoList
                  todos={this.state.todos.filter(todo => !todo.completed)}
                  completeTodo={this.handleCompletedTodo}
                  handleDeleteTodo={this.handleDeleteTodo}
                />
              )}
            />
            <Route
              path="/completed"
              render={() => (
                <TodoList
                  todos={this.state.todos.filter(todo => todo.completed)}
                  completeTodo={this.handleCompletedTodo}
                  handleDeleteTodo={this.handleDeleteTodo}
                />
              )}
            />
          </Switch>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.countItemsLeft()}</strong> item(s) left
          </span>
          <ul className="filters">
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/active"> Active </Link>
            </li>
            <li>
              <Link to="/completed"> Completed </Link>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleDeleteCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
export default App;
