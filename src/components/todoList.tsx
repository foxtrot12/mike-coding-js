import { generateRandomString } from "@/utilities/utilities";
import { FormEvent, memo, useEffect, useMemo, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const symbolDesc = useMemo(
    () => localStorage.getItem("todoSymbolDesc") ?? generateRandomString(4),
    []
  );

  function getNewTodoId() {
    return Symbol(symbolDesc);
  }

  function addTodo(title: string) {
    const newTodo: Todo = { title, id: getNewTodoId(), done: false };
    setTodos((pTodo) => [...(pTodo ?? []), newTodo]);
  }

  function removeTodo(id: symbol) {
    setTodos((pTodo) => {
      const newTodos = (pTodo ?? []).filter((todo) => todo.id !== id);
      return newTodos;
    });
  }

  function doTodo(id: symbol) {
    setTodos((pTodos) => {
      const newTodos = [...(pTodos ?? [])];
      newTodos.forEach((todo) => {
        if (todo.id === id) {
          todo.done = true;
        }
      });

      return newTodos;
    });
  }

  function addNewTodo(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    addTodo(`${formData.get("todoTitle")}`);
  }

  useEffect(() => {
    if (todos) localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    let todosJson = localStorage.getItem("todos");
    const todosArr = todosJson ? JSON.parse(todosJson) : null;
    if (Array.isArray(todosArr)) {
      todosArr.forEach((todo: Todo) => {
        todo.id = getNewTodoId();
      });
      setTodos(todosArr);
    }
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <form className="flex flex-col w-1/6 gap-1" onSubmit={addNewTodo}>
        <input
          name="todoTitle"
          className="border-grey border-2 rounded"
          type="text"
        ></input>
        <button
          className="cursor-pointer border-grey border-2 rounded"
          type="submit"
        >
          Add Todo
        </button>
      </form>
      <ul className="flex flex-col gap-1">
        {(todos ?? []).map((todo, ind) => (
          <li className="flex gap-1" key={ind}>
            <span>
              {todo.title}
              {todo.done ? "✔" : ""}
            </span>
            <button
              className="cursor-pointer border-grey border-2 rounded"
              onClick={() => removeTodo(todo.id)}
            >
              Delete
            </button>
            <button
              className="cursor-pointer border-grey border-2 rounded"
              onClick={() => doTodo(todo.id)}
            >
              Mark Done
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default memo(TodoList);

interface Todo {
  id: symbol;
  title: string;
  done: boolean;
}
