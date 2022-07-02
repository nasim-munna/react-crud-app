import React,{useState,useEffect} from 'react'
import API from '../API/APIS'
import { Button, Form } from "react-bootstrap";

const AddTodo = ({onAdd}) => {
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [todoId,setTodoId]=useState(null);
    const [todos,setTodos]=useState([]);
   
    useEffect(()=>{
        refreshTodo();
    },[]);

    const refreshTodo = ()=>{
        API.get('/')
        .then((res)=>{
            setTodos(res.data);
        })
        .catch(console.error)
    }
    const onSubmit= (e)=>{
        e.preventDefault();
        let item = {title,description};
        API.post('/',item)
        .then(()=>refreshTodo());
    }
    const onUpdate=(id)=>{
        let item={title,description};
        API.patch(`/${id}/`,item)
        .then((res)=>
        refreshTodo());
    }
    const onDelete =(id)=>{
        API.delete(`/${id}/`)
        .then((res)=>
        refreshTodo());
    };
    function seleteTodo(id){
        let item = todos.filter((todo)=> todo.id ===id)[0];
        setTitle(item.title);
        setDescription(item.description);
        setTodoId(item.id)
    }

  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-md-4">
        <h3 className="float-left">Create a new Todo</h3>
        <Form onSubmit={onSubmit} className="mt-4">
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </Form.Group>

          <div className="float-right">
            <Button
              variant="primary"
              type="submit"
              className="mx-2"
              onClick={onSubmit}
            >
              Save
            </Button>
            <Button
              variant="primary"
              type="button"
              className="mx-2"
              onClick={()=>onUpdate(todoId)}
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
      <div className="col-md-8 m">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Todo Title</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
              {todos.map((todo,index)=>{
                  
                return(
                    <tr key="">{todo.id}
                  <th scope="row">{todo.title}</th>
                  <td>{todo.description} </td>
                 
                  <td>
                    <i
                      className="fa fa-pencil-square text-primary d-inline"
                      aria-hidden="true"
                      onClick={()=>seleteTodo(todo.id)}
                    >Update</i>
                    <i
                      className="fa fa-trash-o text-danger d-inline mx-3"
                      aria-hidden="true"
                      onClick={()=>onDelete(todo.id)}
                    >Delete</i>
                  </td>
                </tr>
                )
              })}
                
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default AddTodo