import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false
        }

        // If we want to use a React function within our JSX code, we have to bind it in the constructor.
        // Other way of doing that is by using an arrow function (we have previously done that).
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen 
        })
    }

    render() {
        return (
            // The symbols <> and </> indicate a React fragment which let you to group together a 
            // bunch of React Elements and then return it. It is a perfect alternative insted of 
            // adding a div tag, because that would add an extra node into the DOM.
            <>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto" href="/">
                        <img src="assets/images/logo.png" height="30" witdh="41" alt="Ristorante Con Fusion" />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"></span> About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"></span> Menu
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address fa-lg"></span> Contact Us
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante Con Fusion</h1>
                            <p>We take inspiration from the World's best cusines, and create a unique fusion experience. Our lismacking creation will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            </>
        );
    }
}

export default Header;