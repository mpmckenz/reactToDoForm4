import React from "react";
import TodoItem from "./TodoItem.js";

export default function TodoList(props) {
  return (
    <section className="main">
      <ul className="todo-list">
        {props.todos.map(todo => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            completeTodo={props.completeTodo(todo.id)}
            handleDeleteTodo={props.handleDeleteTodo(todo.id)}
          />
        ))}
      </ul>
    </section>
  );
}
