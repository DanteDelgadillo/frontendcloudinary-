import React, { Component } from 'react'
import { Navbar, Nav, } from 'react-bootstrap';



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
                        <Nav.Link href="/">Images</Nav.Link>
                        <Nav.Link href="/upload">Upload Images</Nav.Link>
                    </Nav>
                </Navbar>
            </React.Fragment>

        )
    }
}

export default navBar;