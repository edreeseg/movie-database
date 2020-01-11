import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '& span': {
      color: '#09afdf',
    },
  },
  switchBase: {
    padding: 2,
    color: '#09afdf',
    '&$checked': {
      transform: 'translateX(12px)',
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}));

export const useContainerStyles = makeStyles(theme => ({
  root: {
    order: '-1',
    alignSelf: 'center',
    [theme.breakpoints.up(424)]: {
      position: 'absolute',
      top: 0,
      right: '80px',
    },
    [theme.breakpoints.up(710)]: {
      position: 'static',
    },
  },
}));
