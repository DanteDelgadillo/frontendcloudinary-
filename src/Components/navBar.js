import React, { Component } from 'react'
import { Navbar, Nav, } from 'react-bootstrap';
import { Link } from "react-router-dom"



class navBar extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (

            <React.Fragment>
                <Navbar sticky="top" variant="dark" expand="lg">
                    <Nav className="mr-auto">
                        <Link className="nav-link navbar-brand fontstyle" to="/">Images</Link>
                        <Link className="nav-link navbar-brand fontstyle" to="/upload">Upload Images</Link>
                    </Nav>
                </Navbar>
            </React.Fragment>

        )
    }
}

export default navBar;