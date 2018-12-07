import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  progress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PageLoader = ({ classes }) => {
  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
};

PageLoader.propTypes = {
  classes: PropTypes.object.isRequired, // Material UI Injected
};

export default withStyles(styles)(PageLoader);
