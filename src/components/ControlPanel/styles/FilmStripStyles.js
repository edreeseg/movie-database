import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: '25%',
    height: '100%',
    background: '#373737',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up(424)]: {
      height: '20%',
      width: '100%',
      flexDirection: 'row',
    },
    [theme.breakpoints.up(710)]: {
      height: '100%',
      width: '25%',
      flexDirection: 'column',
    },
  },
  controlPanelToggle: props => ({
    position: 'absolute',
    width: '75px',
    height: '100px',
    right: '0',
    background: '#373737',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up(310)]: {
      width: '25vw',
      height: '100%',
      maxWidth: '75px',
      maxHeight: '20%',
    },
    [theme.breakpoints.up(424)]: {
      position: 'static',
    },
    [theme.breakpoints.up(710)]: {
      position: 'absolute',
      left: 'calc(100% + ((100vw - 100%) / 2) - 3%)',
      transform: 'translateX(-100%)',
      maxHeight: 'none',
      height: '100px',
    },
  }),
  inner: {
    height: '75%',
    width: '94%',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    '& svg': {
      fontSize: '20vw',
      [theme.breakpoints.up(235)]: {
        fontSize: '40px',
      },
    },
    '& h4': {
      fontSize: '5.3vw',
      margin: '0',
      [theme.breakpoints.up(235)]: {
        fontSize: '13px',
      },
    },
    [theme.breakpoints.up(424)]: {
      height: '94%',
      width: '75%',
    },
    [theme.breakpoints.up(710)]: {
      height: '75%',
      width: '94%',
    },
  },
  toggleInner: {
    height: '90%',
    width: '75%',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      background: '#e5e5e5',
    },
    '&:active': {
      background: 'rgb(208, 208, 208)',
    },
    '& svg': {
      fontSize: '40px',
    },
    '& h4': {
      fontSize: '13px',
      margin: '0',
    },
  },
  border: {
    width: '90%',
    height: '12.5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up(424)]: {
      width: '12.5%',
      height: '90%',
      flexDirection: 'column',
    },
    [theme.breakpoints.up(710)]: {
      width: '90%',
      height: '12.5%',
      flexDirection: 'row',
    },
  },
  toggleBorder: {
    width: '12.5%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleBorderInner: {
    height: '7%',
    width: '40%',
    background: 'white',
  },
  borderInner: {
    height: '40%',
    width: '7%',
    background: 'white',
    [theme.breakpoints.up(424)]: {
      height: '7%',
      width: '40%',
    },
    [theme.breakpoints.up(710)]: {
      height: '40%',
      width: '7%',
    },
  },
}));
