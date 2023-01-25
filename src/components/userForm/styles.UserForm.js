import styled from "styled-components";

const SUserForm = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  //flex-grow: 0;
  //flex-shrink: 1;
  margin: 1rem;
  padding: 1rem;
  
  h2 {
    padding: 0.2rem;
    margin: 0.2rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    p {
      font-size: 1.2rem;
      padding: 0.2rem;
      margin: 0.2rem;
    }
    
    input {
      width: 100%;
      height: 1.5rem;
      display: flex;
      font-size: 1.2rem;
      padding: 0.2rem;
      margin: 0.2rem;
    }
    
    button {
      height: 2rem;
      display: flex;
      justify-content: center;
      font-family: 'Julius Sans One', sans-serif;
      font-size: 1.5rem;
      background-color: var(--secondary);
      padding: 0.2rem;
      margin: 0.2rem;
    }
  }
`;

export default SUserForm;
