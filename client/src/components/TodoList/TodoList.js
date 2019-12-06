import React from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import FormWrapper from './CreateTodoStyles';
import TodoService from '../../services/TodoService';
import Todo from '../Todo/Todo';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.todoService = new TodoService();
  }

  state = {
    name: '',
    description: '',
    show: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value })
  }

  handleSubmit = (e) => {
    const { updateTodos } = this.props;
    e.preventDefault();
    this.todoService.createTodo(this.state)
      .then(
        (todo) => {
          updateTodos()
        },
        (error) => console.error(error))
  }

  displayTodos = () => {
    const { updateTodos } = this.props;
    const { todos } = this.props;
    // <Todo key={i} name={todo.name} description={todo.description} done={todo.done} />
    return todos.map((todo, i) => <Todo key={i} {...todo} updateTodos={updateTodos} />)
  }

  toggleShow = () => {
    const { show } = this.state;
    this.setState({...this.state, show: !show})
  }

  render() {
    const { todos, loggedInUser } = this.props;
    const { name, description, show } = this.state;
    return (
      <div>
        <PageTitle color="black">{`Todo List from ${loggedInUser.username} (${todos.length})`}</PageTitle>
        <img src={loggedInUser.picture} alt=""/>
        <button onClick={this.toggleShow}>{show ? 'Hide form' : 'Show form'}</button>
        <FormWrapper onSubmit={this.handleSubmit} show={show}>
          <p>Create todo:</p>
          <div>
            <label>Todo Name:</label><input type="text" name="name" onChange={this.handleChange} value={name} />
          </div>
          <div>
            <label htmlFor="description">Description:</label> <input type="text" name="description" onChange={this.handleChange} value={description} />
          </div>
          <input type="submit" value="Create" className="submit-button" />
        </FormWrapper>
        <div className="todos-container">
          {this.displayTodos()}
        </div>
      </div>
    )
  }
}

export default TodoList;
