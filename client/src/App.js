import React from 'react';
import './App.css';
import TodoService from './services/TodoService';
import TodoList from './components/TodoList/TodoList';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import AuthService from './services/AuthService';
import PrivateRoute from './guards/PrivateRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.todoService = new TodoService();
    this.authService = new AuthService();
  }

  state = {
    todos: [],
    user: null
  }

  updateTodos = () => {
    this.todoService.fetchTodos()
      .then(
        (todos) => {
          this.setState({ ...this.state, todos })
        },
        (error) => {
          const { message } = error;
          console.error(message)
        }
      )
  }

  setUser = (user) => {
    this.setState({ ...this.state, user })
  }

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService.loggedInUser()
        .then(
          (user) => {
            this.setUser(user)
          },
          (error) => {
            this.setUser(false)
          }
        )
        .catch(() => {
          this.setUser(false)
        })
    }
  }

  componentDidMount() {
    this.todoService.fetchTodos()
      .then(
        (todos) => {
          this.setState({ ...this.state, todos })
        },
        (error) => {
          const { message } = error;
          console.error(message)
        }
      )
  }

  render() {
    this.fetchUser()
    const { todos, user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />  
            <Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />
            <PrivateRoute exact path="/" user={user} component={() => <TodoList todos={todos} updateTodos={this.updateTodos} loggedInUser={user}/>} />
          </Switch>

        </header>
      </div>
    );
  }
}

export default App;
