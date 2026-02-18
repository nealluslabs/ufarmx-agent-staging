import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';


import BONLOGO from '../assets/images/logo.png';
import LoginForm from 'src/components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from "react-icons/fa";
import RegisterForm from 'src/components/register/RegisterForm';
import AddDepositForm from 'src/components/addDeposit/AddDepositForm';
import AddFarmerForm from 'src/components/addFarmer/AddFarmerForm';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));




const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems:"center",
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  //scale:"1.2"
}));

// ----------------------------------------------------------------------

export default function AddFarmerPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])


  return (
    <>
      <Helmet>
        <title> UfarmX</title>
      </Helmet>

      <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <StyledRoot style={{ flexDirection: 'row-reverse' }}>
      

        <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }} style={{ border: '0px solid red', flex: 2 }}>
          
      { /*
        <div  onClick ={()=>{navigate('/')}} style={{fontSize:"2rem",color:"white",fontWeight:"900",color:"#21712E",position:"absolute",top:"1rem",left:"1rem",cursor:"pointer"}}>
        <FaArrowCircleLeft/>

     
          </div>
      */}   
          
          
          <StyledContent>
         
          
             <Box sx={{ minWidth: { xs: '100%', md: '1200px' }, maxWidth: '1200px', mt: { xs: 0, md: '-5rem' } }} style={{display:"flex",alignItems:"flex-start",justifyContent:"center"}}>
            
            <AddFarmerForm />
            </Box>
          
          
          
          </StyledContent>
        </Container>
      </StyledRoot>
      </Box>
    </>
  );
}
