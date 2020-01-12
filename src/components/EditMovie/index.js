import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import BackDrop from '@material-ui/core/BackDrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useStyles, submitButtonStyles } from './styles/EditMovieStyles';
import Loading from '../Loading';
import * as actions from '../../redux/actions';

function EditMovie({ data, editing, loading, closeEditForm, editMovie }) {
  const {
    movie_id,
    title,
    year,
    genre,
    rating,
    run_time: run_time_seconds,
    main_actors,
  } = editing;
  const run_time = calculateRunTime(run_time_seconds);
  const [formInput, setFormInput] = useState({
    title,
    genre,
    year,
    run_time,
    rating,
  });
  // Handle keeping track of the main actors separately - essentially treated as a
  // different form entirely that will be added later
  const [mainActorInput, setMainActorInput] = useState('');
  const [mainActorList, setMainActorList] = useState(main_actors || []);
  const classes = useStyles();
  const submitButtonClasses = submitButtonStyles();
  function calculateRunTime(n) {
    let sum = n;
    const hours = Math.floor(sum / 3600);
    sum -= hours * 3600;
    const minutes = Math.floor(sum / 60);
    sum -= minutes * 60;
    const seconds = sum;
    return { hours, minutes, seconds };
  }
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
  const handleEditMovie = ev => {
    ev.preventDefault();
    editMovie({ ...formInput, movie_id, main_actors: mainActorList });
  };
  function handleClose(ev, reason) {
    closeEditForm();
  }
  return (
    <Modal
      className={classes.root}
      open={editing && editing.movie_id === data.movie_id}
      closeAfterTransition
      BackdropComponent={BackDrop}
      BackdropProps={{ timeout: 500 }}
      onClose={handleClose}
    >
      <Fade in={Boolean(editing)}>
        <Paper elevation={2} component="section" className={classes.paper}>
          {loading ? (
            <Loading />
          ) : (
            <FormControl component="form" onSubmit={handleEditMovie}>
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
                select
                label="Genre"
                value={formInput.genre}
                onChange={handleChange('genre')}
                SelectProps={{ native: true }}
              >
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="fantasy">Fantasy</option>
                <option value="horror">Horror</option>
                <option value="musical">Musical</option>
                <option value="romance">Romance</option>
              </TextField>
              <TextField
                select
                label="Rating"
                value={formInput.rating}
                SelectProps={{ native: true }}
                onChange={handleChange('rating')}
              >
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
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
                          setMainActorList(prev =>
                            prev.filter(item => item !== actor)
                          )
                        }
                      >
                        {actor}
                        {index === arr.length - 1 ? null : ', '}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                variant="contained"
                classes={submitButtonClasses}
              >
                Edit Movie
              </Button>
            </FormControl>
          )}
        </Paper>
      </Fade>
    </Modal>
  );
}

EditMovie.propTypes = {
  data: PropTypes.shape({
    movie_id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    genre: PropTypes.string,
    rating: PropTypes.string,
    run_time: PropTypes.number,
    main_actors: PropTypes.array,
  }),
  editing: PropTypes.shape({
    movie_id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    genre: PropTypes.string,
    rating: PropTypes.string,
    run_time: PropTypes.number,
    main_actors: PropTypes.array,
  }),
  editMovie: PropTypes.func,
  closeEditForm: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  editing: state.editing,
  loading: state.loading,
});

export default connect(mapStateToProps, {
  editMovie: actions.editMovie,
  closeEditForm: actions.closeEditForm,
})(EditMovie);
