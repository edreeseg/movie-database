import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import * as actions from '../../redux/actions';

function ControlPanel({
  controlPanelOpen,
  changeControlPanelHeight,
  searchMovies,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  // Make use `react-resize-aware` library for the sake of having an exact pixel value
  // of the height of the control panel, to ensure accurate transformation.
  const [resizeListener, sizes] = useResizeAware();
  useEffect(() => {
    // If the height ever changes, update state.
    changeControlPanelHeight(sizes.height);
  }, [sizes.height, changeControlPanelHeight]);
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
        onSubmit={() => searchMovies(searchQuery)}
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
          <RatingSelect />
          <GenreSelect />
        </Container>
        <Button type="submit" classes={buttonClasses}>
          Search
        </Button>
      </FormControl>
      <SortSelect />
      <SortOrder />
    </Container>
  );
}

ControlPanel.propTypes = {
  controlPanelOpen: PropTypes.bool,
  changeControlPanelHeight: PropTypes.func,
  searchMovies: PropTypes.func,
};

const mapStateToProps = state => ({
  controlPanelOpen: state.controlPanelOpen,
});

export default connect(mapStateToProps, {
  changeControlPanelHeight: actions.changeControlPanelHeight,
  searchMovies: actions.searchMovies,
})(ControlPanel);
