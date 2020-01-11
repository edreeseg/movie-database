import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MdSortByAlpha,
  MdDateRange,
  MdWatchLater,
  MdChildCare,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import FilmStrip from './FilmStrip';
import { useStyles } from './styles/SortSelectStyles';

const strips = [
  {
    text: 'A-Z',
    icon: MdSortByAlpha,
  },
  {
    text: 'Year',
    icon: MdDateRange,
  },
  {
    text: 'Runtime',
    icon: MdWatchLater,
  },
  {
    text: 'Rating',
    icon: MdChildCare,
  },
];

function SortSelect({ controlPanelOpen }) {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      {strips.map(info => {
        return (
          <FilmStrip key={info.text} name={info.text}>
            <h4>{info.text}</h4>
            <info.icon />
          </FilmStrip>
        );
      })}
      {/* Because it is used to toggle the panel, this final FilmStrip will
      always be visible */}
      <FilmStrip toggle>
        {controlPanelOpen ? <MdClose /> : <MdMenu />}
      </FilmStrip>
    </section>
  );
}

SortSelect.propTypes = {
  controlPanelOpen: PropTypes.bool,
};

const mapStateToProps = state => ({
  controlPanelOpen: state.controlPanelOpen,
});

export default connect(mapStateToProps)(SortSelect);
