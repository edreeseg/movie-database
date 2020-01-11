import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useStyles } from './styles/FilmStripStyles';
import * as actions from '../../redux/actions';

function FilmStrip({
  toggle,
  name,
  children,
  sortBy,
  setSortBy,
  controlPanelToggle,
}) {
  // This is a decorative component, intended to be used as a container for
  // icons related to the sorting of movies and opening of menu.
  const classes = useStyles();
  return (
    // `toggle` prop is used to indicate that the film strip is being used to open and
    // close the control panel, and must be treated differently.
    <div
      className={toggle ? classes.controlPanelToggle : classes.root}
      onClick={toggle ? controlPanelToggle : () => setSortBy(name)}
    >
      <div className={toggle ? classes.toggleBorder : classes.border}>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
      </div>
      <div
        className={toggle ? classes.toggleInner : classes.inner}
        style={sortBy === name ? { background: '#d0d0d0' } : null}
      >
        {children}
      </div>
      <div className={toggle ? classes.toggleBorder : classes.border}>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
        <div
          className={toggle ? classes.toggleBorderInner : classes.borderInner}
        ></div>
      </div>
    </div>
  );
}

FilmStrip.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  toggle: PropTypes.bool,
  name: PropTypes.string,
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func,
  controlPanelToggle: PropTypes.func,
};

const mapStateToProps = state => ({
  sortBy: state.sortBy,
});

export default connect(mapStateToProps, {
  setSortBy: actions.setSortBy,
  controlPanelToggle: actions.controlPanelToggle,
})(FilmStrip);
