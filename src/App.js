import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Alert from './Todoslist/Alert';
import List from './Todoslist/List';
//  ham lay du lieu tu localstorage
const getLocalstorage = () => {
  let list = localStorage.getItem("list")
  if ((list)){
    return JSON.parse(localStorage.getItem("list"))
  }
  else{
    return []
  }
}
function App() {
  const [name,setName] = useState("")
  
  const [list, setList] = useState(getLocalstorage())
  const [isedit, setEdit] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert,setElert] = useState({show: false, msg: "", type: ""})
  const handelSubmit = (e) =>{
    e.preventDefault()
    if(!name){
        showAlert(true, "danger" ,"PLEASE ENTER VALUE")
    }else if (name && isedit){
     setList(list.map(item =>{
    
       if (item.id === editID){
            return {...item, title: name}
       }
       return item
     }))
      setName("")
      setEditID(null)
      setEdit(false)
      showAlert(true, "success" ,"EDIT SUCCESS!")
    }else{
      showAlert (true, "success","ADD ITEM SUCCESS!")
      const newItem = {id : Math.floor(Math.random() * 10000), title:name}
      setList([...list, newItem])
      setName("")
    } 
  }

  const showAlert = (show = false,type = "", msg="") =>{
    setElert ({show,type,msg})
    
  }
  const removeAll = () =>{
    setList([])
  }
  const deletedItem = (id) =>{
    showAlert (true, "danger","removed item")
   setList(list.filter( item => item.id !== id )) 
  
  }
  // hàm thực hiện edit giá trị
  const editItem = (id) =>{
    const specificItem = list.find(item => item.id === id);
    setEdit(true)
    setEditID(id);
    setName(specificItem.title)
  }
  // hàm thực hiện lưu vào localStorage
  useEffect(() =>{
    localStorage.setItem("list", JSON.stringify(list))
  },[list])
  return (
    <div className="App">
    <div className="container">
      <div className="header">WELLOME TODOS-LIST</div>
     
      <div className="content">
      <form  className="form" onSubmit={handelSubmit}>
     {alert.show &&  <Alert {...alert} removeAlert = {showAlert} list ={list}/>}
      <div className="form-input">
        <input className='input' type="text" value={name}
        onChange={(e) => setName(e.target.value)}
       />
        <button  className='submit'
        >
          {isedit ? "edit" : "submit"}
        </button>
      </div>
      </form>
      <div className="list-container">
        <List items ={list} deletedItem = {deletedItem} editItem ={editItem}/>
      </div>
      <button className="clear-item" onClick={removeAll}>clear-item</button>
      </div>
    </div>
    </div>
  );
}

export default App;
