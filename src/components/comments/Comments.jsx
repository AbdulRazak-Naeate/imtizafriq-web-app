import * as React from 'react';
import InputUnstyled from '@mui/core/InputUnstyled';
import { styled } from '@mui/system';
import {Button,Typography} from '@mui/material';
import {PersonOutline} from '@material-ui/icons';
import useStyles from './styles'
const blue = {
    200: '#80BFFF',
    400: '#3399FF',
  };
  
  const white = {
      200: '#FFF',
      400: '#FFFEE',
    };
  const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
  };
  
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    width: 100%;
    height:35px;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    border-radius: 10px;
    padding: 12px 12px;
    transition: all 150ms ease;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? null : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    }
  
    &:focus {
      outline: 2px solid ${theme.palette.mode === 'dark' ? white[400] : white[200]};
    }
  `,
  );
  
  const CustomInput = React.forwardRef(function CustomInput(props, ref) {
    return (
      <InputUnstyled  components={{ Input: StyledInputElement }} {...props} ref={ref} onChange={(e)=>{props.handlesearchProduct(e.target.value)}}/>
    );
  });
  
const Comments = () => {
   const classes=useStyles();
   const [comments,setComments]=React.useState([{user:'Munin',text:'  Its a  nice product i like it  and also recommend it to everyone ',date:'2020/06/04 12:00'},{user:'Abdul',text:'  Its a  nice product i like it  and also recommend it to everyone ',date:'2020/07/04 12:00'},{user:'Hassan',text:'  Its good I like it',date:'2020/01/04 07:23'}]);
  return (
    <div className={classes.root}>
        <div className={classes.commentList}>
         {
           comments.map((comment,index)=>{
             return(
              <div className={classes.commentItem} key={index}>
              <div className={classes.commentsItemPrimary}>
              <div className={classes.userContainer}>
                   <PersonOutline/>
                   <Typography variant='body2'>{comment.user}</Typography>
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
           })
         }
        </div>
        <div className={classes.inputactions}>
        <CustomInput className={classes.textinput} aria-label="comment input" placeholder="type in to review product"  />
        <Button   size='small' color='primary' variant='text'>send</Button>
        </div>
      </div>
  )
}

export default Comments
