import React from 'react'
import './LogSignPage.css'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import { Button, Card, CardContent, Typography, Container } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { lightBlue } from '@mui/material/colors';

function LogSignPage() {
  return (
    <Container sx={{height:"100vh", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
        <Button sx={{width:"120px", height:"50px", color:"secondary", variant:"contained"}}>
            <Link to="/signup" className="nav-link">
                Sign up
            </Link>
        </Button>
        <Button sx={{width:"120px", height:"50px", color:"secondary", variant:"contained"}}>
            <Link to="/login" className="nav-link">
                Login
            </Link>
        </Button>
    </Container>
  )
}

export default LogSignPage
