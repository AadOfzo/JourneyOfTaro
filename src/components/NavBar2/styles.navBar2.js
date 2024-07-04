import styled from "styled-components";

const SnavBar2 = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--primary);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 100;

  .nav-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    padding: 1rem;
    color: var(--secondary);
    border-bottom: solid 1px var(--testColorOne);
  }
  
  .navbar-title {
    margin-bottom: 1rem;
    font-size: 2rem;
    border-bottom: solid 1px var(--secondary);
  }

  .menu {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;

      li {
        margin-right: 20px;

        a {
          font-size: 1.2rem;
          text-decoration: none;
          color: var(--secondary);
          font-weight: 500;

          &.active-link,
          &:hover {
            border-bottom: 1px solid #eaa733;
            transition: .5s;
            
          }
        }
      }
    }
  }

  //.dropdown-content ul {
  //  color: aqua;
  //  font-size: 1rem;
  //  list-style: none;
  //  padding: 1.1rem;
  //  margin: 1.1rem;
  //}
  //
  //.dropdown-content li {
  //  padding: 10px;
  //  text-align: center;
  //}
  //
  //.dropdown-content a {
  //  text-decoration: none;
  //  display: block;
  //}

  /* Styling for hamburger menu */
  .hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;

    .bar {
      width: 25px;
      height: 3px;
      background-color: var(--secondary);
      margin: 3px 0;
      transition: 0.4s;
    }
  }

  /* Media queries */
  @media (max-width: 919px) {
    .nav-container {
      justify-content: center;
    }

    .menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--primary);
      border-bottom: solid 1px transparent;
      transition: transform 0.5s ease-in-out, border-bottom 0.5s ease-in-out;
      
      ul {
        display: block;
        list-style: circle;

        li {
          text-align: center;
          margin: 3px;
          padding: 3px;
        }
      }

      &.open {
        display: flex;
        transform: translateY(0);
        border-bottom: solid 1px var(--testColorOne);
      }
    }

    .hamburger {
      display: flex;
      color: var(--testColorTwo);

      .bar {
        &.open:nth-child(1) {
          transform: rotate(-45deg) translate(-5px, 6px);
        }

        &.open:nth-child(2) {
          opacity: 0;
        }

        &.open:nth-child(3) {
          transform: rotate(45deg) translate(-5px, -6px);
        }
      }
    }
  }
`;

export default SnavBar2;
