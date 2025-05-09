import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

//fopr icons
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdSave } from "react-icons/io";

import { v4 as uuidv4 } from "uuid";
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  // todo is our input text
  const [todo, settodo] = useState("");

  // todos is an array which holds all our todo
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {  
    let todoString = localStorage.getItem("todos")
    if(todoString ){
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos)
    }
  }, [])
  

  //function for the local storage
  const saveToLS = (e) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e)=>{
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)

    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    // console.log(`The id is ${id}`);
    // let index = todos.findIndex((item) => {
    //   return item.id === id;
    // });
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    // newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveToLS();
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    // console.log(todos);
    saveToLS();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // console.log(id)
    //toggle it
    // todos.filter
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    // console.log(index)
    //no new objext wll be created if we dont do that
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
      <h1 className="font-bold text-center text-2xl">iTask - Manage your Todos at one place</h1>
        <div className="addTodo my-5 flex flex-col">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className=" rounded-lg w-full border border-gray-600 my-5 p-1 focus:outline focus:outline-violet-500"/>
          <div className="flex justify-center">
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="flex items-center space-x-1 bg-violet-800 disabled:bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md">
              <span>Save</span>
              <IoMdSave className="text-base" />
            </button>
          </div>

        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <h2 className="font-bold text-lg">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo flex justify-between my-3">
                  <div className="flex gap-5">                 
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                 </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>{handleEdit(e, item.id)}}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1" >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
