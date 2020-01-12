import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles/PageSelectStyles';
import { FaFastForward, FaFastBackward } from 'react-icons/fa';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import * as actions from '../../redux/actions';
import './styles/PageSelect.css';

function PageSelect({
  pageNumber,
  movies,
  tabIndex,
  changePageByOne,
  sendPageToEnd,
}) {
  // Component to handle changing page while viewing movie list
  const classes = useStyles();
  const changeByOne = forward => {
    // Handle incrementing or decrementing by 1
    changePageByOne(forward);
  };
  const goToEnd = forward => {
    // Handle jumping to the beginning or end of the list
    sendPageToEnd(forward);
  };
  const pageTotal = Math.ceil(movies.length / 10) || 1;
  return (
    <Paper
      elevation={4}
      classes={classes}
      style={tabIndex ? { display: 'none' } : null}
    >
      <button onClick={() => goToEnd(false)} disabled={pageNumber === 1}>
        <FaFastBackward />
      </button>
      <button onClick={() => changeByOne(false)} disabled={pageNumber === 1}>
        <MdArrowBack />
      </button>
      <div id="page-display">
        <span>
          {pageNumber} of {pageTotal}
        </span>
      </div>
      <button
        onClick={() => changeByOne(true)}
        disabled={pageNumber === pageTotal}
      >
        <MdArrowForward />
      </button>
      <button onClick={() => goToEnd(true)} disabled={pageNumber === pageTotal}>
        <FaFastForward />
      </button>
    </Paper>
  );
}

PageSelect.propTypes = {
  pageNumber: PropTypes.number,
  movies: PropTypes.array,
  taxIndex: PropTypes.number,
  changePageByOne: PropTypes.func,
  sendPageToEnd: PropTypes.func,
};

const mapStateToProps = state => ({
  pageNumber: state.pageNumber,
  movies: state.movies,
  tabIndex: state.tabIndex,
});

export default connect(mapStateToProps, {
  changePageByOne: actions.changePageByOne,
  sendPageToEnd: actions.sendPageToEnd,
})(PageSelect);
