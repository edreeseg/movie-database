import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '75px',
    display: 'flex',
    flexDirection: 'row',
    position: 'static',
    top: '100%',
    right: '0',
    margin: '0 auto',
    order: '-1',
    [theme.breakpoints.up(424)]: {
      position: 'absolute',
      transform: 'translateY(-80%)',
      width: '75px',
      height: '130%',
      flexDirection: 'column',
    },
    [theme.breakpoints.up(710)]: {
      position: 'static',
      transform: 'translateY(0%)',
      width: '480px',
      height: '90px',
      flexDirection: 'row',
    },
  },
}));
