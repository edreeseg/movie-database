import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles/FilmStripStyles';

function FilmStrip({
  children,
  onClick,
  selected,
  toggle,
  controlPanelHeight,
}) {
  // This is a decorative component, intended to be used as a container for
  // icons related to the sorting of movies and opening of menu.
  const classes = useStyles({ controlPanelHeight });
  return (
    // `toggle` prop is used to indicate that the film strip is being used to open and
    // close the control panel, and must be treated differently.
    <div
      className={toggle ? classes.controlPanelToggle : classes.root}
      onClick={onClick ? onClick : null}
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
        style={selected ? { background: '#d0d0d0' } : null}
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
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  toggle: PropTypes.bool,
};

export default FilmStrip;
