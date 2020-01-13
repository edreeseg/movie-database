import { makeStyles } from '@material-ui/core/styles';

export const controlPanelStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0',
    top: '56px',
    borderBottom: '3px solid black',
    transition: 'transform .3s',
    padding: 0,
    paddingBottom: '10px',
    zIndex: '1',
    background: '#fafafa',
  },
  open: {
    transform: 'translateY(0)',
  },
  closed: {
    transform: 'translateY(-100%)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.up(424)]: {
      width: 'calc(100% - 75px)',
    },
    [theme.breakpoints.up(710)]: {
      width: '100%',
    },
  },
  queryContainer: {
    height: '75px',
    [theme.breakpoints.up(710)]: {
      marginLeft: '10%',
      width: '90%',
    },
  },
  queryInput: {
    marginLeft: '5%',
    [theme.breakpoints.up(710)]: {
      marginLeft: '20px',
    },
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up(476)]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.up(950)]: {
      width: '80%',
    },
  },
}));

export const labelStyles = makeStyles(theme => ({
  root: {
    position: 'static',
  },
  shrink: {
    transform: 'translate(-5px, 18px) scale(0.95)',
    transformOrigin: 'top left',
  },
}));

export const buttonStyles = makeStyles(theme => ({
  root: {
    margin: '15px 0',
    background: '#373737',
    color: '#f6f6f6',
    '&:hover': {
      backgroundColor: '#373737',
    },
    [theme.breakpoints.up(710)]: {
      margin: '15px auto',
      width: '25%',
    },
  },
}));
