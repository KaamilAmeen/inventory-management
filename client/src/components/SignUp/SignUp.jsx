import React, {useState} from 'react'
import { Button, TextField, Card, CardContent, Typography, Container } from '@mui/material';
import inventoryAPI from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate()
    const [authDetails, setAuthFormDetails] = useState({
    username: "",
    email:"",
    password: "",
    roleId: 0
  }) 
  const handlePassword = (e) =>{
    setAuthFormDetails({...authDetails, password: e.target.value});
  }
  const handleEmail = (e) =>{
    setAuthFormDetails({...authDetails, email: e.target.value})
  }
  const handleUsername = (e) =>{
    setAuthFormDetails({...authDetails, username: e.target.value});
  }
  const handleRoleId = (e) =>{
    setAuthFormDetails({...authDetails, roleId: e.target.value});
  }
  const onSubmitDetails = (e) =>{
    
    e.preventDefault();
    inventoryAPI.addAuthDetails(authDetails).then((response)=>{
      console.log("Item Updated: ", response.data)
      navigate("/auth");
    }).catch((error)=>{
      console.error("Error: ", error)
    })
  }
  return (
      <Container sx={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Card sx={{padding: 2, maxWidth: 400, display: "flex", alignItems: "center", justifyContent: "center"}}>
          <CardContent>
              <Typography variant="h5">Sign Up</Typography>
              <TextField label="Username" fullWidth margin="normal" type='text' onChange={handleUsername}/>
              <TextField label="Email" fullWidth margin="normal" type='email' onChange={handleEmail}/>  
              <TextField label="Password" type="password" fullWidth margin="normal" onChange={handlePassword}/>
              <TextField label="Role ID" type="number" fullWidth margin="normal" onChange={handleRoleId}/>
              <Button variant="contained" color="primary" sx={{mt:"20px"}} onClick={onSubmitDetails}>Submit</Button>
          </CardContent>
      </Card>
      </Container>
      
    )
}