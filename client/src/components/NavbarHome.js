import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function NavbarHome(props) {
    return (
        <>
        <Navbar style={{ backgroundColor:'#0099cc' }} className='shadow-sm'>
            <Container>
                <Navbar.Brand href="">
                    <Link to='/'> <h3> Networks </h3> </Link>
                </Navbar.Brand>
            </Container>
        </Navbar>  
        </>
    );
}

export default NavbarHome