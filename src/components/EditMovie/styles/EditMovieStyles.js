import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    overflowY: 'scroll',
  },
  paper: {
    margin: '50px auto',
    background: '#fafafa',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 3%',

    '& form': {
      '& div': {
        marginBottom: '10px',
      },
    },
    [theme.breakpoints.up(710)]: {
      width: '60vw',
    },
  },
  button: {
    background: '#373737',
    color: '#fafafa',
    marginTop: '50px',
    '&:hover': {
      background: '#373737',
    },
  },
}));

export const submitButtonStyles = makeStyles(theme => ({
  root: {
    background: '#373737',
    color: '#f6f6f6',
    '&:hover': {
      backgroundColor: '#373737',
    },
  },
}));
