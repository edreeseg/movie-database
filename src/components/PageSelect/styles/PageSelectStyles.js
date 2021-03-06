import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '50px',
    width: '98%',
    maxWidth: '700px',
    display: 'flex',
    margin: '0 auto',

    '& button': {
      height: '100%',
      width: '15%',
      margin: '0',
      padding: '5px',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f2f2f2',
      '&:hover': {
        cursor: 'pointer',
        background: '#e5e5e5',
      },
      '&:active': {
        background: 'rgb(208, 208, 208)',
      },
      '&:focus': {
        outline: 0,
      },
      '&:disabled': {
        background: '#f2f2f2',
      },
      '& svg': {
        fontSize: '30px',
      },
    },
    '& div': {
      height: '100%',
      width: '15%',
      margin: '0',
      padding: '0',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& svg': {
        fontSize: '30px',
      },
    },
  },
}));
