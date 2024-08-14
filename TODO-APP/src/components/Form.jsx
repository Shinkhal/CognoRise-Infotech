import { useState } from "react";

function Form(props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim()) {
      props.addTask(name);
      setName("");
      setError(""); // Clear any existing error message
    } else {
      setError("Please enter a task.");
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          Complete Your Goals Today ..
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add Task
      </button>

      {error && <p className="error-message">{error}</p>} {/* Conditionally render error message */}
    </form>
  );
}

export default Form;
