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
    justifyContent: 'space-between',
    width: '100px',
    position: 'absolute',
    bottom: '20px',
    right: '10px',
    transition: 'opacity .3s',
    '& svg': {
      fontSize: '30px',
      '&:hover': {
        cursor: 'pointer',
      },
      '&:active': {
        transform: 'translateY(1px)',
      },
    },
  },
}));
