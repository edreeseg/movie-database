import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '70px',
  },
}));

const submitButtonStyles = makeStyles(theme => ({
  root: {
    background: '#373737',
    color: '#f6f6f6',
    '&:hover': {
      backgroundColor: '#373737',
    },
  },
}));

function AddMovie(props) {
  console.log(props);
  // Keep track of the form keys to maintain controlled components
  const [formInput, setFormInput] = useState({
    title: '',
    genre: '',
    year: '',
    run_time: { hours: 0, minutes: 0, seconds: 0 },
    rating: '',
  });
  // Handle keeping track of the main actors separately - essentially treated as a
  // different form entirely that will be added later
  const [mainActorInput, setMainActorInput] = useState('');
  const [mainActorList, setMainActorList] = useState([]);
  const classes = useStyles();
  const submitButtonClasses = submitButtonStyles();
  const handleChange = key => ev => {
    // Handle standard form changes
    ev.persist();
    setFormInput(prev => {
      return { ...prev, [key]: ev.target.value };
    });
  };
  const handleChangeTime = key => ev => {
    // Handle changing the runtime entries - going one step deeper
    ev.persist();
    setFormInput(prev => {
      return {
        ...prev,
        run_time: { ...prev.run_time, [key]: ev.target.value },
      };
    });
  };
  const handleActorChange = ev => {
    // Keep a controlled input for the main actors input
    ev.persist();
    setMainActorInput(ev.target.value);
  };
  const handleAddActor = ev => {
    // Add actor to the array, so as to send it alongside other information later
    const actor = mainActorInput;
    if (!actor) return;
    setMainActorList(prev => [...prev, actor]);
    setMainActorInput('');
  };
  const handleAddMovie = ev => {
    // Call function passed from App.
    ev.preventDefault();
    props.addMovie({ ...formInput, main_actors: mainActorList });
  };
  return (
    <FormControl component="form" classes={classes} onSubmit={handleAddMovie}>
      <TextField
        variant="outlined"
        label="Title"
        value={formInput.title}
        onChange={handleChange('title')}
      />
      <TextField
        type="number"
        variant="outlined"
        label="Year of Release"
        value={formInput.year}
        onChange={handleChange('year')}
      />
      <TextField
        select={true}
        label="Genre"
        value={formInput.genre}
        onChange={handleChange('genre')}
      >
        <MenuItem value="Action">Action</MenuItem>
        <MenuItem value="Comedy">Comedy</MenuItem>
        <MenuItem value="Drama">Drama</MenuItem>
        <MenuItem value="Fantasy">Fantasy</MenuItem>
        <MenuItem value="Horror">Horror</MenuItem>
        <MenuItem value="Musical">Musical</MenuItem>
        <MenuItem value="Romance">Romance</MenuItem>
      </TextField>
      <TextField
        select={true}
        label="Rating"
        value={formInput.rating}
        onChange={handleChange('rating')}
      >
        <MenuItem value="G">G</MenuItem>
        <MenuItem value="PG">PG</MenuItem>
        <MenuItem value="PG-13">PG-13</MenuItem>
        <MenuItem value="R">R</MenuItem>
        <MenuItem value="NC-17">NC-17</MenuItem>
      </TextField>
      <Typography variant="overline" className="headings">
        Runtime
      </Typography>
      <div className="flex">
        <TextField
          type="number"
          label="Hours"
          value={formInput.run_time.hours}
          onChange={handleChangeTime('hours')}
        />
        <TextField
          type="number"
          label="Minutes"
          value={formInput.run_time.minutes}
          onChange={handleChangeTime('minutes')}
        />
        <TextField
          type="number"
          label="Seconds"
          value={formInput.run_time.seconds}
          onChange={handleChangeTime('seconds')}
        />
      </div>
      <div className="form-div">
        <Typography variant="overline" className="headings">
          Main Actors
        </Typography>
        <div className="flex-centered">
          <TextField
            type="text"
            label="Enter an Actor"
            value={mainActorInput}
            onChange={handleActorChange}
          />
          {/*
          Button to add actors disabled after the third is added.
          */}
          <Button
            variant="contained"
            onClick={handleAddActor}
            disabled={mainActorList.length >= 3}
            size="small"
          >
            Add Actor
          </Button>
        </div>
        <div>
          <Typography variant="overline" className="headings">
            Actors (Click to Remove)
          </Typography>
          <p style={{ height: '15px' }}>
            {/* Map through the actors and display them to the user, creating span
              elements that can be clicked on to remove an entry already added.
            */}
            {mainActorList.map((actor, index, arr) => (
              <span
                key={`${actor}-${index}`}
                className="actor-text"
                onClick={() =>
                  setMainActorList(prev => prev.filter(item => item !== actor))
                }
              >
                {actor}
                {index === arr.length - 1 ? null : ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
      <Button type="submit" variant="contained" classes={submitButtonClasses}>
        Add Movie
      </Button>
    </FormControl>
  );
}

AddMovie.propTypes = {
  addMovie: PropTypes.func,
};

export default AddMovie;
