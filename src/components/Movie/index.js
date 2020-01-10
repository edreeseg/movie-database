import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { MdExpandMore, MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import EditMovie from '../EditMovie';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  content: {
    width: '90%',
    '& p': {
      textOverflow: 'ellipsis',
      whiteSpace: 'normal', // Set to `nowrap` to truncate string and keep title on one line
      overflow: 'hidden',
    },
  },
}));

const usePanelDetailsStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    whiteSpace: 'normal',
  },
}));

const useButtonContainerStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100px',
    position: 'absolute',
    bottom: '20px',
    right: '10px',
    transition: 'opacity .3s',
    '& svg': {
      fontSize: '30px',
      '&:hover': {
        cursor: 'pointer',
      },
      '&:active': {
        transform: 'translateY(1px)',
      },
    },
  },
}));

function Movie({
  data,
  deleteMovie,
  loading,
  setLoading,
  setError,
  setOriginalList,
}) {
  const [editing, setEditing] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  // Basic list to display individual movie information
  const classes = useStyles();
  const buttonContainerClasses = useButtonContainerStyles();
  const panelDetailsClasses = usePanelDetailsStyles();
  const handleChange = () => {
    setPanelOpen(prev => !prev);
  };
  return (
    <ExpansionPanel onChange={handleChange}>
      {editing ? (
        <EditMovie
          data={data}
          editing={editing}
          setEditing={setEditing}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          setOriginalList={setOriginalList}
        />
      ) : null}
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
            {data.run_time}
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
            <FaRegEdit onClick={() => setEditing(true)} />
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
  deleteMovie: PropTypes.func,
};

export default Movie;
