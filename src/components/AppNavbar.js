import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../contexts/UserContext'
import CartContext from '../contexts/CartContext'
import {Navbar, Nav, Container, Button, NavDropdown, Badge} from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function AppNavbar() {
    const {user} = useContext(UserContext)

    return(
        <div>
            <Navbar className="bg-primary-custom" variant="dark">
                <Container>
                <Navbar.Brand as={Link} to={'/'} className="navbar-logo">
                    <FontAwesomeIcon icon={solid('bicycle')} /> Bicycle Cartel
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <NavLink className="nav-link" to={'/'}>
                            <FontAwesomeIcon icon={solid('home')} /> Home
                        </NavLink>
                        <NavLink to="/products" className="nav-link">
                            {
                                user.isAdmin ? 'Dashboard' : 'Catalog'
                            }
                        </NavLink>
                        <NavLink to="/orders" className={(user.accessToken && !user.isAdmin) ? 'nav-link' : 'd-none'}>
                            Orders
                        </NavLink>
                        <NavLink to="/cart" className={(user.accessToken && !user.isAdmin) ? 'nav-link ' : 'd-none'}>
                            <Badge bg="light" text="dark">0</Badge> Cart
                        </NavLink>
                        <NavDropdown
                        title={
                            (user.accessToken ? (user.firstName ? 
                                `${user.firstName}`
                                :
                                'User')
                            :
                            'Get Started') 
                        }
                        menuVariant="dark"
                        >
                            {user.accessToken !== null ?
                                <NavDropdown.Item as={Link} to="logout" className="nav-link">Logout</NavDropdown.Item>
                            :
                                <>
                                    <NavDropdown.Item as={Link} to="login" className="nav-link">Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="register" className="nav-link">Register</NavDropdown.Item>
                                </>
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}