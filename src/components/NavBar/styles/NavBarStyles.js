import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  bar: {
    position: 'fixed',
    background: '#373737',
    height: '56px',
    zIndex: '2',
    overflow: 'hidden',
  },
  toolbar: {
    height: '100%',
    minHeight: '56px',
  },
  helpButton: {
    fontSize: '32px',
    color: '#09afdf',
    '&:hover': {
      color: '#3dcdf7',
    },
    '&:active': {
      color: '#216396',
    },
  },
}));
