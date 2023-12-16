import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { sortItems } from '../../shared/hooks/ItemView-hook'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import Tooltip from '@mui/material/Tooltip'

import './ToDoList.css'

const ToDoList = props => {
  const data = {
    listTitle: props.listData?.listTitle,
    listColor: props.listData?.color,
    listId: props.listData?.id,
    items: props?.listData?.items
  }

  props.listData.items.sort(sortItems)
  return (
    <Link
      to={{
        pathname: '/showList',
        state: { data }
      }}
      style={{ textDecoration: 'none' }}
      className='to-to-list__link'
      key={data.listId}
    >
      <Card
        variant='outlined'
        sx={{ minWidth: 275, maxWidth: '88%', height: 150, marginBottom: '3%' }}
        className='list-card-style'
        style={{ backgroundColor: props.listData.color }}
        key={data.listId}
      >
        <CardContent key={data.listId}>
          <Typography variant='h5' component='div' key={data.listId}>
            {props.listData?.listTitle}
          </Typography>
          {props.listData.items.map((item,index) =>
            item.isDone ? (
              <Typography variant='body2' key={index}>
                <strike>{item.itemTitle}</strike>
              </Typography>
            ) : (
              <Typography variant='body2' key={index}>{item.itemTitle}</Typography>
            )
          )}
        </CardContent>
        {props.contributorOnIcon ? (
          <Tooltip title='You have been asked to contribut on this list' key={data.listId}>
            <EmojiPeopleIcon className='contributor-on-icon' key={data.listId}/>
          </Tooltip>
        ) : null}
      </Card>
    </Link>
  )
}

export default ToDoList
