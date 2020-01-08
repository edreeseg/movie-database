import React from 'react';
import PropTypes from 'prop-types';
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

function SortSelect({
  sortValue,
  setSortValue,
  controlPanelOpen,
  setControlPanelOpen,
  controlPanelHeight,
}) {
  const classes = useStyles({ controlPanelHeight });
  const handleDrawer = ev => {
    // If the toggle FilmStrip is clicked, open control panel
    setControlPanelOpen(prev => !prev);
  };
  const handleSelection = value => {
    // Update which criteria user wishes to sort by, if any
    setSortValue(prev => (prev === value ? null : value));
  };
  return (
    <section className={classes.root}>
      {strips.map(info => {
        return (
          <FilmStrip
            key={info.text}
            selected={sortValue === info.text}
            onClick={() => handleSelection(info.text)}
            controlPanelHeight={controlPanelHeight}
          >
            <h4>{info.text}</h4>
            <info.icon />
          </FilmStrip>
        );
      })}
      {/* Because it is used to toggle the panel, this final FilmStrip will
      always be visible */}
      <FilmStrip
        toggle
        onClick={handleDrawer}
        controlPanelHeight={controlPanelHeight}
      >
        {controlPanelOpen ? <MdClose /> : <MdMenu />}
      </FilmStrip>
    </section>
  );
}

SortSelect.propTypes = {
  sortValue: PropTypes.string,
  setSortValue: PropTypes.func,
  controlPanelOpen: PropTypes.bool,
  setControlPanelOpen: PropTypes.func,
};

export default SortSelect;
