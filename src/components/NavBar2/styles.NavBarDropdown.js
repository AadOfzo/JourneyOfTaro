import styled from 'styled-components';

const SNavBarDropdown = styled.div`
  position: relative;

  .dropdown-button {
    justify-content: center;
    background: var(--secondary);
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 155%;
    right: 0rem;
    //background-color: var(--primary); /* Change background color to match NavBar2 */
    //min-width: 160px;
    border: solid 2px var(--testColorOne);
  }

  .dropdown-content ul {
    list-style: none;
    padding: 0.2rem;
    margin: 0rem;
    //background-color: var(--primary); /* Change background color */
  }

  .dropdown-content li {
    padding: 10px;
    //color: var(--textSecondary); /* Change text color */
    text-align: center; /* Center-align menu items */
  }

  .dropdown-content a {
    color: var(--textSecondary); /* Change text color */
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    //background-color: #ddd;
  }

  .show {
    display: block;
  }

  @media (max-width: 1000px) {
    .dropdown-button {
      display: flex;
      background: var(--secondary);
      padding: 0rem;
      //background-color: var(--testColorOne);
      cursor: pointer;
    }

    .dropdown-content {
      top: 100%;
      //right: -10rem;
      background-color: var(--primary);
      border: solid 2px var(--testColorOne);
    }

    .dropdown-content ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: sticky;
      list-style: none;
      padding: 0.2rem;
      margin: 0rem;
      //background-color: var(--primary); /* Change background color */
    }

    .dropdown-content li {
      padding: 10px;
      //color: var(--textSecondary); /* Change text color */
      //text-align: center; /* Center-align menu items */
    }

    .dropdown-content a {
      //color: var(--textSecondary); /* Change text color */
      //text-decoration: none;
      //display: block;
    }

    .dropdown-content a:hover {
      background-color: #ddd;
    }

    .show {
      display: block;
    }
  }
`;

export default SNavBarDropdown;
