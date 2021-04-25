import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <i className="fas fa-tasks fa-fw fa-2x" style={{"verticalAlign": "middle"}}></i>
        <NavbarBrand href="/" className="mr-auto"><strong>To-Do List</strong></NavbarBrand>
        {/* <NavbarToggler onClick={toggleNavbar} className="mr-2"/> */}
        
        <i className="fas fa-user-circle fa-2x mr-2" onClick={toggleNavbar}></i>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Name</NavLink>
            </NavItem>
            <NavItem>
              <Link to="./" style={{"color":"black"}}>Logout</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;