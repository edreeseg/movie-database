import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '600px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0',
    paddingTop: '15px',
    [theme.breakpoints.up(495)]: {
      width: '50%',
      paddingLeft: '5%',
      paddingBottom: '0',
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px 10px',
    margin: '15px 5px',
    border: '2px solid #09afdf',
    [theme.breakpoints.up(710)]: {
      margin: '15px 5%',
    },
    '&:last-child': {
      flexGrow: '0',
    },
  },
}));
