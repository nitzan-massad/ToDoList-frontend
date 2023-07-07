import React from 'react'
import { Link } from 'react-router-dom'

import ItemInList from '../ItemInList/ItemInList'
import './ToDoList.css'

const ToDoList = props => {
 const data = { listTitle: props.listData?.listTitle , listColor: props.listData?.color , listId:props.listData?.id, items:props?.listData?.items};

  return (
    <Link
      to={{
        pathname: '/showList',
        state: { data }
      }}
      style={{ textDecoration: 'none' }}
      className='to-to-list__link'
    >
      <div
        style={{ backgroundColor: props.listData.color }}
        className='toDoListBorder'
      >
        <h3>{JSON.stringify(props.listData?.listTitle)}</h3>
        <div className='flexbox-container'>
          {props.listData.items.map(item => (
            <li key={item.itemId} className='horizontal-list '>
              <ItemInList item={item} />
            </li>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ToDoList
