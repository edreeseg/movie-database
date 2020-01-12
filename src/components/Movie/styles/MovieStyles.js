import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    width: '90%',
    '& p': {
      textOverflow: 'ellipsis',
      whiteSpace: 'normal', // Set to `nowrap` to truncate string and keep title on one line
      overflow: 'hidden',
    },
  },
}));

export const usePanelDetailsStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    whiteSpace: 'normal',
  },
}));

export const useButtonContainerStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    transition: 'opacity .3s',
    width: '100%',
    marginTop: '20px',
    [theme.breakpoints.up(250)]: {
      position: 'absolute',
      bottom: '10px',
      right: '3%',
      width: '100px',
    },
    [theme.breakpoints.up(500)]: {
      width: '125px',
      bottom: '20px',
      right: '20px',
    },
    '& svg': {
      fontSize: '15vw',
      [theme.breakpoints.up(250)]: {
        fontSize: '30px',
      },
      [theme.breakpoints.up(500)]: {
        fontSize: '40px',
      },
      '&:hover': {
        cursor: 'pointer',
      },
      '&:active': {
        transform: 'translateY(1px)',
      },
    },
  },
}));
