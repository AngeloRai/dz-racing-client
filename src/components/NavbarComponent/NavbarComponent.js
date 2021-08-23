import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

import { useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import logo from "../../images/DZ-LOGO-1.jpg";
import "./NavbarComponent.css";

function NavbarComponent() {
  const [expanded, setExpanded] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  function expand() {
    if (expanded === false) {
      setExpanded(true);
    } else if (expanded === true) setExpanded(false);
  }

  return (
    <div className="nav-container w-100 d-flex">
      <Navbar
        className="d-flex justify-content-between w-100"
        collapseOnSelect
        expanded={expanded}
        expand="lg"
        style={{ backgroundColor: "#070c29", opacity: 0.9 }}
        variant="dark"
      >
        <Navbar.Brand to="/home">
          <NavLink className="mx-4 navbar-brand" to="/">
            <img
              src={logo}
              alt="logo"
              className="logo d-inline-block align-top "
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={expand}
          aria-controls="responsive-navbar-nav "
          className="mx-4"
        />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="d-flex justify-content-between w-100">
            <Nav className="mr-auto nav-container">
              <NavLink
                onClick={() => setExpanded(false)}
                className="d-flex justify-content-center nav-link"
                activeClassName="active"
                to="/"
              >
                DRIVER STANDINGS
              </NavLink>
              <NavLink
                onClick={() => setExpanded(false)}
                className="d-flex justify-content-center nav-link"
                activeClassName="active"
                to="/team-standings"
              >
                TEAM STANDINGS
              </NavLink>
              <NavLink
                onClick={() => setExpanded(false)}
                className="d-flex justify-content-center nav-link"
                activeClassName="active"
                to="/races"
              >
                RACES
              </NavLink>
              {loggedInUser.user.email && (
                <NavLink
                  onClick={() => setExpanded(false)}
                  className="d-flex justify-content-center nav-link"
                  activeClassName="active"
                  to="/pilots"
                >
                  PILOTS
                </NavLink>
              )}
              {loggedInUser.user.role === "ADMIN" && (
                <NavLink
                  onClick={() => setExpanded(false)}
                  className="d-flex justify-content-center text-secondary nav-link"
                  activeClassName="active"
                  to="/add-race"
                >
                  ADD RACE
                </NavLink>
              )}
              
                {loggedInUser.user.role === "ADMIN" && (
                  
                    <Nav>
                      <Dropdown style={{zIndex: "1005", position: "relative"}}>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          style={{ backgroundColor: "#0a0a0a", border: "none" }}
                        >
                          <span className="px-4">SETTUP</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="overlay px-5">
                          <Dropdown.Item>
                            <NavLink
                              onClick={() => setExpanded(false)}
                              className="d-flex justify-content-center text-secondary nav-link"
                              activeClassName="active"
                              to="/points-table"
                            >
                              POINTS SETUP
                            </NavLink>
                          </Dropdown.Item>
                          
                          <Dropdown.Item>
                            <NavLink
                              onClick={() => setExpanded(false)}
                              className="d-flex justify-content-center text-secondary nav-link"
                              activeClassName="active"
                              to="/add-pilot"
                            >
                              ADD PILOT
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <NavLink
                              onClick={() => setExpanded(false)}
                              className="d-flex justify-content-center text-secondary nav-link"
                              activeClassName="active"
                              to="/users"
                            >
                              EDIT USERS
                            </NavLink>
                          </Dropdown.Item>
                          <Dropdown.Item className=" px-5 overlay">
                            <NavLink
                              onClick={() => setExpanded(false)}
                              className="d-flex justify-content-center text-secondary nav-link"
                              activeClassName="active"
                              to="/add-circuit"
                            >
                              ADD CIRCUIT
                            </NavLink>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav>
                  
                )}
              
            </Nav>
              {loggedInUser.user.email ? (
                <Nav>
                  <Dropdown >
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{ backgroundColor: "#0a0a0a", border: "none" }}
                    >
                      <span className="px-4">Hi, {loggedInUser.user.email}!</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="overlay px-5">
                      <Dropdown.Item
                        className=" px-5 text-danger"
                        onClick={(event) => {
                          event.preventDefault();
                          // Logout Process
                          setLoggedInUser({ user: {}, token: "" });
                          localStorage.removeItem("loggedInUser");
                        }}
                      >
                        LOGOUT
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              ) : (
                
                  <NavLink
                    className="nav-link text-white d-flex justify-content-centeralign-self-end"
                    className="d-flex justify-content-center nav-link px-5"
                    activeClassName="active"
                    to="/login"
                  >
                    LOGIN
                  </NavLink>
                
              )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
