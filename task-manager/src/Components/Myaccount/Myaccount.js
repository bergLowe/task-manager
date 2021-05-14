import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Myaccount.css';


const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const resetProps = () => {
    localStorage.removeItem('token');
  }

  return (
    <div>
      <Navbar color="faded" light>
        <i className="fas fa-tasks fa-fw fa-2x text-white todoLogo" style={{"verticalAlign": "middle"}}></i>
        <NavbarBrand /*href="/"*/ className="mr-auto text-white todoTitle"><strong>To-Do List</strong></NavbarBrand>
        <i className="fas fa-user-circle fa-2x mr-2 text-white profileLogo" onClick={toggleNavbar}></i>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {/* <NavItem>
              <NavLink href="/components/" style={{"color":"white","fontSize":"1.2em"}}>
                <G
              </NavLink>
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