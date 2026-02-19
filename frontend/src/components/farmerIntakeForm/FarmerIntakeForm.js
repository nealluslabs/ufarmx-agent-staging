import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid, Button, Avatar, FormControl, MenuItem, Select, Typography, Divider, CardMedia, FormControlLabel, RadioGroup, Radio, Chip, Paper, Box, FormGroup, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// components
// /import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import { addNewDeposit, submitNewResponse, submitNewResponseIntake ,updateFormFields } from 'src/redux/actions/group.action';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { FaCamera, FaRegCheckCircle } from 'react-icons/fa';
import { TbCurrentLocation } from "react-icons/tb";


import 'react-phone-input-2/lib/style.css';  // Import the library's styles
import PhoneInput from 'react-phone-input-2';


import DEFAULTIMG from 'src/assets/images/rec.png';
import agentConfig from 'src/layouts/dashboard/nav/farmerConfig';

const schema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    searchInput: {
      background: 'white',
      border: '1px solid #00000026',
      padding: '0px',
      borderRadius: '8px',
      // marginRight: theme.spacing(2),
      width: '100%',
      minWidth: '100%',
      '& .MuiInputBase-input': {
       
        color:"black"
      },
      '& .MuiInputBase-input::placeholder': {
      
        color:"black"
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'grey',
        color:"black"
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'grey',
        color:"black"
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'grey',
        color:"black"
      },

    },
    searchButton: {
      color: '#fff',
      padding: '15px',
      minWidth: '45%',
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  }));


export default function FarmerIntakeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const { user } = useSelector((state) => state.auth);
 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])




  const inputContainer2 = {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    marginTop:"-0.2rem"
  };

  const inputContainer3 = {
    display: 'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    marginTop:"-0.2rem"
  };
  
  const mobileFieldWidthSx = {
    width: '100%',
    maxWidth: { xs: '100%', sm: '70%', md: '80%', lg: '100%' },
    alignSelf: { xs: 'flex-start', sm: 'flex-start' },
  };


  
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const {formInFocus} =useSelector((state) => state.group);
  //console.log("Form IN FOCUS------->",formInFocus)
 

 

  /*
  age: "50"
do_you_have_identification: "no"
do_you_sell_to_who: "market"
do_you_use_chemicals_what_chemical: "yes"
family_size: "8"
name_first__last: "Baba Aregbe"
phone_number: "8144057649"
size_of_farm: "8 acres"
take_a_picture: ""
typical_harvest_size: "45 bags"
what_crop_are_you_farming: "maize"
what_do_you_do_with_your_harvest: "sale and family use"
would_you_be_interested_in_organic_farming_and_training:"yes"
*/

const [step1, setStep1] = useState(true);
const [step2, setStep2] = useState(false);
const [step3, setStep3] = useState(false);


 
  

  
  const [picture, setPicture] = useState('');



 const [phone, setPhone] = useState('');


 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [otherNames, setOtherNames] = useState('');
 const [gender, setGender] = useState('');
 const [age, setAge] = useState('');
 const [maritalStatus, setMaritalStatus] = useState('');
 const [noOfSpouse, setNoOfSpouse] = useState('');
 const [noOfChildren, setNoOfChildren] = useState('');
 const [hasID, setHasID] = useState(false);
 const [idTpye, setIdTpye] = useState('');
 const [hasSmartphone, setHasSmartphone] = useState(false);
 const [farmingType, setFarmingType] = useState('');
 const [cropsLivestock, setCropsLivestock] = useState([]);
 const [currentCrops, setCurrentCrops] = useState('');
 const [farmSize, setFarmSize] = useState('');

 const [farmSizeUnit, setFarmSizeUnit] = useState('');

 const [farmLocation, setFarmLocation] = useState('');
 const [gpsLocation, setGpsLocation] = useState({ latitude: null, longitude: null });
 const [error, setError] = useState(null);

 const [whereDoYouSell, setWhereDoYouSell] = useState('');
 const [irrigation, setIrrigation] = useState(false);
 const [insurance, setInsurance] = useState(false);
 const [organicFarming, setOrganicFarming] = useState(false);
 const [farmingExperience, setFarmingExperience] = useState('');
 const [previousProduction, setPreviousProduction] = useState('');
 const [previousChemicals, setPreviousChemicals] = useState('');
 const [input, setInput] = useState('');
 const [previousCost, setPreviousCost] = useState('');
 const [challenges, setChallenges] = useState([]);

 //console.log("challenges is ---->",challenges)

 const [educationLevel, setEducationLevel] = useState('');
 const [offFarmIncome, setOffFarmIncome] = useState('');
 const [offFarmIncomeDetails, setOffFarmIncomeDetails] = useState('');
 const [landOwnership, setLandOwnership] = useState('');
 const [farmerGroups, setFarmerGroups] = useState('');
 const [farmerGroupMembershipDetails, setFarmerGroupMembershipDetails] = useState('');
 const [salesChannel, setSalesChannel] = useState('');
 const ageOptions = Array.from({ length: 76 }, (_, index) => index + 15); // Generates ages from 15 to 90


