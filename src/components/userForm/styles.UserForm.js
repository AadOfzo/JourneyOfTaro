import styled from "styled-components";

const SUserForm = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;

  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  .success-message {
    padding: 20px;
    background-color: green;
  }

  h2 {
    padding: 0.2rem;
    margin: 0.2rem;
  }

  form {
    padding: 0.2rem;
    margin: 0.2rem;

    p {
      font-size: 1.5rem;
    }

    input {
      width: 300px;
      border: none;
      appearance: none;
      //background: var(--testColorOne);
      //font-size: 1.5rem;
      padding: 12px;
      margin: 12px;
      border-radius: 3px;

      input:focus::placeholder {
        color: transparent;
      }

      input::placeholder {
        color: var(--testColorOne);
      }
    }

    button {
      height: 2rem;
      width: 100%;
      font-family: 'Julius Sans One', sans-serif;
      font-size: 1.5rem;
      background-color: var(--secondary);
      //padding: 0.2rem;
      //margin: 0.2rem;
    }
  }

`;

export default SUserForm;
