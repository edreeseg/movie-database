import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import useResizeAware from 'react-resize-aware';
import {
  controlPanelStyles,
  labelStyles,
  buttonStyles,
} from './styles/ControlPanelStyles';
import RatingSelect from './RatingSelect';
import GenreSelect from './GenreSelect';
import SortSelect from './SortSelect';
import SortOrder from '../SortOrder';
import { ratings, genres } from './panelSetup';

function ControlPanel({
  controlPanelOpen,
  setControlPanelOpen,
  setControlPanelHeight,
  sortValue,
  setSortValue,
  orderIsDescending,
  setOrderIsDescending,
  checkedRatings,
  setCheckedRatings,
  checkedGenres,
  setCheckedGenres,
  searchQuery,
  setSearchQuery,
  handleSearchFormSubmit,
}) {
  // Make use `react-resize-aware` library for the sake of having an exact pixel value
  // of the height of the control panel, to ensure accurate transformation.
  const [resizeListener, sizes] = useResizeAware();
  useEffect(() => {
    // If the height ever changes, update state.
    setControlPanelHeight(sizes.height);
  }, [sizes.height, setControlPanelHeight]);
  const classes = controlPanelStyles();
  const labelClasses = labelStyles();
  const buttonClasses = buttonStyles();
  return (
    <Container
      className={`${classes.root} ${
        controlPanelOpen ? classes.open : classes.closed
      }`}
    >
      {resizeListener}
      <FormControl
        component="form"
        className={classes.form}
        onSubmit={handleSearchFormSubmit}
      >
        <Container className={classes.queryContainer}>
          <InputLabel classes={labelClasses}>
            Search EEGDB
            <Input
              type="text"
              className={classes.queryInput}
              variant="outlined"
              value={searchQuery}
              onChange={ev => setSearchQuery(ev.target.value)}
            />
          </InputLabel>
        </Container>
        <Container className={classes.checkboxContainer}>
          <RatingSelect
            setCheckedRatings={setCheckedRatings}
            checkedRatings={checkedRatings}
            ratings={ratings}
          />
          <GenreSelect
            setCheckedGenres={setCheckedGenres}
            checkedGenres={checkedGenres}
            genres={genres}
          />
        </Container>
        <Button type="submit" classes={buttonClasses}>
          Search
        </Button>
      </FormControl>
      <SortSelect
        controlPanelOpen={controlPanelOpen}
        setControlPanelOpen={setControlPanelOpen}
        sortValue={sortValue}
        setSortValue={setSortValue}
        controlPanelHeight={sizes.height}
      />
      <SortOrder
        orderIsDescending={orderIsDescending}
        setOrderIsDescending={setOrderIsDescending}
      />
    </Container>
  );
}

ControlPanel.propTypes = {
  controlPanelOpen: PropTypes.bool,
  setControlPanelOpen: PropTypes.func,
  setControlPanelHeight: PropTypes.func,
  sortValue: PropTypes.string,
  setSortValue: PropTypes.func,
  orderIsDescending: PropTypes.bool,
  setOrderIsDescending: PropTypes.func,
  checkedRatings: PropTypes.instanceOf(Map),
  setCheckedRatings: PropTypes.func,
  checkedGenres: PropTypes.instanceOf(Map),
  setCheckedGenres: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  handleSearchFormSubmit: PropTypes.func,
};

export default ControlPanel;
