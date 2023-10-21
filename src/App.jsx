import './App.css';
import toDoLogo from "./assets/images/logo.png";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { React, useEffect, useState } from 'react';

const setListItem = () => {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return [];
  }
}

function App() {

  const [inpVal, setInpVal] = useState('');
  const [listVal, setListVal] = useState(setListItem());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState('');

  const addItem = () => {
    if (inpVal == '') {
      alert("Input field in empty");
    } else if (inpVal && !toggleBtn) {
      setListVal(
        listVal.map((elm) => {
          if (elm.id === isEditItem) {
            return { ...elm, name: inpVal }
          }
          return elm;
        })
      )
      setInpVal('');
      setToggleBtn(true);
      setIsEditItem('');
    } else {
      const allInpData = { id: new Date().getTime().toString(), name: inpVal }
      setListVal([...listVal, allInpData]);
      setInpVal('');
      setToggleBtn(true);
    }
  }

  const rmListItem = (index) => {
    const newListItem = listVal.filter(
      (elm) => {
        if (elm.id !== index) {
          // console.log(elm.id);
          return elm
        }
      }
    )
    setListVal(newListItem);
  }

  const editList = (Id) => {
    const newEditItem = listVal.find(
      (elm) => {
        return Id === elm.id;
      }
    )
    // console.log(newEditItem);
    setInpVal(newEditItem.name);
    setToggleBtn(false);
    setIsEditItem(Id);
  }

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(listVal))
  }, [listVal])

  return (
    <>
      <div className="main">
        <div className="flex ai-c jc-c">
          <div className="logo">
            <img src={toDoLogo} alt="todo-logo" />
          </div>
          <h2>To-do List</h2>
        </div>
        <h4 className='text'>Add your list here ✌️</h4>
        <div className="input">
          <input
            type="text"
            placeholder='Add items ... ✍️'
            value={inpVal}
            onChange={(e) => { setInpVal(e.target.value) }}
          />
          {toggleBtn ? <BsFillPlusCircleFill className='plus-icon' onClick={addItem} /> : <GrEdit className='editable-icon' onClick={addItem} />}
        </div>
        <ul className="list">
          {/* <li className="list-items flex jc-sb ai-c">Apple <div><GrEdit className='edit-icon' /><AiOutlineDelete /></div></li> */}
          {
            listVal.map(
              (elm) => {
                return <li key={elm.id} className="list-items flex jc-sb ai-c">{elm.name} <div><GrEdit className='edit-icon' onClick={() => { editList(elm.id) }} /><AiOutlineDelete className='del-icon' onClick={() => { rmListItem(elm.id) }} /></div></li>
              }
            )
          }
        </ul>
        <button className="btn" onClick={() => { setListVal([]) }}><span className='span-1'>checklist</span><span className='span-2'>remove all</span></button>
      </div>
    </>
  )
}

export default App;