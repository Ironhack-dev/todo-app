import styled from 'styled-components';

const TodoCard = styled.div`
  width: 45%;
  border-radius: 4px;
  margin-bottom: 2%;
  border: ${props => props.done === true ? '1px solid green' : '1px solid red' };
  padding: 2%;
  h3 {
    text-decoration: ${props => props.done === true ? 'line-through' : 'none' };
  }

  button {
    outline: none;
    margin-right: 25px;
  }
`;

export default TodoCard;