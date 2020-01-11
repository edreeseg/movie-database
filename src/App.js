import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from './redux/actions';
import {
  NavBar,
  ControlPanel,
  MovieList,
  PageSelect,
  AddMovie,
  Error,
} from './components';
import './App.css';

const listContainerStyles = makeStyles(theme => ({
  root: props => ({
    transition: 'transform .3s',
    // Translate container down when control panel opens
    transform: `translateY(${
      props.controlPanelOpen ? props.controlPanelHeight : '0'
    }px)`,
    paddingTop: '70px',
  }),
}));

function App({ controlPanelOpen, controlPanelHeight, tabIndex, getMovies }) {
  useEffect(() => {
    getMovies();
  }, [getMovies]);
  const listContainerClasses = listContainerStyles({
    controlPanelOpen: controlPanelOpen,
    controlPanelHeight: controlPanelHeight,
  });
  return (
    <>
      <Error />
      <NavBar />
      <ControlPanel />
      <Container classes={listContainerClasses}>
        <div className="movie-icon-container">
          <div className="movie-night-icon" />
        </div>
        <PageSelect />
        {tabIndex ? <AddMovie /> : <MovieList />}
      </Container>
    </>
  );
}

App.propTypes = {
  controlPanelOpen: PropTypes.bool,
  controlPanelHeight: PropTypes.number,
  tabIndex: PropTypes.number,
  getMovies: PropTypes.func,
};

const mapStateToProps = state => ({
  controlPanelOpen: state.controlPanelOpen,
  controlPanelHeight: state.controlPanelHeight,
  tabIndex: state.tabIndex,
});

export default connect(mapStateToProps, { getMovies: actions.getMovies })(App);
