import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { checkSession } from '../services/session';

const Styles = styled.div`
.navbar {
  background-color: #222;
}

.navbar-brand, .navbar-nav .nav-link {
  color: #bbb;

  &:hover {
    color: white;
  }
}
`;

class NavigationBar extends React.Component {
  constructor(props) {
    super(props) 

      this.state = {
        isAuthenticated: false
      }
    }

    async componentDidMount() {   
      const isChecked = await checkSession()
      console.log(isChecked);
      this.setState({ isAuthenticated:isChecked })
    }
  

render() {
 
  return (
  
          <React.Fragment>
          <Styles>
          <Navbar expand="lg">
            <Navbar.Brand href="/">Twitter-clone</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Styles>
        </React.Fragment>

  )
}
} 
  


export default NavigationBar;