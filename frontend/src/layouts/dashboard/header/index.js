import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Grid, Button } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar2';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import Searchbar2 from './Searchbar2';
import { useSelector } from 'react-redux';
import CustomSearchBar from 'src/components/global/CustomSearchBar';
import { useLocation } from 'react-router-dom';
import { FaRegBell } from "react-icons/fa6";
import { BsChatText } from "react-icons/bs";

// ----------------------------------------------------------------------

const NAV_WIDTH = 250;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: 'white',
 
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('xs')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
    width:"100%",
    // paddingLeft:"4rem",
    paddingRight:"8rem",
    
    display:"flex",
    justifyContent:"space-between"
  },
}));

const StyledDiv = styled('div')(({ theme }) => ({

  [theme.breakpoints.down('sm')]: {
   display:"none"
  },
}));


// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const { user } = useSelector((state) => state.auth);
  const { myGroups, isLoading,farmerInFocus } = useSelector((state) => state.group);
  const location = useLocation()

   //console.log("Location state is-->,",location)

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
       

       
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: {md:'24rem', xs:'15rem'}}}>  
        <CustomSearchBar  title="Shift + K to search..."/>
      
      </Box>
      &nbsp; &nbsp;
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end',backgroundColor:"pink",width:"10%" }}>
        {/*<Button
          variant="contained"
          style={{ minHeight: '50px', width:{xs:'10px',sm:'145px'}, backgroundColor: '#2DA840' }}
        >
          SEARCH
        </Button>*/}
      </Box>
    </Grid>
        {/* <Searchbar /> */}
        {/* <Searchbar2 /> */}
        <Box sx={{ display:"flex" }} >
        <Typography variant="h6" sx={{color: '#000000', fontSize: '16px',padding:"0.3rem",borderRadius:"50%",backgroundColor:"#F0F0F0",display:{xs:'none',md:'block'} }}>
        {/*user && user.userType === "business"?"Joe Thomas": user && user.lastName && user.firstName? user.lastName && user.firstName?user.firstName  + " " + user.lastName:"Norman Stevens":"Joe Thomas"*/} &nbsp;
        <FaRegBell />
        </Typography>


        <Typography variant="h6" sx={{color: '#000000', fontSize: '16px',padding:"0.3rem",borderRadius:"50%",backgroundColor:"#F0F0F0",marginLeft:"1rem",marginRight:"1rem",display:{xs:'none',md:'block'}}}>
        {/*user && user.userType === "business"?"Joe Thomas": user && user.lastName && user.firstName? user.lastName && user.firstName?user.firstName  + " " + user.lastName:"Norman Stevens":"Joe Thomas"*/} &nbsp;
        <BsChatText />
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>   
        </Box> 
      </StyledToolbar>
    </StyledRoot>
  );
}
