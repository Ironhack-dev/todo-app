import styled from 'styled-components';

const FormWrapper = styled.form`
  display: ${props => props.show === true ? 'flex' : 'none' } ;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  padding: 5% 0;
  .submit-button {
    outline: none;
    padding: 2%;
    cursor: pointer;
    border: 1px solid white;
    background: white;
    color: black;
  }

  div {
    margin-bottom: 5%;
    
  }
`;

export default FormWrapper;