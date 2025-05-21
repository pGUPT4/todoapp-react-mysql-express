'use client'

import { useEffect, useState } from 'react';
import './globals.css';
import axios from 'axios';

const App = () => {
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');


  const showList = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/show/list');
      setList(data);
    } catch (error) {
      console.log(error);
    }
  }

  // add todo
  const createList = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const add = await axios.post('http://localhost:5000/api/create/list', { firstName, lastName });
      if (add.status === 200) {
        setFirstName('');
        setLastName('');
        showList();
      }

    } catch (error) {
      console.log(error);
    }
  }

  // delete single todo
  const deleteTodo = async (id: any) => {

    try {
      const todoDelete = await axios.delete(`http://localhost:5000/delete/listItem/${id}`);
      if (todoDelete.status === 200) {
        showList();
      }

    } catch (error) {
      console.log(error);
    }
  }


  // populate single todo in the form
  const showSingleTodo = async(id : any) => {
    setEditMode(true);

    try {
      const { data } = await axios.get(`http://localhost:5000/api/listItem/${id}`);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setUserId(data.id);

    } catch (error) {
      console.log(error);
    }
  }

  //edit todo
  const editTodo = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    try {
      const edit = await axios.put(`http://localhost:5000/api/update/listItem/${userId}`, { firstName, lastName });

      if (edit.status === 200) {
        setEditMode(false);
        setFirstName('');
        setLastName('');
        showList();
      }
    } catch (error) {
      console.log(error)
    }

  }



  useEffect(() => {
    showList();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <div className="form pt-[50px] pb-[50px]">
          <form 
            onSubmit={
                editMode ? editTodo : createList
                }>
            <div className="form-wrapper flex justify-between">
              <div className="flex-1 mr-[10px]">
                <input 
                  onChange={(e) => setFirstName(e.target.value)} 
                  value={firstName} 
                  className="form-control" 
                  type="text" 
                  placeholder="first name" 
                  name="firstName"/>
              </div>
              <div className="flex-1">
                <input 
                  onChange={(e) => setLastName(e.target.value)} 
                  value={lastName} 
                  className="form-control" 
                  type="text" 
                  placeholder="last name" 
                  name="lastName" />
              </div>
              {
                editMode ?
                  <button 
                    type='submit' 
                    className="btn btn-primary w-[200px] ml-[10px]">
                      Edit
                    </button>
                  :
                  <button 
                    type='submit' 
                    className="btn btn-success w-[200px] ml-[10px]">
                      + Add
                    </button>
              }
            </div>
          </form>
        </div>

        <table className="table w-full text-left border-collapse">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-2">#</th>
              <th scope="col" className="px-4 py-2">First name</th>
              <th scope="col" className="px-4 py-2">Last name</th>
              <th scope="col" className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              list && list.map(item => (
                <tr key={item.id} className="border-t">
                  <th scope="row" className="px-4 py-2 font-medium">{item.id}</th>
                  <td className="px-4 py-2">{item.firstName}</td>
                  <td className="px-4 py-2">{item.lastName}</td>
                  <td className="px-4 py-2">
                    <i 
                      onClick={() => showSingleTodo(item.id)} 
                      className="fa-solid fa-pen-to-square text-green-600 cursor-pointer mr-[25px]"
                    > Edit</i>
                    <i 
                      onClick={() => deleteTodo(item.id)} 
                      className="fa-solid fa-trash-can text-red-600 cursor-pointer"
                    > Delete</i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </>
  )
}

export default App