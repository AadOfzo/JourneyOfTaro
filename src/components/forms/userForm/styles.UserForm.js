import styled from "styled-components";

const SUserForm = styled.div`
  //display: flex;
  //flex-direction: column;


  *, *::before, *::after {
    box-sizing: border-box;
  }

  .success-message {
    font-size: 1.5rem;
    max-width: 400px;
    padding: 20px;
    margin: 20px;
    background-color: var(--secondary);
    color: var(--textSecondary);
    border-radius: 10px;
  }

  h2 {
    padding: 0.2rem;
    margin: 0.2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-evenly;
    align-items: ;
    padding: 0.2rem;
    //margin: 0.2rem;

    p {
      font-size: 1.5rem;
    }

    label {
      font-family: 'Poppins', 'Arial', sans-serif;
      padding-right: 1.5rem;
      text-align: left;
      margin-right: auto;
    }

    input {
      margin: 12px;
      width: 300px;
      appearance: auto;
      padding: 12px;
      border-radius: 3px;
      box-shadow: inset 0 0 10px rgb(167, 24, 24);

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
    }
  }

`;

export default SUserForm;
