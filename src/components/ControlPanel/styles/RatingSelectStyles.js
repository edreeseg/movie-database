import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    paddingBottom: '15px',
    borderBottom: '2px solid #373737',
    [theme.breakpoints.up(424)]: {
      width: '50%',
      borderRight: '1px solid #373737',
      borderBottom: '0',
      paddingBottom: '0',
      paddingRight: '5%',
    },
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 5%',
    padding: '5px 10px',
    border: '2px solid #3f51b5',
    [theme.breakpoints.up(710)]: {
      margin: '15px 10%',
    },
    '&:last-child': {
      flexGrow: '0',
    },
  },
}));
