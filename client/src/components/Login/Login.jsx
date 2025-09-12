import React, {useState} from 'react'
import { Button, TextField, Card, CardContent, Typography, Container } from '@mui/material';
import inventoryAPI from '../../api/api';

export default function Login() {
  const [authDetails, setAuthFormDetails] = useState({
    username: "",
    password: ""
  }) 
  const handlePassword = (e) =>{
    setAuthFormDetails({...authDetails, password: e.target.value});
  }
  const handleUsername = (e) =>{
    setAuthFormDetails({...authDetails, username: e.target.value});
  }
  return (
    <Container sx={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Card sx={{padding: 2, maxWidth: 400, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <CardContent>
            <Typography variant="h5">Login</Typography>
            <TextField label="Username" fullWidth margin="normal" onChange={handleUsername}/>
            <TextField label="Password" type="password" fullWidth margin="normal" onChange={handlePassword}/>
            <Button variant="contained" color="primary" sx={{mt:"20px"}}>Submit</Button>
        </CardContent>
    </Card>
    </Container>
    
  )
}
