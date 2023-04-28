import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  const increaseCounter = () => {
    setCounter((prevState) => prevState + 1);
  };
  const decreaseCounter = () => {
    setCounter((prevState) => prevState - 1);
    if (counter <= 0) {
      setCounter(0);
    }
  };

  const [tarefas, setTarefas] = useState([
    { id: 1, task: "Pagar a conta de luz" },
    { id: 2, task: "estudar React hooks" },
  ]);

  const [input, setInput] = useState("");

  const handleInputTask = useCallback(
    (e) => {
      e.preventDefault();
      console.log(input);
      setTarefas((prevState) => [
        ...prevState,
        { id: Math.floor(Math.random() * 100), task: input },
      ]);
      setInput("");
    },
    [input]
  );

  const handleRemove = (index) => {
    const newTarefas = tarefas.filter((item) => item.id !== index);
    setTarefas(newTarefas);
  };
  useEffect(() => {
    const tarefasStorage = localStorage.getItem("tarefas");
    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return (
    <>
      <h2>Counter</h2>
      <div>
        <p>{counter}</p>
        <div>
          <button onClick={increaseCounter}>+</button>
          <button onClick={decreaseCounter}>-</button>
        </div>
      </div>

      <h2>Tasks</h2>
      <div>
        <form onSubmit={handleInputTask}>
          <p>Add Task</p>
          <input
            type="text"
            placeholder="add task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit">add task </button>
        </form>
        <ul>
          {tarefas.map((item) => {
            return (
              <li key={item.id} onClick={() => handleRemove(item.id)}>
                {item.task}
              </li>
            );
          })}
        </ul>
        <strong> you have {totalTarefas} task to do </strong>
      </div>
    </>
  );
}

export default App;
