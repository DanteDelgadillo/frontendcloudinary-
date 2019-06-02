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
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/upload">Add Images</Nav.Link>
                    </Nav>
                </Navbar>
            </React.Fragment>

        )
    }
}

export default navBar;