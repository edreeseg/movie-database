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
  const classes = useStyles({ panelOpen });
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
        <Typography
          variant="h2"
          className={classes.root}
          style={{ fontSize: panelOpen ? '1.5rem' : '0.9375rem' }}
        >
          {data.title} ({data.year})
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={panelDetailsClasses}>
        <table>
          <thead>
            <tr>
              <th>Genre</th>
              <th>Rating</th>
              <th>Run Time</th>
              {data.main_actors ? <th>Main Actors</th> : null}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.genre[0].toUpperCase() + data.genre.slice(1)}</td>
              <td>{data.rating}</td>
              <td>{calculateRunTime(data.run_time)}</td>
              {data.main_actors ? <td>{data.main_actors.join(', ')}</td> : null}
            </tr>
          </tbody>
        </table>
        <Container
          classes={buttonContainerClasses}
          style={{ opacity: panelOpen ? 1 : 0 }}
        >
          <FaRegEdit onClick={() => openEditForm(data)} />
          <MdDeleteForever onClick={() => deleteMovie(data.movie_id)} />
        </Container>
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
