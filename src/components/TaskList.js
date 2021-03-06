import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MiniCard from './Cards/MiniCard';
import Loader from './PageLoader';

// import axios from 'axios';
// import { connect } from 'react-redux';

const ListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  width: 100vw;
`;

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    boxShadow: '0 2px 2px #bbb',
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  subheader: {
    borderRadius: '8px',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',
    backgroundColor: '#dfe3e6',
    textAlign: 'center',
    color: '#002884',
    fontWeight: 'bold',
  },
  listItem: {
    height: '100px',
  },
});

const renderListItem = ({
  item,
  id,
  location,
  classes,
  addToNavBar,
  // taskNames,
}) => (
  <ListItem
    className={classes.listItem}
    key={id}
    button
    onClick={() => addToNavBar(`${location}`, `${''}taskNameWillBeHere`)}
    to={location}
    component={Link}
  >
    <MiniCard />
  </ListItem>
);

class TaskList extends React.Component {
  state = { taskItems: [], loading: true };

  componentDidMount() {
    fetch('/jsonDatas/tasks.json')
      .then(res => res.json())
      .then(json => this.setState({ taskItems: json, loading: false }));
  }

  render() {
    const {
      classes,
      addToNavBar,
    } = this.props;
    const { taskItems, loading } = this.state;

    if (loading) return <Loader />;

    const tasksCompleted = taskItems.filter(({ completed }) => completed);
    const tasksIncompleted = taskItems.filter(({ completed }) => !completed);

    return (
      <ListContainer>
        <List
          subheader={
            <ListSubheader className={classes.subheader} component="div">
              Новые задачи
            </ListSubheader>
          }
          className={classes.root}
        >
          {tasksIncompleted.map(({ item, id }) =>
            renderListItem({
              item,
              id,
              location: 'implementor',
              classes,
              addToNavBar,
            }),
          )}
        </List>
        <List
          subheader={
            <ListSubheader className={classes.subheader} component="div">
              Завершенные
            </ListSubheader>
          }
          className={classes.root}
        >
          {tasksCompleted.map(({ item, id }) =>
            renderListItem({
              item,
              id,
              location: 'preparation',
              classes,
              addToNavBar,
            }),
          )}
        </List>
      </ListContainer>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);
