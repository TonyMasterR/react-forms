import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SingleSelect from '../../components/SingleSelect';
// import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const styles = theme => ({
  container: {
    backgroundColor: '#fff',
    padding: `${theme.margin * 1.5}px ${theme.margin}px`,
    width: 450,
    borderRadius: 6,
    margin: '0 auto',
  },
  wrapper: {
    marginTop: 85,
  },
  logo: {
    paddingBottom: 20,
    height: 100,
  },
  sadFaceIcon: {
    maxHeight: 400,
    marginTop: theme.margin,
  },
  button: {
    color: '#fff',
    marginTop: theme.margin * 2,
    marginBottom: theme.margin,
  },
  heading: {
    color: '#002882',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

class ImplementorPage extends React.Component {
  state = { users: [] };

  componentDidMount() {
    fetch('/jsonDatas/users.json')
      .then(res => res.json())
      .then(json => this.setState({ users: json }));
  }

  render() {
    const { classes } = this.props;
    const { users } = this.state;

    return (
      <Container>
        <Typography variant="display1" gutterBottom className={classes.heading}>
          Implementor Page
        </Typography>
        <form className={classes.container}>
          <SingleSelect users={users} />
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Go next
          </Button>
        </form>
      </Container>
    );
  }
}

ImplementorPage.propTypes = {
  location: PropTypes.object, // react router
  classes: PropTypes.object, // Material UI Injecte
};

export default withStyles(styles)(ImplementorPage);