import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/es/Typography';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import InputBase from '@material-ui/core/InputBase/InputBase';
import UserCard from '../../components/Cards/UserCard';
import Loader from '../../components/PageLoader';
import Lorem from '../../components/Lorem';

import styles, { Container } from './style';

class DecisionPreparePage extends React.Component {
  state = { guys: [], loading: true };

  componentDidMount() {
    fetch('/jsonDatas/guys.json')
      .then(res => res.json())
      .then(json => this.setState({ guys: json, loading: false }));
  }

  renderList = () => {
    const { guys } = this.state;
    return (
      <>
        <legend style={{ marginBottom: '10px' }}>Выберите согласующего для решения:</legend>
        {guys.map(({ userName, appointment, id }) => (
          <label key={id}>
            <MenuItem>
              <Checkbox />
              <UserCard userName={userName} id={id} appointment={appointment} />
            </MenuItem>
          </label>
        ))}
      </>
    );
  };

  render() {
    const { classes, rollBackNavBar } = this.props;
    const { guys, loading } = this.state;

    if (loading) return <Loader />;

    return (
      <Container>
        <form className={classes.container}>
          <Typography variant="display1" gutterBottom className={classes.heading}>
            ООО "Ромашка" - Подготовка решения по запросу на кредит
            {/* Получаем значение выбранной задачи из redux state */}
          </Typography>
          <FormControl className={classes.formControls}>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid #002882' }}>
              Запрос на кредит
              {/* Получаем значение выбранной задачи из redux state */}
            </Typography>
            <p style={{ marginBottom: '20px' }}>
              <Lorem amount={5} />
            </p>
            <label style={{ marginBottom: '20px' }}>
              Решение:
              <InputBase
                className={classes.input}
                label="lololololo"
                multiline
                rows={3}
                name="username"
                fullWidth
                autoFocus
                autoComplete="off"
              />
            </label>
          </FormControl>
          <FormControl>{this.renderList()}</FormControl>
          <FormControl style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Button
              className={classes.button}
              component={Link}
              onClick={() => rollBackNavBar(0)}
              to="/account"
              variant="contained"
              color="primary"
            >
              Отправить на согласование
            </Button>
          </FormControl>
        </form>
      </Container>
    );
  }
}

DecisionPreparePage.propTypes = {
  classes: PropTypes.object, // Material UI Injecte
};

export default withStyles(styles)(DecisionPreparePage);
