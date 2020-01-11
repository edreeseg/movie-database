import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import BackDrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    background: '#fafafa',
    width: '80vw',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h3': {
      marginTop: '100px',
    },
    [theme.breakpoints.up(710)]: {
      width: '60vw',
    },
  },
  button: {
    background: '#373737',
    color: '#fafafa',
    marginTop: '50px',
    '&:hover': {
      background: '#373737',
    },
  },
}));

function DisplayError({ error, clearError }) {
  const classes = useStyles();
  const handleClose = (ev, reason) => {
    clearError();
  };
  return (
    <Modal
      className={classes.root}
      open={Boolean(error)}
      closeAfterTransition
      BackdropComponent={BackDrop}
      BackdropProps={{ timeout: 500 }}
      onClose={handleClose}
    >
      <Fade in={Boolean(error)}>
        <Paper elevation={2} component="section" className={classes.paper}>
          <Typography variant="h3">Error</Typography>
          <Typography variant="subtitle2">{error}</Typography>
          <Button className={classes.button} onClick={handleClose}>
            Close
          </Button>
        </Paper>
      </Fade>
    </Modal>
  );
}

DisplayError.propTypes = {
  error: PropTypes.string,
  clearError: PropTypes.func,
};

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps, { clearError: actions.clearError })(
  DisplayError
);
