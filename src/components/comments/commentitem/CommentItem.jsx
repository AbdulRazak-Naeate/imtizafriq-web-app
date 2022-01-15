import React from 'react'
import {Button,Typography} from '@mui/material';
import {PersonOutline} from '@material-ui/icons';
import useStyles from './styles';
const CommentItem = ({comment}) => {
  const classes =useStyles();
  return (
    <div className={classes.commentItem}>
    <div className={classes.commentsItemPrimary}>
    <div className={classes.userContainer}>
         <PersonOutline/>
         <Typography variant='body2'>{comment.username}</Typography>
     </div>
    <Typography className={classes.text} variant='body2'>
      {comment.text}
    </Typography>
    </div>
   <div className={classes.commentsItemSecondary}>
   <Typography variant='body2' style={{fontSize:'10px',color:'darkgray'}}>{comment.date}</Typography>
   </div>
 </div>
  )
}

export default CommentItem