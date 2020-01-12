import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { MdExpandMore, MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import * as actions from '../../redux/actions';
import {
  useStyles,
  usePanelDetailsStyles,
  useButtonContainerStyles,
} from './styles/MovieStyles';
import { EditMovie } from '../';

function Movie({ data, editing, openEditForm, deleteMovie }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const classes = useStyles();
  const buttonContainerClasses = useButtonContainerStyles();
  const panelDetailsClasses = usePanelDetailsStyles();
  const handleChange = () => {
    setPanelOpen(prev => !prev);
  };
  function calculateRunTime(n) {
    let sum = n;
    const time = [];
    const hours = Math.floor(sum / 3600);
    time.push(hours);
    sum -= hours * 3600;
    const minutes = Math.floor(sum / 60);
    time.push(minutes);
    sum -= minutes * 60;
    const seconds = sum;
    time.push(seconds);
    for (let i = 0; i < time.length; i++) {
      if (String(time[i]).length === 1) {
        time[i] = '0' + time[i];
      }
    }
    return time.join(':');
  }
  return (
    <ExpansionPanel onChange={handleChange}>
      {editing ? <EditMovie data={data} /> : null}
      <ExpansionPanelSummary
        expandIcon={<MdExpandMore />}
        id={`${data.title}-heading`}
        aria-controls={`${data.title}-content`}
        classes={classes}
      >
        <Typography className={classes.root}>{data.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={panelDetailsClasses}>
        <Typography component="div">
          <p>
            <span>Title: </span>
            {data.title} ({data.year})
          </p>
          <p>
            <span>Genre: </span>
            {data.genre[0].toUpperCase() + data.genre.slice(1)}
          </p>
          <p>
            <span>Run Time: </span>
            {calculateRunTime(data.run_time)}
          </p>
          <p>
            <span>Rating: </span>
            {data.rating}
          </p>
          {data.main_actors ? (
            <>
              <h4>Main Actors:</h4>
              <p>{data.main_actors.join(', ')}</p>
            </>
          ) : null}
          <Container
            classes={buttonContainerClasses}
            style={{ opacity: panelOpen ? 1 : 0 }}
          >
            <FaRegEdit onClick={() => openEditForm(data)} />
            <MdDeleteForever onClick={() => deleteMovie(data.movie_id)} />
          </Container>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

Movie.propTypes = {
  data: PropTypes.shape({
    movie_id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    genre: PropTypes.string,
    run_time: PropTypes.number,
    rating: PropTypes.string,
    main_actors: PropTypes.array,
  }),
  editing: PropTypes.shape({
    movie_id: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
    genre: PropTypes.string,
    run_time: PropTypes.number,
    rating: PropTypes.string,
    main_actors: PropTypes.array,
  }),
  openEditForm: PropTypes.func,
  deleteMovie: PropTypes.func,
};

const mapStateToProps = state => ({
  editing: state.editing,
});

export default connect(mapStateToProps, {
  openEditForm: actions.openEditForm,
  deleteMovie: actions.deleteMovie,
})(Movie);
