import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MdExpandMore } from 'react-icons/md';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Movie({ data }) {
  // Basic list to display individual movie information
  const classes = useStyles();
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<MdExpandMore />}
        id={`${data.title}-heading`}
        aria-controls={`${data.title}-content`}
      >
        <Typography className={classes.root}>{data.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography component="div">
          <p>
            <span>ID: </span>
            {data.movie_id}
          </p>
          <p>
            <span>Title: </span>
            {data.title} ({data.year})
          </p>
          <p>
            <span>Genre: </span>
            {data.genre}
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
};

export default Movie;
