import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, Typography, Grid, Box } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import BONLOGO from '../assets/images/logo.png';
import LoginForm from 'src/components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllAdmins } from 'src/redux/actions/group.action';
import IMG from 'src/assets/images/loginImage.png';

// ------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  minHeight: '100vh',
  display: 'flex',
  padding: '12px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minWidth: '100%',
    padding: '8px',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '800px',
  },
}));

const StyledLeftContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: 'inherit',
  borderRadius: '12px',
  margin: '12px',
  backgroundImage: `url(${IMG})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const StyledRightContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  margin: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    margin: '8px 0',
    padding: theme.spacing(3),
  },
}));

const StyledLogoWrapper = styled('div')(() => ({
  marginBottom: '20px',
}));

const StyledContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const StyledFooterText = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginTop: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

// ------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAdmins());
  }, []);

  return (
    <>
      <Helmet>
        <title>UfarmX</title>
      </Helmet>

      <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <StyledRoot>
        {/* Left Side */}
        <StyledLeftContainer />

        {/* Right Side */}
        <StyledRightContainer>
          {/* Logo */}
          <StyledLogoWrapper>
            <img src={BONLOGO} width="140" height="40" alt="UfarmX Logo" />
          </StyledLogoWrapper>

          {/* Content */}
          <StyledContentWrapper>
            {/* Welcome Text */}
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '2rem',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <h1
                style={{
                  fontWeight: 600,
                  marginBottom: '0rem',
                  fontSize: '2.5rem',
                }}
              >
                Welcome Back!
              </h1>
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '2rem',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  position: 'relative',
                  // left: '12.5rem',
                }}
                className="signin-text"
              >
                Sign In to Continue
              </div>
            </Grid>

            {/* Login Form */}
            <LoginForm />

            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                width: '82%',
                textAlign: 'left',
                marginTop: '2rem',
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: { xs: '1.6rem', md: '1rem' }, 
              }}
            >
              {/* Register Text */}
              {/*
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' }, 
                  justifyContent: 'space-between', 
                  gap: { xs: '6px', md: '0px' },
                }}
              >
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  New to ufarmx ?{' '}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: {md:'48px', xs:'16px'},
                  }}
                >
                  <Link href="/create-account" variant="subtitle2">
                    <span style={{ color: '#90C434' }}>Create Account.</span>
                  </Link>
                  
                  <Typography variant="body2">
                    <Link href="/forgot-password" variant="subtitle2">
                      <span style={{ color: '#90C434' }}>Forgot Password ? </span>
                    </Link>
                  </Typography>
                </Box>
              </Box>
              */}
            </Grid>
          </StyledContentWrapper>

          {/* Bottom Text */}
          <StyledFooterText>
            <Typography 
            variant="caption" 
            display="block" 
            sx={{ mt: 2, color: 'text.secondary' }}
            >
              ©2025 UfarmX Inc. All rights reserved
            </Typography>
          </StyledFooterText>
        </StyledRightContainer>
      </StyledRoot>
      </Box>
    </>
  );
}
