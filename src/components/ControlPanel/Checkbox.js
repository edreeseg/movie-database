import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '3vw',
    color: '#09afdf',
  },
}));

function ConstructCheckbox({ map, name, onChange, id }) {
  const classes = useStyles();
  return (
    <Checkbox
      classes={classes}
      checked={map.get(name)}
      name={name}
      onChange={onChange}
      id={id}
      color="default"
    />
  );
}

ConstructCheckbox.propTypes = {
  map: PropTypes.instanceOf(Map),
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
};

export default ConstructCheckbox;