const getGeolocation = () =>{

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );

   // console.log("gps location gotten is-->",gpsLocation)
  } else {
    notifyErrorFxn("cannot get location, please try again!")
    setError('Geolocation is not supported by this browser.');

    //console.log("error from gps location is-->",error)
  }
}


  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();

  const [fields, setFields] = useState(formInFocus && formInFocus.fields);


   // Split the array into two halves
   const middleIndex = Math.ceil(formInFocus && formInFocus.fields &&  formInFocus.fields.length / 2);
   const firstHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(0, middleIndex);
   const secondHalf = formInFocus && formInFocus.fields &&  formInFocus.fields.slice(middleIndex);
 
   // Create form objects for each half
   const initialFormObject1 =firstHalf && firstHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   const initialFormObject2 = secondHalf && secondHalf.reduce((acc, curr) => {
     acc[curr.prompt] = ''; // Initialize each value to an empty string
     return acc;
   }, {});
 
   // State to manage form values for both halves
   const [formValues1, setFormValues1] = useState(initialFormObject1);
   const [formValues2, setFormValues2] = useState(initialFormObject2);
   const [bloodInv,setBloodInv] =  useState([])
   const [currentChallenge,setCurrentChallenge] =  useState([])
   const [bloodInvId,setBloodInvId] =  useState([])

  const initialFormObject = formInFocus && formInFocus.fields && formInFocus.fields.reduce((acc, curr) => {
    acc[curr.prompt] = ''; // Initialize each value to an empty string
    return acc;
  }, {});

  // State to manage form values
  const [formValues, setFormValues] = useState(initialFormObject);

  //console.log("FORM ID IS ===>",formInFocus &&formInFocus._id)
  const finalObject = 
    
   {
    form_id:formInFocus && formInFocus._id?formInFocus._id:"65a59487c662a50026d882b4",
    agent_user_id:user.user_id && user.user_id,
    agentId:user.agentId && user.agentId,
    admin_user_id:formInFocus &&formInFocus.user_id,
    last_updated_by:formInFocus &&formInFocus.user_id,
    is_deleted:false,
    responseObject:{
     firstName,
     lastName,
     otherNames,
     gender,
     age,
     maritalStatus,
     noOfChildren,
     noOfSpouse,
     hasID,
     idType:idTpye,
     hasSmartphone,
     farmingType,
     cropsLivestock,
     farmSize,
     farmSizeUnit,
     farmLocation,
     location:`${gpsLocation && gpsLocation.latitude},${gpsLocation && gpsLocation.longitude}`,
     whereDoYouSell,
     market:whereDoYouSell,
     irrigation,
     insurance,
     organicFarming,
     farmingExperience,
     previousProduction,
     previousChemicals,
     chemicals:previousChemicals,
     input,
     previousCost,
     challenges,
     educationLevel,
     offFarmIncome,
     offFarmIncomeDetails, 
     phone,
     landOwnership,
     farmerGroups, 
     farmerGroupMembershipDetails,
     salesChannel

    }
   }

  const handleChange1 = (promptKey) => (e) => {
    setFormValues1({
      ...formValues1,
      [promptKey]: e.target.value,
    });
  };

  const handleChange2 = (promptKey) => (e) => {
    setFormValues2({
      ...formValues2,
      [promptKey]: e.target.value,
    });
  };



  

  const handlePromptChange = (id, newPrompt) => {
    
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, name: newPrompt }; 
      }
      return field; 
    });

    
    setFields(updatedFields);
  };

  const stateSetters = {
    setPhone,
    setFirstName,
    setLastName,
    setOtherNames,
    setGender,
    setAge,
    setMaritalStatus,
    setNoOfSpouse,
    setNoOfChildren,
    setHasID,
    setIdTpye,
    setHasSmartphone,
    setFarmingType,
    setCropsLivestock,
    setCurrentCrops,
    setFarmSize,
    setFarmSizeUnit,
    setFarmLocation,
    setGpsLocation,
    setWhereDoYouSell,
    setIrrigation,
    setInsurance,
    setOrganicFarming,
    setFarmingExperience,
    setPreviousProduction,
    setPreviousChemicals,
    setInput,
    setPreviousCost,
    setChallenges,
    setEducationLevel,
    setOffFarmIncome,
    setOffFarmIncomeDetails,
    setLandOwnership,
    setFarmerGroups,
    setFarmerGroupMembershipDetails,
    setSalesChannel
  };


  const submitResponse = (updatedFields,photo) =>{
    //console.log("PROCESS BEGUN--->")
    setLoading(true)
   
    if(gpsLocation.longitude === null ||gpsLocation.latitude === null ){
      notifyErrorFxn("Please Fetch Co-ordinates, before Submitting!")
      return
     }
     else if(!photo){
       notifyErrorFxn("Please Upload a photo before submitting!")
       return
     }
else{
   dispatch(submitNewResponseIntake(updatedFields,photo,setStep1,setStep2,setStep3,stateSetters))
}
  setTimeout( ()=>{setLoading(false) },2500)
 
  }

  const handleDelete = (tbr,tbrId) => {
    

    let placeholder =   challenges.filter((item)=>(item !== tbr))
   //let placeholder2 =   challengesId.filter((item)=>(item !== tbrId))


     setChallenges([...placeholder])
    //setBloodInvId([...placeholder2])
 };


 const handleDeleteCrops = (tbr,tbrId) => {
    

  let placeholder =   cropsLivestock.filter((item)=>(item !== tbr))
 //let placeholder2 =   challengesId.filter((item)=>(item !== tbrId))


   setCropsLivestock([...placeholder])
  //setBloodInvId([...placeholder2])
};

 

 

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
    setPicture(event.target.files[0].name);
};

 



 

  return (
    <>
    {step1 &&

      <form >


<>
 
     <Grid
       container
       xs={12}
       spacing={2}
       sx={{ width: { xs: '100%', md: '1000px' }, px: { xs: 0, sm: 2, md: 0 }, boxSizing: 'border-box', mt: {xs:2} }}
       style={{display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}
     >  
    
    
    
      <>
     <Grid item xs={12}style={{maxWidth:{md:"1000px", xs:'100%'},width:{md:"100%", sm: '210%'},display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center"}}>
          <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
            Farmer's Personal Information
          </Typography>


          <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
  </Grid>
  

    </>
  
     
     <Grid item xs={12} spacing={2} style={{marginTop:"-3rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
           
          
          
            
           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
              <CardMedia
                style={{ border: '0px solid black', backgroundColor: '#F2F4F7', width: '150px',borderRadius:"50%" }}
                component="img"
                height="150"
                width="150"
                image={file ? file : imageUrl !== "" ? imageUrl : DEFAULTIMG}
                alt="IMG"
              />
              <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#0A6054', marginTop: '15px' }}>
              <FaCamera style={{marginRight:"0.5rem",color:"white"}} /> <b>Take Photo</b>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleselectedFile}
                />
              </Button>
            </div>
    
    
    
            </Grid>

   <>

   <Grid container sx={{display:"flex",justifyContent:"center",flexDirection:{xs:"column",sm:"row"},gap:{md:"3rem"},alignItems: { xs: "flex-start", sm: "flex-start" }, pl:{xs:2}}}>
     <Grid item sm={fields && fields.length < 2 ?12:5 }  xs={12} sx={{width: {xs: '100%'}}}   > 
       <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"flex-start",sm:"flex-start"},justifyContent:"center"}}  >
   


          <TextField
          label={'First Name'}
          value={firstName}
          onChange={(e)=>{setFirstName(e.target.value)}}
          sx={{ color: 'black',maxWidth:"100%",height:"4rem" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

       {isMobile && (
        <TextField
          label={'Last Name'}
          value={lastName}
          onChange={(e)=>{setLastName(e.target.value)}}
          sx={{ color: 'black',maxWidth:"100%",height:"4rem" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
       )}

       <TextField
          label={'Other Names'}
          value={otherNames}
          onChange={(e)=>{setOtherNames(e.target.value)}}
          sx={{ color: 'black',maxWidth:"100%",height:"4rem" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

       <TextField
          label={'Date of Birth'}
          type="date"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{ color: 'black',width:{xs:"100%",sm:"100%",md:"80%",lg:"100%"},height:"4rem" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
        />




{ isMobile && <Select  
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={gender}
          label="Gender"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Gender</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>Gender</MenuItem>   
  <MenuItem  value={"Male"}>Male</MenuItem>
  <MenuItem   value={"Female"}>Female</MenuItem>
  

       
        </Select>}


        {isMobile &&
          <Select
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" }}
         inputProps={{
          style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
        
      }}
        
          labelId="hi-label"
          id="hi"
          value={maritalStatus}
          label="Marital Status"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Marital Status</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setMaritalStatus(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"Single"}>Single</MenuItem>
  <MenuItem   value={"Married"}>Married</MenuItem>
  <MenuItem   value={"Divorced"}>Divorced</MenuItem>

       
        </Select>}
        

         
      {isMobile &&   <TextField
          label={'Number of Spouse'}
          value={noOfSpouse}
          
          onChange={(e)=>{setNoOfSpouse(e.target.value)}}
          sx={{ color: 'black',maxWidth:"100%",height:"4rem" }}
          InputLabelProps={{ shrink: true , 
         
         }}
          InputProps={{
            style: { paddingLeft: '1rem', color: 'gray',backgroundColor:"#F9FAFB",height:"4rem",paddingRight:"1rem", },
          }}
          
          variant="outlined"
          fullWidth
          margin="normal"
        />}


    {isMobile && <Select
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" }}
         inputProps={{
          style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={noOfChildren}
          label="No of Children"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>No of Children</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setNoOfChildren(event.target.value);
          }}
        >
       
  <MenuItem disabled value={"0"}>0</MenuItem>   
  <MenuItem  value={"1"}>1</MenuItem>
  <MenuItem   value={"2"}>2</MenuItem>
  <MenuItem   value={"3"}>3</MenuItem>
  <MenuItem   value={"4"}>4</MenuItem>
  <MenuItem   value={"5"}>5</MenuItem>
  <MenuItem   value={"6"}>6</MenuItem>

       
        </Select>}
 


      
      {!isMobile &&   <TextField
          label={'Number of Spouse'}
          value={noOfSpouse}
          
          onChange={(e)=>{setNoOfSpouse(e.target.value)}}
          sx={{ color: 'black',maxWidth:"100%",height:"4rem" }}
          InputLabelProps={{ shrink: true , 
         
         }}
          InputProps={{
            style: { paddingLeft: '1rem', color: 'gray',backgroundColor:"#F9FAFB",height:"4rem",paddingRight:"1rem", },
          }}
          
          variant="outlined"
          fullWidth
          margin="normal"
        />}
        


             <Box sx={{ width: { xs: '100%', sm: '100%', md: '80%', lg: '100%' }, maxWidth: '20rem', alignSelf: { xs: 'flex-start', sm: 'flex-start' }, marginTop:"3.2rem" }}>
                   ID (Government Identification)*
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value={true}  control={<Radio  onChange={(e)=>{setHasID(true)}}  style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value={false} control={<Radio  onChange={(e)=>{setHasID(false)}} style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </Box>


                {isMobile && <Select
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" }}
         inputProps={{
          style: {paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={idTpye}
          label="ID type"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>ID type</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setIdTpye(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}></MenuItem>   
  <MenuItem  value={"Passport"}>Passport</MenuItem>
  <MenuItem   value={"National Identification"}>National Identification</MenuItem>
  <MenuItem   value={"Drivers License"}>Drivers License</MenuItem>

       
        </Select>}


     



                <Box sx={{ width: { xs: '100%', sm: '70%', md: '80%', lg: '100%' }, maxWidth: '20rem', alignSelf: { xs: 'flex-start', sm: 'flex-start' }, marginTop:"1rem" }}>
                   Do you have a smartphone ?*
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue={true}
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value={true} control={<Radio onChange={(e)=>{setHasSmartphone(true)}}  style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value={false}  control={<Radio onChange={(e)=>{setHasSmartphone(false)}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </Box>



                {isMobile &&

<Paper sx={{ width: {xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%"  }}>
<PhoneInput
  country={'us'} // Default country (you can change to any valid country code)
  value={phone}
  onChange={setPhone} // Update the phone number on change
  enableSearch={true} // Allow users to search for countries
  placeholder="Enter phone number"
  inputStyle={{
    backgroundColor: "#F9FAFB",height:"4rem", // Match your input background color
    width: '100%',
    height: '4rem',
    borderRadius: '0.1rem',
    paddingLeft: '3rem',
    color: 'black', 
  }}
  buttonStyle={{
    backgroundColor: "#FFFFFF", // Match the select button background
    borderRadius: '0.1rem',
    height:"4rem",
  }}
  containerStyle={{
    width: '100%',
   
  }}
/>
</Paper>
        }

        
  
      </Stack>
      </Grid> 
      
    
       <Grid item sm={fields && fields.length < 2 ?12:5 }  xs={12}   > 
       <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"stretch",sm:"flex-start"},justifyContent:"center", width:{xs:'100%', sm:'auto'}}} >
      
        {!isMobile && (
        <TextField
          label={'Last Name'}
          value={lastName}
          onChange={(e)=>{setLastName(e.target.value)}}
          sx={{ color: 'black',maxWidth:"100%",height:"4rem" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        )}

{ !isMobile && <Select  
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={gender}
          label="Gender"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Gender</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setGender(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>Gender</MenuItem>   
  <MenuItem  value={"Male"}>Male</MenuItem>
  <MenuItem   value={"Female"}>Female</MenuItem>
  

       
        </Select>}

        
 

 
{!isMobile && <Select
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" }}
         inputProps={{
          style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
        
      }}
        
          labelId="hi-label"
          id="hi"
          value={maritalStatus}
          label="Marital Status"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Marital Status</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setMaritalStatus(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"Single"}>Single</MenuItem>
  <MenuItem   value={"Married"}>Married</MenuItem>
  <MenuItem   value={"Divorced"}>Divorced</MenuItem>

       
        </Select>}
 

 


        
 {!isMobile && <Select
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" }}
         inputProps={{
          style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={noOfChildren}
          label="No of Children"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>No of Children</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setNoOfChildren(event.target.value);
          }}
        >
       
  <MenuItem disabled value={"0"}>0</MenuItem>   
  <MenuItem  value={"1"}>1</MenuItem>
  <MenuItem   value={"2"}>2</MenuItem>
  <MenuItem   value={"3"}>3</MenuItem>
  <MenuItem   value={"4"}>4</MenuItem>
  <MenuItem   value={"5"}>5</MenuItem>
  <MenuItem   value={"6"}>6</MenuItem>

       
        </Select>}

 
{!isMobile && <Select
          sx={{...mobileFieldWidthSx, width:{xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%", backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB" }}
         inputProps={{
          style: {paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={idTpye}
          label="ID type"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>ID type</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setIdTpye(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}></MenuItem>   
  <MenuItem  value={"Passport"}>Passport</MenuItem>
  <MenuItem   value={"National Identification"}>National Identification</MenuItem>
  <MenuItem   value={"Drivers License"}>Drivers License</MenuItem>

       
        </Select>}


        {!isMobile &&

<Paper sx={{ width: {xs:'100%', sm:'100%'}, alignSelf:{xs:'stretch', sm:'flex-start'}, maxWidth:"100%"  }}>
<PhoneInput
  country={'us'} // Default country (you can change to any valid country code)
  value={phone}
  onChange={setPhone} // Update the phone number on change
  enableSearch={true} // Allow users to search for countries
  placeholder="Enter phone number"
  inputStyle={{
    backgroundColor: "#F9FAFB",height:"4rem", // Match your input background color
    width: '100%',
    height: '4rem',
    borderRadius: '0.1rem',
    paddingLeft: '3rem',
    color: 'black',
  }}
  buttonStyle={{
    backgroundColor: "#FFFFFF", // Match the select button background
    borderRadius: '0.1rem',
    height:"4rem",
  }}
  containerStyle={{
    width: '100%',
   
  }}
/>
</Paper>
        }


        
  
      </Stack>




  
      </Grid> 
   </Grid>
   </>   
 
  
     
      </Grid> 


      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
     
      </Stack>
     
   
 
 </>

   




 
<>
     
<Grid
  item
  xs={12}
  sx={{ marginLeft: { xs: 0, sm: '2.5rem' }, width: { xs: '100%', sm: '90%' } }}
  style={{maxWidth:"1000px",display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center",marginBottom:"2.5rem"}}
>
          <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
            Farm Information
          </Typography>


          <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
  </Grid>

  <Grid container spacing={2} xs={12} sx={{display:"flex",alignItems:"flex-start",flexDirection:{xs:"column",sm:"row"},justifyContent:"center",gap:"2rem", alignItems: { xs: "flex-start", sm: "flex-start" }, width: { xs: '110%', }}} > 
    <Grid item xs={12} sm={5} sx={{width:{xs:'100%'}}}> 
       <Stack spacing={3}   sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"flex-start",sm:"flex-start"},justifyContent:"center"}} >

  <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem", maxWidth:"100%" }}
         inputProps={{
          style: {paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={farmingType}
          label="Farming Type"
          fullWidth
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Farming type</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setFarmingType(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"manual"}>manual</MenuItem>
  <MenuItem   value={"mechanized"}>mechanized</MenuItem>
 

       
        </Select>

        <div style={{marginTop:"3.2rem"}}>
                   Farm Size (Acre / Hectare) 
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"

                   >


                      <FormControlLabel value="Acre" control={<Radio onClick={(event) => {  setFarmSizeUnit("Acre");}}    style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Acre </Typography>} />
                     <FormControlLabel  value="Hectare" control={<Radio onClick={(event) => {  setFarmSizeUnit('Hectare');}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>Hectare</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

            </div>
 

 
 <Grid container xs={12} sm={10} style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"2rem"}} >

  <Grid item xs={12} sm={6}>
  {/*<Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem"}}
         inputProps={{
          style: { height: '3rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
        
      }}
        
          labelId="hi-label"
          id="hi"
          value={farmLocation}
          label="Marital Status"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Farm Location(GPS)</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setFarmLocation(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"Senegal"}>Senegal</MenuItem>
  <MenuItem   value={"Nigeria"}>Nigeria</MenuItem>
  <MenuItem   value={"Cameroon"}>Cameroon</MenuItem>

       
    </Select>*/}

       <TextField
          key={"promptKey"}
          label={'Farm Location(GPS)'}
          value={gpsLocation.latitude===null && gpsLocation.longitude===null?'': gpsLocation.latitude + ", " + gpsLocation.longitude}
         
          style={{ color: 'black' }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
    </Grid>

    <Grid item xs={12} sm={2} style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
      <Button onClick={()=>{getGeolocation()}}
       component="label" variant="contained" style={{ minHeight: '45px', minWidth: '110px',color:"#0A6054", backgroundColor: 'white', marginTop: '0px',border:"1px solid #0A6054" }}>
              <TbCurrentLocation style={{marginRight:"0.5rem",color:"#0A6054"}} /> Get Gps
               
      </Button>
    </Grid>
  
    
  </Grid>  
    
    


            <div style={{marginTop:"3.2rem"}}>
                   Do you have insurance ?
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value={true} control={<Radio onClick={(event) => {  setInsurance(true);}}   style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value={false} control={<Radio  onClick={(event) => {  setInsurance(false);}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </div>
 
  
                <TextField
          key={"promptKey"}
          label={'Previous Production'}
          value={previousProduction}
          onChange={(event) => {  setPreviousProduction(event.target.value);}} 
          sx={{ color: 'black',maxWidth:"100%" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        
   <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%", height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem",maxWidth:"100%"}}
         inputProps={{
          style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={whereDoYouSell}
          label="Where do you sell your products?"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Where do you sell your products?</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setWhereDoYouSell(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"Market"}>Market</MenuItem>
  <MenuItem   value={"Harbour"}>Harbour</MenuItem>
  <MenuItem   value={"Reseller"}>Reseller</MenuItem>
  

       
        </Select>

 
  <Select
          sx={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%",marginLeft:{xs:"0%",sm:"0%"}, maxWidth:"100%",height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem"}}
         inputProps={{
          style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="his-label"
          id="his"
          value={farmingExperience}
          label="Farming Exp"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Farming Experience</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setFarmingExperience(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"1 Year"}>1 Year</MenuItem>
  <MenuItem  value={"2 Years"}>2 Years</MenuItem>
  <MenuItem  value={"3 Years"}>3 Years</MenuItem>
  <MenuItem  value={"4 Years"}>4 Years</MenuItem>
  <MenuItem  value={"5 Years"}>5 Years</MenuItem>
  <MenuItem  value={"6 Years"}>6 Years</MenuItem>
  <MenuItem  value={"7 Years"}>7 Years</MenuItem>
  <MenuItem  value={"8 Years"}>8 Years</MenuItem>
  <MenuItem  value={"9 Years"}>9 Years</MenuItem>
  <MenuItem  value={"10 Years"}>10 Years</MenuItem>
  <MenuItem  value={"11 Years"}>11 Years</MenuItem>
  <MenuItem  value={"12 Years"}>12 Years</MenuItem>
  <MenuItem  value={">12 Years"}> Greater than 12 Years</MenuItem>

       
        </Select>



        
  
      </Stack>

      </Grid> 

      <Grid item sm={5} xs={12} sx={{display:"flex",justifyContent:"flex-start",alignItems:{xs:"flex-start",sm:"flex-start"}, width:{xs:'100%'}}}> 
       <Stack spacing={3} sx={{minWidth:{xs:"100%",sm:"100%"},paddingTop:"0rem", display:"flex", alignItems:{xs:"flex-start" ,sm:"flex-start"},justifyContent:{xs:"flex-start",sm:"flex-start"}}}  >
          <Box sx={{width: {xs: '100%'}}}>

            <TextField
                key={"promptKey"}
                label={'Crops/Livestock'}
                value={currentCrops}
                placeholder={"Press Enter to add a new produce"}

                InputProps={{
                  style: { paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
                }}
              onChange={(e)=>{
                    
                setCurrentCrops(e.target.value)

              }}


              onKeyPress={(e) => {
                if (e.key === "Enter") {
                    if (!cropsLivestock.includes(e.target.value)) {
                        setCropsLivestock([...cropsLivestock, e.target.value]);
                        setCurrentCrops('');
                    }
                }
            }}
                sx={{  color: 'black' }}
                InputLabelProps={{ shrink: true }}
               
                variant="outlined"
                fullWidth
                // margin="normal"
              />
          </Box>


    <Grid item xs={12} style={{width:"100%"}}>
      {
     <Box sx={{maxWidth:{xs:"25rem",sm:"70%",md:"80%",lg:"100%",height:"4rem"},padding: '10px', border: '1px solid #00000033' }}>
              <> 
                 &nbsp; 
               {  cropsLivestock.map((chipItem,index)=>(
              <Chip label={chipItem} onClick={()=>{}} onDelete={()=>{handleDeleteCrops(chipItem,bloodInvId[index])}} />
              ))
                }

              </>
     </Box>
              }
       </Grid>



   <TextField
          key={"promptKey"}
          label={'Farm Size'}
          value={farmSize}
          onChange={(e)=>{setFarmSize(e.target.value)}}
          sx={{ color: 'black' }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />



        <Box sx={{ ...mobileFieldWidthSx, marginTop:"3.2rem" }}>
                   Do you Use Irrigation ?
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value="Entry Level(3yrs or less)" control={<Radio onClick={(e)=>{setIrrigation(true)}} style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value="Mid-level (3yrs - 5yrs)" control={<Radio onClick={(e)=>{setIrrigation(false)}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </Box>


                <Box sx={{ ...mobileFieldWidthSx, marginTop:"3.2rem" }}>
                   Organic Farming 
                  <div style={inputContainer2}>
                  <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
                   {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
                   <RadioGroup  style={{color:"grey",flexDirection:"row"}}
                     aria-labelledby="demo-radio-buttons-group-label"
                     defaultValue="female"
                     name="radio-buttons-group"
                   >
                      <FormControlLabel value="Entry Level(3yrs or less)" control={<Radio onClick={(e)=>{setOrganicFarming(true)}}  style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Yes </Typography>} />
                     <FormControlLabel  value="Mid-level (3yrs - 5yrs)" control={<Radio onClick={(e)=>{setOrganicFarming(false)}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>No</Typography>}  />
                    
                     
                   </RadioGroup>
                 </FormControl>

                 {/** PASTE HERE!! */}
                  </div>

                </Box>
 

 
  <Select
          sx={{...mobileFieldWidthSx,backgroundColor:"#FFFFFF",borderRadius:"0.6rem", height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
        
      }}
        
          labelId="hi-label"
          id="hi"
          value={previousChemicals}
          label="Previous Chemicals used"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Previous Chemicals Used?</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setPreviousChemicals(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"NPK-15-15-15"}>NPK-15-15-15</MenuItem>
  <MenuItem   value={"NPK-30-15-30"}>NPK-30-15-30</MenuItem>
  <MenuItem   value={"NPK-30-30-30"}>NPK-30-30-30</MenuItem>

       
        </Select>


       
 
  

        
 <Select
          sx={{...mobileFieldWidthSx,backgroundColor:"#FFFFFF",borderRadius:"0.6rem", height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB"}}
         inputProps={{
          style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={input}
          label="No of Children"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Input</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        >
       
  <MenuItem disabled value={""}>select</MenuItem>   
  <MenuItem  value={"NPK-15-15-15"}>NPK-15-15-15</MenuItem>
  <MenuItem   value={"NPK-30-15-15"}>NPK-30-15-15</MenuItem>
  <MenuItem   value={"NPK-15-15-30"}>NPK-15-15-30</MenuItem>

       
        </Select>


        <TextField
          key={"promptKey"}
          label={'Previous Cost'}
          value={previousCost}
          onChange={(e)=>{setPreviousCost(e.target.value)}}
            sx={{ color:'black' ,maxWidth:"100%"}}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />


        
  
      </Stack>

       </Grid> 
      </Grid> 

     


<Grid container item xs={12} spacing={2} sx={{minWidth:{xs:"100%",sm:"105%"}, display:"flex", alignItems:{xs:"flex-start" ,sm:"flex-start"},justifyContent:{xs:"flex-start",sm:"flex-start"},marginLeft:{xs:"-1rem",sm:"3rem"} }}>
<Grid item xs={3}>
  <Typography  style={{display:"flex",alignItems:"center",justifyContent:"center"}}variant="p" component="p">
   <div >
 
   </div>

  </Typography>

</Grid>



<Grid item  xs={11.5} sm={10} style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start"}}>
   <TextField
          key={"Challenges"}
          label={'Challenges'}
          placeholder={"Press Enter to add a new challenge"}
          value={currentChallenge}
          InputProps={{
            style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          onChange={(e)=>{
            
    
            setCurrentChallenge(e.target.value)


          }}


          onKeyPress={(e) => {
            if (e.key === "Enter") {
                if (!challenges.includes(e.target.value)) {
                    setChallenges([...challenges, e.target.value]);
                    setCurrentChallenge('');
                }
            }
        }}
          sx={{ color:'black',width:"100%" }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: { height: '4rem', paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",height:"4rem" },
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
 </Grid>


<Grid item sm={10.6} xs={12} style={{width:"100%"}}>
      {
     <Box sx={{height:"4rem",width:{xs:"20.3rem",sm:"70%",md:"90%",lg:"100%"},padding: '10px', border: '1px solid #00000033',marginLeft:{xs:"0rem",sm:"9rem",md:"3rem",lg:"0rem"} }}>
              <> 
                 &nbsp; 
               {  challenges.map((chipItem,index)=>(
              <Chip label={chipItem} onClick={()=>{}} onDelete={()=>{handleDelete(chipItem,bloodInvId[index])}} />
              ))
                }

              </>
     </Box>
              }
  </Grid>


  <Grid container spacing={1} xs={12} sx={{display:"flex",alignItems:"flex-start",flexDirection:{xs:"column",sm:"row"},justifyContent:"flex-start",gap:"0.3rem",marginTop:"0.5rem",position:"relative",left:"1.3rem"}} > 
      <Grid item xs={12} sm={5} > 
      <Stack spacing={3} sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"flex-start",sm:"flex-start"},justifyContent:"center"}} >
      
               <div style={{marginTop:"0.7rem"}}>
                   Education / Training
                   <p style={{display:"block",fontWeight:"400"}}>
                    Select all applicable eduction and training
                   </p>
                  <div style={inputContainer3}>


                 

<FormControl
  style={{
    position: "relative",
    left: "-0rem",
    top: "-0rem",
    scale: "0.9",
  }}
>
  <FormGroup style={{ color: "grey", flexDirection: "column" }}>
    <FormControlLabel
      control={
        <Checkbox
          onChange={(event) => setEducationLevel((prev) => ({ ...prev, basicLiteracy:true /*event.target.checked*/ }))}
          style={{ color: "grey" }}
        />
      }
      label={
        <Typography style={{ fontFamily: "Public Sans, sans-serif", position: "relative" }}>
          Basic Literacy
        </Typography>
      }
    />

    <FormControlLabel
      control={
        <Checkbox
          onChange={(event) => setEducationLevel((prev) => ({ ...prev, agriculturalTraining:true /*event.target.checked*/ }))}
          style={{ color: "grey" }}
        />
      }
      label={
        <Typography style={{ fontFamily: "Public Sans, sans-serif", position: "relative" }}>
          Agricultural Training
        </Typography>
      }
    />
  </FormGroup>
</FormControl>





       {/** PASTE HERE!! */}
        </div>
      </div>



        <Box sx={{ ...mobileFieldWidthSx, marginTop:"3rem" }}>

          <p style={{fontWeight:"500"}}> 
         Land Ownership
         </p>

        <div style={inputContainer3}>
        <FormControl style={{position:"relative",left:"-0rem",top:"-0rem",scale:"0.9"}}>
         {/*<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>*/}
         <RadioGroup  style={{color:"grey",flexDirection:"column"}}
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="female"
           name="radio-buttons-group"
         >
            <FormControlLabel value={"Owns"} control={<Radio onClick={(event) => {  setLandOwnership("Owns");}}   style={{color:"grey"}} />}  label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative"}}>Owns </Typography>} />
           <FormControlLabel  value={"Long Term Lease"} control={<Radio  onClick={(event) => {  setLandOwnership("Long Term Lease");}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>Long Term Lease</Typography>}  />
           <FormControlLabel  value={"Seasonal Lease"} control={<Radio  onClick={(event) => {  setLandOwnership("Seasonal Lease");}}  style={{color:"grey"}} />} label={<Typography style={{fontFamily:"Public Sans, sans-serif",position:"relative",}}>Seasonal Lease</Typography>}  />
           
         </RadioGroup>
       </FormControl>
       {/** PASTE HERE!! */}
        </div>
      </Box>



           




              <Select
          sx={{...mobileFieldWidthSx,backgroundColor:"#FFFFFF",borderRadius:"0.1rem", height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB", borderRadius:"0.6rem",width:"95%"}}
         inputProps={{
          style: {height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",borderRadius:"0.8rem" },
         
      }}
        
          labelId="hi-label"
          id="hi"
          value={whereDoYouSell}
          label="Sales Channel"
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{color:"lightgray"}}>Sales Channel</em>;
            }

            return selected;
          }}
          onChange={(event) => {
            setWhereDoYouSell(event.target.value);
          }}
        >
       
            <MenuItem disabled value={""}>select</MenuItem>   
            <MenuItem  value={"Contract Buyer/Cooperative"}>Contract Buyer/Cooperative</MenuItem>
            <MenuItem   value={"Open Market Regular Buyers"}>Open Market Regular Buyers</MenuItem>
            <MenuItem   value={"Local/occasional marker only"}>Local/occasional marker only</MenuItem>
  

       
        </Select>
        <p style={{marginTop:"0.5rem"}}>
         Select the primary sales channel for this farmer
        </p>

      </Stack>
      </Grid>

       <Grid item xs={12} sm={5}> 
       <Stack spacing={3} sx={{minHeight:"100%",paddingTop:"0rem", display:"flex", alignItems:{xs:"flex-start",sm:"flex-start"},justifyContent:"center"}} >
        

       <Box sx={{ ...mobileFieldWidthSx, marginTop:"0.7rem" }}>
                   
                   <p style={{display:"block",fontWeight:"400",width:"80%"}}>
                    Check if farmer has secondary trade or job
                   </p>
                  <div style={inputContainer3}>
             
             
                              
             
             <FormControl
               style={{
                 position: "relative",
                 left: "-0rem",
                 top: "-0rem",
                 scale: "0.97",
                 width:"100%"
               }}
             >
               <FormGroup style={{ color: "grey", flexDirection: "column" }}>
                 <FormControlLabel
                   control={
                     <Checkbox
                       onChange={(event) => setOffFarmIncome(event.target.checked)}
                       style={{ color: "grey" }}
                     />
                   }
                   label={
                     <Typography style={{ fontFamily: "Public Sans, sans-serif", position: "relative", }}>
                       Off-farm Income
                     </Typography>
                   }
                 />
             
                 {/**DAGOGO - ADD TEXTFIELD SECONDARY TRADE OR JOB */}
                     <p style={{marginBottom:"0.3rem",fontWeight:"500",color:"black"}}>
                     Off-Farm Income Details
                     </p>
             
                 <TextField
                       key={"promptKey"}
                       label={'Describe secondary trade or job'}
                       value={offFarmIncomeDetails}
                       onChange={(e)=>{setOffFarmIncomeDetails(e.target.value)}}
                        sx={{ ...mobileFieldWidthSx, color:'black', width:{ xs: '95%', sm: '100%' }}}
                       InputLabelProps={{ shrink: true }}
                       InputProps={{
                         style: { height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",width:"95%" },
                       }}
                       variant="outlined"
                       fullWidth
                       margin="normal"
                     />
             
                 
               </FormGroup>
             </FormControl>
             
             
             
             
             
                    {/** PASTE HERE!! */}
                     </div>
      </Box>




      <div style={{marginTop:"0rem",width:"100%"}}>
                   
                   <p style={{display:"block",fontWeight:"400",width:"80%"}}>
                    Check if farmer is a member of any groups or cooperatives
                   </p>
                  <div style={inputContainer3}>
             
             
                              
             
             <FormControl
               style={{
                 position: "relative",
                 left: "-0rem",
                 top: "-0rem",
                 scale: "0.97",
                 width:"100%"
               }}
             >
               <FormGroup style={{ color: "grey", flexDirection: "column",width:"100%" }}>
                 <FormControlLabel
                   control={
                     <Checkbox
                       onChange={(event) => setFarmerGroups(event.target.checked  )}
                       style={{ color: "grey" }}
                     />
                   }
                   label={
                     <Typography style={{ position: "relative",fontSize:"0.9rem",color:"black" }}>
                       Membership in Farmer Groups / Coops
                     </Typography>
                   }
                 />
             
                 {/**DAGOGO - ADD TEXTFIELD SECONDARY TRADE OR JOB */}
                     <p style={{marginBottom:"0.3rem",color:"black",fontWeight:"500"}}>
                     Membership Details
                     </p>
             
                 <TextField
                       key={"promptKey"}
                       label={'Name of groups or cooperatives'}
                       value={farmerGroupMembershipDetails}
                       onChange={(e)=>{setFarmerGroupMembershipDetails(e.target.value)}}
                        sx={{ width:{ xs: '95%', sm: '30rem' },color:'black' ,maxWidth:"100%"}}
                         
                       InputLabelProps={{ shrink: true }}
                       InputProps={{
                         style: { height:"4rem", paddingLeft: '1rem', color: 'black',backgroundColor:"#F9FAFB",width:"95%"},
                       }}
                       variant="outlined"
                       fullWidth
                       margin="normal"
                     />
             
                 
               </FormGroup>
             </FormControl>
             
             
             
             
             
                    {/** PASTE HERE!! */}
                     </div>
      </div>





       </Stack>
       </Grid>

</Grid>



</Grid>





      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>
     
      </Stack>


       <Stack sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:{xs:"column",sm:"column",md:"row"},gap:"1rem"}}>

       {<LoadingButton 
        
        onClick={()=>{navigate(-1)}}
        size="large" type="button" variant="contained" disabled={loading} sx={{marginRight:{xs:"0rem",sm:"0rem",md:"0rem"},fontWeight:"500",color: '#21712E',backgroundColor: '#F2F4F7', border:"1px solid #21712E",width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},borderRadius:"0.5rem"}}>
       
        { "Back"}
      </LoadingButton>}
     

       <LoadingButton 
        
        onClick={()=>{ setStep1(false); setStep2(true); setStep3(false) }}
        size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",fontWeight:"500",maxWidth:{xs:"20rem",sm:"29rem"},color: 'white',backgroundColor: '#0A6054',borderRadius:"0.5rem"}}>
       
        {loading ? "Loading..." : "Continue"}
      </LoadingButton>


     
      </Stack>
      
 </>


      </form>
  }




{step2 &&

<form >


<>

<Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  



<>
<Grid item xs={12}style={{maxWidth:"1000px",width:"90%",display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center"}}>
    <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
      Farmer's Personal Information
    </Typography>


    <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
</Grid>


</>


<Grid item xs={12} spacing={2} style={{marginTop:"-3rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
     
    
    
      
     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        <CardMedia
          style={{ border: '0px solid black', backgroundColor: '#F2F4F7', width: '150px',borderRadius:"50%" }}
          component="img"
          height="150"
          width="150"
          image={file ? file : imageUrl !== "" ? imageUrl : DEFAULTIMG}
          alt="IMG"
        />
        {/*<Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#0A6054', marginTop: '15px' }}>
        <FaCamera style={{marginRight:"0.5rem",color:"white"}} /> <b>Take Photo</b>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleselectedFile}
          />
        </Button>*/}
      </div>



      </Grid>

<>

<Grid item xs={12} sm={fields && fields.length < 2 ?12:5 }  style={{display:"flex",alignItems:"center",justifyContent:"center"}}  > 
 <Stack spacing={3}  sx={{minHeight:"100%",paddingTop:"0rem",paddingLeft:{xs:"0rem",sm:"1.5rem"},marginLeft:{xs:"-1.5rem",sm:"0rem"}, display:"flex", alignItems:"flex-start",justifyContent:"flex-start"}}  >



          <div style={{display:"inline-flex"}}>Full Name:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{firstName + " " + otherNames + " " + lastName}</span></div>

          <div style={{display:"inline-flex"}}>Date of Birth:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{age}</span></div>


            <div style={{display:"inline-flex"}}>No of Spouse:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{noOfSpouse}</span></div>


            <div style={{display:"inline-flex"}}>Smart Phone:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{hasSmartphone?"Yes":"No"}</span></div>

         <div style={{display:"inline-flex"}}>Phone Number:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{phone}</span></div>


</Stack>
</Grid> 


<Grid item xs={12} sm={5} style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
 <Stack  spacing={3} sx={{marginLeft:{xs:"0rem",sm:"-6rem"}}}>
 

 <div style={{display:"inline-flex"}}>Gender :&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{gender}</span></div>

<div style={{display:"inline-flex"}}>Marital Status:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{maritalStatus}</span></div>



  <div style={{display:"inline-flex"}}>No of Children:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{noOfChildren}</span></div>



  
  <div style={{display:"inline-flex"}}>ID:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{hasID?"Yes":"No"}</span></div>


 


  {

<div style={{display:"inline-flex"}}>Farming Experience:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmingExperience}</span></div>
  }


  

</Stack>





</Grid> 

</>   



</Grid> 


<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

</Stack>



</>







<>

<Grid item xs={12} style={{maxWidth:"1000px",width:"90%",display:"flex",flexDirection:"column",alignItems:"flex-start", justifyContent:"center",marginLeft:"2.5rem"}}>
    <Typography color="textPrimary" variant="p" component="p" style={{ color: '#000000',position:"relative" }}>
      Farm Information
    </Typography>


    <Divider sx={{width:"100%", backgroundColor:"#90C434"}}/>
</Grid>

<Grid container xs={12} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"3rem",marginTop:"3rem"}} > 
<Grid item  sm={5} xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}} > 
 <Stack spacing={3} >

         <div style={{display:"inline-flex"}}>Farming Type:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{"Crop"}</span></div>

         <div style={{display:"inline-flex"}}>Farm size:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmSize}</span></div>


          <div style={{display:"inline-flex"}}>Irrigation:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{irrigation?"Yes":"No"}</span></div> 




          <div style={{display:"inline-flex"}}>Organic Farming:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{organicFarming?"Yes":"No"}</span></div>


          <div style={{display:"inline-flex"}}>Previous chemicals use:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{previousChemicals}</span></div>

  
          <div style={{display:"inline-flex"}}>Input:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{input}</span></div>


         <div style={{display:"inline-flex"}}>Previous Cost:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{`${previousCost} CFA`}</span></div>


         <div style={{display:"inline-flex"}}>Land Ownership:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{landOwnership}</span></div>

<div style={{display:"inline-flex"}}>Off Farm Income:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{offFarmIncome}</span></div>

<div style={{display:"inline-flex"}}>Farm Group Membership:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmerGroups}</span></div>
  

</Stack>

</Grid> 

<Grid item  sm={5} xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}} > 
 <Stack spacing={3} sx={{paddingLeft:{xs:"3rem",sm:"0rem"}}} >
 





      <div style={{display:"inline-flex"}}>Crops/Livestock:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{cropsLivestock.map((item)=>(`${item},`))}</span></div>



       <div style={{display:"inline-flex"}}>Farm Location(GPS):&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{" " + gpsLocation.latitude + ", " + gpsLocation.longitude}</span></div>



     <div style={{display:"inline-flex"}}>Insurance:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{"No"}</span></div>


          <div style={{display:"inline-flex"}}>Previous Production:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{previousProduction}</span></div>



          <div style={{display:"inline-flex"}}>Where do you sell your Product:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{whereDoYouSell}</span></div>

 



  
  <div style={{display:"inline-flex"}}>Farming Experience:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmingExperience}</span></div>


  <div style={{display:"inline-flex"}}>Challenges:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{challenges.map((item)=>(`${item},`))}</span></div>

  <div style={{display:"inline-flex"}}>Education / Training:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{(educationLevel.basicLiteracy||educationLevel.agriculturalTraining)?"present":"none" }</span></div>

<div style={{display:"inline-flex"}}>Sales Channel:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{salesChannel}</span></div>

<div style={{display:"inline-flex"}}>Off farm Income Details:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{offFarmIncomeDetails}</span></div>

<div style={{display:"inline-flex"}}>Farm Group Membership Details:&nbsp;{' '}{' '} <span style={{fontWeight:"bold"}}>{farmerGroupMembershipDetails}</span></div>


  

</Stack>

 </Grid> 
</Grid> 

<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 5 }}>

</Stack>






<Stack sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:{xs:"column",sm:"row"},gap:"1rem"}}>

{<LoadingButton 
 
 onClick={()=>{ setStep1(true); setStep2(false); setStep3(false) }}
 size="large" type="button" variant="contained" disabled={loading} sx={{marginRight:{xs:"0rem",sm:"2rem"},color: '#21712E',fontWeight:"500",backgroundColor: '#F2F4F7',width:"100%",maxWidth:{xs:"20rem",sm:"29rem"}, border:"1px solid #21712E",borderRadius:"0.5rem"}}>

 { "Edit"}
</LoadingButton>}


<LoadingButton 
 
 onClick={()=>{ submitResponse(finalObject,selectedFile && selectedFile.selectedFile)  }}
 size="large" type="button" variant="contained" disabled={loading} sx={{ width:"100%",maxWidth:{xs:"20rem",sm:"29rem"},fontWeight:"500",color: 'white',backgroundColor: '#0A6054',borderRadius:"0.5rem"}}>

 {loading ? "Loading..." : "Submit"}
</LoadingButton>



</Stack>

</>


</form>
}


{step3 &&




<>

<Grid container xs={12} spacing={2} style={{width:"1100px",display:"flex", alignItems:"center",justifyContent:"center",gap:"4rem"}}>  





<Grid item xs={12} spacing={2} style={{marginTop:"-3rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
     
    
    
      
     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        
        <div style={{color:"#0A6054"}}>
       <FaRegCheckCircle style={{backgroundColor:"#ECE3D0",fontSize:"7rem",borderRadius:"50%"}} />
       </div>
       
        <b style={{marginTop:"1.1rem",marginBottom:"1.3rem"}}>Form sent successfully</b>
        {
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"1.5rem"}}>
          <Button   onClick={()=>{window.location.reload()}} component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', color: '#21712E',border:"1px solid #21712E",backgroundColor: '#F2F4F7', fontWeight:"500", marginTop: '15px' }}>
        <b>Send Another</b>
         
        </Button>
        
        
          

        <Button component="label" variant="contained"  onClick={()=>{navigate('/dashboard/all-farmers-one-agent')}}  style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#0A6054',fontWeight:"500", marginTop: '15px' }}>
        <b>Done</b>
         
        </Button>
        
        </div>
        }
      </div>



      </Grid>




</Grid> 







</>



}



    </>
  );
}
