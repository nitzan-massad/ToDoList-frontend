import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import './ToDoList.css'

const ToDoList = props => {
  const data = {
    listTitle: props.listData?.listTitle,
    listColor: props.listData?.color,
    listId: props.listData?.id,
    items: props?.listData?.items
  }

  /* return (
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
        <div style={{ flexDirection: 'row' }} className='flexbox-container'>
          {props.listData.items.map(item => (
            <li key={item.itemId} className='horizontal-list '>
              <ItemInList item={item} />
            </li>
          ))}
        </div>
      </div>
    </Link>
  )
*/
  return (
    <Link
      to={{
        pathname: '/showList',
        state: { data }
      }}
      style={{ textDecoration: 'none' }}
      className='to-to-list__link'
    >
      <Card
        variant='outlined'
        sx={{ minWidth: 275, maxWidth: '88%', height: 150, marginBottom: '3%' }}
        style={{ backgroundColor: props.listData.color }}
      >
        <CardContent>
          <Typography variant='h5' component='div'>
            {props.listData?.listTitle}
          </Typography>
          {props.listData.items.map(item => (
            <Typography variant='body2'>{item.itemTitle}</Typography>
          ))}
        </CardContent>
      </Card>
    </Link>
  )
}

export default ToDoList
