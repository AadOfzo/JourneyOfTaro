import React from "react";

const FooterMenu = ({ isLoggedIn, userName, isAdmin }) => {
  return (
    <div className="footer-menu">
      {isLoggedIn ? (
        <div>
          <p>Welcome, {userName}</p>
          {isAdmin && <p>Admin</p>}
        </div>
      ) : (
        <h2>Start Tour</h2>
      )}
    </div>
  );
};

export default FooterMenu;
