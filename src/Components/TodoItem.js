import React from "react";

export default function TodoItem(props) {
  return (
    <li className={props.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={props.completed}
          onClick={props.completeTodo}
        />
        <label>{props.title}</label>
        <button className="destroy" onClick={props.handleDeleteTodo} />
      </div>
    </li>
  );
}
