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
    align-items: center;
    width: 100%;
    justify-content: center;
  }

  .menu {
    display: flex;
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
          text-decoration: none;
          color: var(--secondary);
          font-weight: 500;

          // Border-bottom not showing
          a.active-link,
          a:hover {
            border-bottom: 1px solid #eaa733;
            transition: .5s;
          }
        }
      }
    }
  }

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

  /* Media query for responsive design */
  @media (max-width: 919px) {
    .nav-container {
      justify-content: end;
    }

    .menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 47px;
      left: 0;
      right: 0;
      background-color: var(--primary);
      text-align: center;

      ul {
        display: block;

        li {
          text-align: left;
        }
      }

      &.open {
        display: flex;
      }
    }

    .hamburger {
      display: flex;

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
