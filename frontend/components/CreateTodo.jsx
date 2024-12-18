import { useState } from "react";

export function CreateTodo() {
  const [title,setTitle] = useState("")
  const [description,setDesc] = useState("")

  return (
    <div>
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Title"
        onChange={(e) => {
        setTitle(e.target.value)
        }}
      ></input>
      <br />
      <input
        style={{ padding: 10, margin: 10 }}
        type="text"
        placeholder="Description"
        onChange={(e) => {
        setDesc(e.target.value)
        }}
      ></input>
      <br />
      <button style={{ padding: 10, margin: 10 }} onClick={async () => { 
        const data = await fetch('http://localhost:3000/todo',{
            method:'POST',
            body:JSON.stringify({
                title:title,
                description:description
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
        const json = await data.json();
        alert('Todo Added')
      }}>
        Add a Todo
      </button>
    </div>
  );
}
