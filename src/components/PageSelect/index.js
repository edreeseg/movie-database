import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { FaFastForward, FaFastBackward } from 'react-icons/fa';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import './PageSelect.css';

const useStyles = makeStyles(theme => ({
  root: {
    height: '50px',
    width: '50%',
    display: 'flex',
    margin: '0 auto',

    '& button': {
      height: '100%',
      width: '15%',
      margin: '0',
      padding: '0',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'transparent',
      '& svg': {
        fontSize: '30px',
      },
    },
    '& div': {
      height: '100%',
      width: '15%',
      margin: '0',
      padding: '0',
      border: '1px solid black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& svg': {
        fontSize: '30px',
      },
    },
  },
}));

function PageSelect({ pageNumber, setPageNumber, pageTotal }) {
  // Component to handle changing page while viewing movie list
  const classes = useStyles();
  const changeByOne = forwards => {
    // Handle incrementing or decrementing by 1
    if (forwards) {
      if (pageNumber === pageTotal) return;
      return setPageNumber(prev => prev + 1);
    }
    if (pageNumber === 1) return;
    return setPageNumber(prev => prev - 1);
  };
  const goToEnd = forwards => {
    // Handle jumping to the beginning or end of the list
    if (forwards) {
      return setPageNumber(pageTotal);
    }
    return setPageNumber(1);
  };
  return (
    <Paper elevation={4} classes={classes}>
      <button onClick={() => goToEnd(false)}>
        <FaFastBackward />
      </button>
      <button onClick={() => changeByOne(false)}>
        <MdArrowBack />
      </button>
      <div id="page-display">
        <span>
          {pageNumber} of {pageTotal}
        </span>
      </div>
      <button onClick={() => changeByOne(true)}>
        <MdArrowForward />
      </button>
      <button onClick={() => goToEnd(true)}>
        <FaFastForward />
      </button>
    </Paper>
  );
}

PageSelect.propTypes = {
  pageNumber: PropTypes.number,
  setPageNumber: PropTypes.func,
  pageTotal: PropTypes.number,
};

export default PageSelect;
