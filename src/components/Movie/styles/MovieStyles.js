import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    width: '90%',
    '& h2': {
      transition: 'font-size .3s',
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
    display: 'flex',
    flexDirection: 'column',
    '& table': {
      marginTop: '15px',
      textAlign: 'left',
      [theme.breakpoints.down(750)]: {
        display: 'flex',
        flexDirection: 'row',
        '& thead': {
          marginRight: '10%',
        },
        '& tr': {
          display: 'flex',
          flexDirection: 'column',
        },
        '& th': {
          display: 'flex',
          alignItems: 'center',
        },
        '& td': {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
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
    [theme.breakpoints.up(320)]: {
      position: 'absolute',
      top: '0',
      right: '10px',
      width: '100px',
    },
    [theme.breakpoints.up(500)]: {
      width: '150px',
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
