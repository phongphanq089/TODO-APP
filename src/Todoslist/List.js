import React from "react";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

function List({ items ,deletedItem,editItem}) {
     return (
          <div className="list-item">
               {items.map(item => {
                   
                    const { id, title } = item
                    return (
                         <div className="list" key={id}>
                              <ul>
                                   <li>{title}</li>
                              </ul>
                              <div className="icon">
                                   <button className="edit" onClick={() => editItem(id)}><AiFillEdit/></button>
                                   <button className="deleted" onClick={() =>deletedItem(id)} ><AiFillDelete/></button>
                              </div>
                         </div>
                    )
               })}
          </div>
     )
}
export default List