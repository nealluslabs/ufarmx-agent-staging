import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../iconify';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from 'src/redux/actions/auth.action';
import { fetchAllFarmers, fetchAllResponses } from 'src/redux/actions/group.action';
import InstallAppPrompt from 'src/components/offline/InstallAppPrompt';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); 

  const userSignin = (e) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, password };
    dispatch(signin(user, navigate, setLoading));
  }

  return (
    <>
     <form style={{ minWidth: "clamp(280px, 90%, 500px)" }} onSubmit={userSignin}>
      <Stack spacing={3}>

      <Grid item xs={12} md={12}>
      <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem',color:"#667085" }}>
                   Email Address
                  </Typography>
        <TextField required name="email" type="text" label="Email address / Phone Number" 
         sx={{height:"4rem",backgroundColor:"#F9FAFB"}}
         placeholder='youremail@email.com'
         fullWidth
        InputProps={{
          style:{height:"4rem",padding:"10px"},
         
        }}
        
        onChange={(e) => setEmail(e.target.value)}/>
      </Grid>

        <Grid item xs={12} md={12}>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: '500', fontSize: '0.9rem',color:"#667085" }}>
                   Password
                  </Typography>
        <TextField
          name="password"
          label="Password"
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          sx={{height:"4rem",backgroundColor:"#F9FAFB"}}
          type={showPassword ? 'text' : 'password'}
          placeholder='Enter Your Password'
          InputProps={{
            style:{height:"4rem",padding:"10px"},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Grid>

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
        {/*
        <>
        <Checkbox name="remember" label="Remember me" />
        <div>
          Remember Me
        </div> 

        </>
        
        */}


      

      </Stack>

      <LoadingButton /*onClick={(e)=>{setLoading(true);userSignin(e) }}*/ fullWidth size="large" type="submit" variant={'contained'} disabled={loading} style={{ backgroundColor:'#0A6054' /*'#629D23'*/,color: 'white',
           border: '1px solid black',borderRadius:"0.5rem", color: 'white',fontWeight:"400"}}>
        {loading ? "Loading..." : "Sign In"}
      </LoadingButton>
      <Grid item xs={12} md={12} sx={{ mt: 2 }}>
        <InstallAppPrompt />
      </Grid>
      </form>
    </>
  );
}
