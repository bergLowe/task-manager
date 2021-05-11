import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const resetProps = () => {
    localStorage.removeItem('token');
  }

  return (
    <div>
      <Navbar color="faded" light>
        <i className="fas fa-tasks fa-fw fa-2x text-white" style={{"verticalAlign": "middle"}}></i>
        <NavbarBrand href="/" className="mr-auto text-white"><strong>To-Do List</strong></NavbarBrand>
        {/* <NavbarToggler onClick={toggleNavbar} className="mr-2"/> */}
        
        <i className="fas fa-user-circle fa-2x mr-2 text-white" onClick={toggleNavbar}></i>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {/* <NavItem>
              <NavLink href="/components/" style={{"color":"white","fontSize":"1.2em"}}>Name</NavLink>
            </NavItem> */}
            <NavItem>
              <Link to="./" onClick={resetProps} style={{"color":"white","fontSize":"1.2em"}}>Logout</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;