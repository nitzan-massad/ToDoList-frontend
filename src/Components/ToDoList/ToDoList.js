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
    >
      <Card
        variant='outlined'
        sx={{ minWidth: 275, maxWidth: '88%', height: 150, marginBottom: '3%' }}
        className='list-card-style'
        style={{ backgroundColor: props.listData.color }}
      >
        <CardContent>
          <Typography variant='h5' component='div'>
            {props.listData?.listTitle}
          </Typography>
          {props.listData.items.map(item =>
            item.isDone ? (
              <Typography variant='body2'>
                <strike>{item.itemTitle}</strike>
              </Typography>
            ) : (
              <Typography variant='body2'>{item.itemTitle}</Typography>
            )
          )}
        </CardContent>
        {props.contributorOnIcon ? (
          <Tooltip title='You have been asked to contribut on this list'>
            <EmojiPeopleIcon className='contributor-on-icon' />
          </Tooltip>
        ) : null}
      </Card>
    </Link>
  )
}

export default ToDoList
