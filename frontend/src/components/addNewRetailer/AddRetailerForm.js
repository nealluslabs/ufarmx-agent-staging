import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Grid,
  Button,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Divider,
  CardMedia,
  FormControlLabel,
  RadioGroup,
  Radio,
  Chip,
  Paper,
  Box,
  FormGroup,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { LoadingButton } from '@mui/lab';
// components
// /import Iconify from '../iconify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup, uploadImage } from 'src/redux/actions/auth.action';
import {
  addNewDeposit,
  calculateRetailerScore,
  submitNewResponse,
  submitNewResponseIntake,
  addNewRetailer,
} from 'src/redux/actions/group.action';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { makeStyles } from '@mui/styles/node';
import { FaCamera, FaRegCheckCircle } from 'react-icons/fa';

import 'react-phone-input-2/lib/style.css'; // Import the library's styles
import PhoneInput from 'react-phone-input-2';
import nigeriaData from 'src/components/utils/nigeriaData';
import { S3 } from 'aws-sdk';
import { saveRetailerScoreRedux } from 'src/redux/reducers/group.slice';

const schema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
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
      color: 'black',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'black',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey',
      color: 'black',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'grey',
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
      color: 'black',
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

export default function AddNewRetailerForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const inputContainer2 = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '-0.2rem',
  };


  const {user} =useSelector((state) => state.auth);

 useEffect(() => {
 
  if(!user){
   navigate('/login')
  }
  
  }, [user])

  console.log("ON THE ADD RETAILER FORM, OUR USER IS--->",user)


  const inputContainer3 = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '-0.2rem',
  };

  const s3 = new S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
  });

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const { formInFocus,retailerScoreRedux } = useSelector((state) => state.group);
  //console.log("Form IN FOCUS------->",formInFocus)
  const [retailerScore, setRetailerScore] = useState('');
  const getTabIndex = (row, col) => row * 2 + col + 1;

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

  const [selectedState, setSelectedState] = useState('');
  const [selectedBuisnessState, setSelectedBuisnessState] = useState('');

  //to reset state of everything once the form is submitted

  const [error, setError] = useState(null);

  //console.log("challenges is ---->",challenges)

  // const getGeolocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setGpsLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         setError(error.message);
  //       }
  //     );

  //     //console.log("gps location gotten is-->",gpsLocation)
  //   } else {
  //     notifyErrorFxn('cannot get location, please try again!');
  //     setError('Geolocation is not supported by this browser.');

  //     //console.log("error from gps location is-->",error)
  //   }
  // };
  const [selectedFile, setSelectedFile] = useState({ selectedFile: [], selectedFileName: [] });
  const [file, setFile] = useState();
  const emailOptions = Array.from({ length: 76 }, (_, index) => index + 15); // Generates ages from 15 to 90

  const [fields, setFields] = useState(formInFocus && formInFocus.fields);

  // Split the array into two halves
  const middleIndex = Math.ceil(formInFocus && formInFocus.fields && formInFocus.fields.length / 2);
  const firstHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(0, middleIndex);
  const secondHalf = formInFocus && formInFocus.fields && formInFocus.fields.slice(middleIndex);

  // Create form objects for each half
  const initialFormObject1 =
    firstHalf &&
    firstHalf.reduce((acc, curr) => {
      acc[curr.prompt] = ''; // Initialize each value to an empty string
      return acc;
    }, {});

  const initialFormObject2 =
    secondHalf &&
    secondHalf.reduce((acc, curr) => {
      acc[curr.prompt] = ''; // Initialize each value to an empty string
      return acc;
    }, {});
  const initialFormObject =
    formInFocus &&
    formInFocus.fields &&
    formInFocus.fields.reduce((acc, curr) => {
      acc[curr.prompt] = ''; // Initialize each value to an empty string
      return acc;
    }, {});

  // State to manage form values
  const [formValues, setFormValues] = useState(initialFormObject);

  //console.log("FORM ID IS ===>",formInFocus &&formInFocus._id)

  const generateRandomSixNumbers = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const uploadToS3 = async (file) => {
    if (!file) return null;

    // Create a unique filename to prevent overwriting
    const uniqueKey = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: uniqueKey,
      Body: file,
      ContentType: file.type, // Dynamic MIME type (works for PDF, JPG, PNG)
      // ACL: 'public-read' // Uncomment if your bucket requires this for public access
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location; // Returns the public URL of the file
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw error;
    }
  };

  const [docs, setDocs] = useState({
    idDocument: { file: null, preview: null, name: '' },
    utilityBill: { file: null, preview: null, name: '' },
    cacCertificate: { file: null, preview: null, name: '' },
    statusReport: { file: null, preview: null, name: '' },
    memart: { file: null, preview: null, name: '' },
    proofOfAddress: { file: null, preview: null, name: '' },
    shopPhotos: { file: null, preview: null, name: '' },
  });

  const [allRequiredFieldsAreSet,setAllRequiredFieldsAreSet] = useState(false)
  const [retailerScoreLoading,setRetailerScoreLoading] = useState(false)


  const [missingFieldKeys, setMissingFieldKeys] = useState([]);

  const [formData, setFormData] = useState({
    // Personal & Contact Information
    firstName: '',
    lastName: '',
    //otherNames: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    nationality: '',
    // Address & Location
    address: '',
    businessAddress: '',
   // city: '',
    state: '',
    lga: '',
    // gpsLocation: { latitude: null, longitude: null },

    // Business & Legal
    businessName: '',
    //cacNumber: '',
    tin: '',
    nin: '',
    idType: '',
    utilityType: '',
    meter:'',
    businessState: '',
    businessLga: '',
    //businessCity: '',
   // businessPhoneNumber: '',
    shopOwnership: '',
    shopSize: '',
    stockValue:'',
    cac: '',
    businessDate: '',
    landmark: '',
    businessTenure: '',
    businessType: '',
    completeAndAccurateApplication:"no",

  //THESE ITEMS IN FORM DATA ARE NOT COMPULSORY
    idDocument:docs.idDocument &&  docs.idDocument.file || null,
    utilityBill:docs.utilityBill &&   docs.utilityBill.file || null,
    shopPhotos: docs.shopPhotos && docs.shopPhotos.file || null,
    proofOfAddress:docs.proofOfAddress && docs.proofOfAddress.file || null,
    cacCertificate:docs.cacCertificate &&  docs.cacCertificate.file || null,
    statusReport: docs.statusReport &&  docs.statusReport.file || null,
    memart:  docs.memart && docs.memart.file || null,
   
  });

// FAILSAFE HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));


       // 🔹 Clear validation error for this field
       setMissingFieldKeys((prev) =>
        prev.filter((field) => field !== name)
      );

    if(name === "shopSize"){
      if(value === "small"){


        setFormData((prev) => ({ ...prev, ["stockValue"]: "below250k" }));
        console.log('SMALL SHOP SIZE')


      }else if(value === "medium"){
       
        setFormData((prev) => ({ ...prev, ["stockValue"]: "above250k" }));
        console.log('MEDIUM SHOP SIZE')


      }
      else{
 
        setFormData((prev) => ({ ...prev, ["stockValue"]: "above500k" }));
        console.log('LARGE SHOP SIZE')

      }
     
    }

    console.log("SEE FORM DATA HERE====>",formData)


//    if(name === "completeAndAccurateApplication"){ 
//    const optionalFields = [
//      'idDocument',
//      'utilityBill',
//      'shopPhotos',
//      'proofOfAddress',
//      'cacCertificate',
//      'statusReport',
//      'memart',,
//      
//    ];
//    
//    //ONCE I HAVE SEEN THAT ALL FIELDS ARE FILLED OUT (EXCEPT PICS,  I FILL THE COMPLETE CHECKBOX)
//    const missingFields = Object.entries(formData)
//      .filter(([key, value]) => {
//        // skip optional fields
//        if (optionalFields.includes(key)) return false;
//    
//        // treat empty strings, null, undefined, false as missing
//        return (
//          value === '' ||
//          value === null ||
//          value === undefined
//        );
//      })
//      .map(([key]) => key);
//
//
//
//  if (missingFields.length === 0) {
//     
//    //setFormData((prev) => ({ ...prev, completeAndAccurateApplication: "yes" }));
//    //we want to block continue
//   setAllRequiredFieldsAreSet(true)
//
//  }
//  //else{
//  //  setFormData((prev) => ({ ...prev, completeAndAccurateApplication: " " }));
//  //  notifyErrorFxn("Fill in all missing fields before declaring!")
//  //}
//
//}



};

useEffect(()=>{
  dispatch(saveRetailerScoreRedux(''));
},[])

useEffect(()=>{

  const optionalFields = [
    

    'utilityBill',
    'proofOfAddress',
       //complete and accurate application has a default of no, so is techinally still filled out
   
       /*'idDocument',
    'shopPhotos',
    'cacCertificate',
    'statusReport',
    'memart',*/
    
  ];
  
  //ONCE I HAVE SEEN THAT ALL FIELDS ARE FILLED OUT (EXCEPT PICS,  I FILL THE COMPLETE CHECKBOX)
  const missingFields = Object.entries(formData)
    .filter(([key, value]) => {
      // skip optional fields
      if (optionalFields.includes(key)) return false;
  
      // treat empty strings, null, undefined, false as missing
      return (
        value === '' ||
        value === null ||
        value === undefined
      );
    })
    .map(([key]) => key);



if (missingFields.length === 0) { //complete and accurate application has a default of no, so is techinally still filled out
  
  //we want to block continue until all fields are set, except optional field...then we will set complete and accurate here

 
 setAllRequiredFieldsAreSet(true)

}




},[formData])




useEffect(()=>{


  const optionalFields = [
    

    'utilityBill',
    'proofOfAddress',
       //complete and accurate application has a default of no, so is techinally still filled out
 
  ];
  
  //ONCE I HAVE SEEN THAT ALL FIELDS ARE FILLED OUT (EXCEPT PICS,  I FILL THE COMPLETE CHECKBOX)
  const missingFields = Object.entries(formData)
    .filter(([key, value]) => {
      // skip optional fields
      if (optionalFields.includes(key)) return false;
  
      // treat empty strings, null, undefined, false as missing
      return (
        value === '' ||
        value === null ||
        value === undefined
      );
    })
    .map(([key]) => key);



const allOptionalFieldsFilled = optionalFields.every((field) => {
  const value = formData[field];
  return value !== '' && value !== null && value !== undefined;
});


if(allOptionalFieldsFilled && missingFields.length === 0){ //ALL FIELDS INCLUDING OPTIONALS ARE FILLED
  setFormData((prev) => ({ ...prev, completeAndAccurateApplication: "yes" }));
}



/*PUTTING A LOADING SIGN OVER THE RETAILER SCORE FOR 3 SECONDS*/

//setRetailerScoreLoading(true)
//                                      //WE ARENT USING THIS FOR NOW
//setTimeout(()=>{ 
//  setRetailerScoreLoading(false)
//},5000)

/*PUTTING A LOADING SIGN OVER THE RETAILER SCORE FOR 3 SECONDS END*/


},[allRequiredFieldsAreSet])



  const riskScoreObject = {
    //verifiedThreeMonthPosData: true,   //false data
   // avgMonthlyNetProfit: 'above150k',   //false data
   // crc: 'high',                        //false data
   // stockValue: 'above500k',            //false data
    yearsInBusiness: formData.businessTenure,   //true data
  //  digitallyTrackSales: true,              //false data
   // cleanBankStatements: true,              //false data
    stockValue:formData.stockValue,              //false data
    physicalStoreOwnership: formData.shopOwnership === 'yes' ? true : false, //true data
    completeAndAccurateApplication: formData.completeAndAccurateApplication?formData.completeAndAccurateApplication:"no",     //true data
  };
  

  const finalObject = {
    form_id: formInFocus && formInFocus._id,
    agent_user_id: user && user.user_id,
    agentId: user && user.agentId,
    admin_user_id: formInFocus && formInFocus.user_id,
    last_updated_by: formInFocus && formInFocus.user_id,
    farmerId: generateRandomSixNumbers(),
    is_deleted: false,
    ...riskScoreObject, // Merged risk data
    ...formData,
    retailerRiskScore: retailerScoreRedux,
    idDocument: formData.idDocument,
    utilityBill: formData.utilityBill,
    shopPhotos: formData.shopPhotos,
    proofOfAddress: formData.proofOfAddress,
    cacCertificate: formData.cacCertificate,
    statusReport: formData.statusReport,
    memart: formData.memart,
   
  };
  const ageOptions = Array.from({ length: 76 }, (_, index) => index + 15); // Generates ages from 15 to 90
  const businessTenureOptions = Array.from({ length: 6 }, (_, index) => index + 1); // Generates ages from 15 to 90

  const inputBg = '#F9FAFB';

  const handleFileChange = async (event, docType) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // 1. Update local UI state for preview/loading
      setDocs((prev) => ({
        ...prev,
        [docType]: {
          file: selectedFile,
          preview: URL.createObjectURL(selectedFile),
          name: selectedFile.name,
          loading: true, // Useful for showing a spinner on the UploadBox
        },
      }));


       // 🔹 Clear validation error for this field
    setMissingFieldKeys((prev) =>
      prev.filter((field) => field !== docType)
    );



      try {
        const url = await uploadToS3(selectedFile);
        console.log(`${docType} uploaded successfully:`, url);

        setFormData((prev) => ({
          ...prev,
          [docType]: url,
        }));

        setDocs((prev) => ({
          ...prev,
          [docType]: { ...prev[docType], loading: false },
        }));
      } catch (error) {
        alert(`Failed to upload ${docType}. Please try again.`);
        setDocs((prev) => ({
          ...prev,
          [docType]: { ...prev[docType], loading: false },
        }));
      }
    }
  };
  const selectedStateData = nigeriaData.find((item) => item.state === selectedState);
  const selectedBusinessStateData = nigeriaData.find((item) => item.state === selectedBuisnessState);

  const UploadBox = ({
    title,
    docType,
    currentFile,
    error,
    helperText,
  }) => (
    <>
      <Box
        component="label"
        sx={{
          border: error
            ? '2px solid #E53935' // 🔴 red when missing
            : currentFile?.name
            ? '2px solid #90C434'
            : '1px dashed #ccc',
          borderRadius: '8px',
          p: 5,
          textAlign: 'center',
          backgroundColor: error
            ? '#FDECEA'
            : currentFile?.name
            ? '#F0F7E6'
            : '#F9FAFB',
          cursor: 'pointer',
          width: '100%',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: error ? '#FADBD8' : '#F2F4F7',
            borderColor: error ? '#D32F2F' : '#90C434',
          },
        }}
      >
        <input type="file" hidden onChange={(e) => handleFileChange(e, docType)} />
  
        <CloudUploadOutlinedIcon
          sx={{
            fontSize: 32,
            mb: 1,
            color: error
              ? '#D32F2F'
              : currentFile?.name
              ? '#689F38'
              : 'text.secondary',
          }}
        />
  
        <Typography variant="body2">
          {currentFile?.name ? `Selected: ${currentFile.name}` : title}
        </Typography>
  
        {!currentFile?.name && (
          <>
            <Typography variant="caption" color="textSecondary">
              Drag and drop file here to upload or choose file
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Format: JPG, PNG, PDF (Max 5MB)
            </Typography>
          </>
        )}
      </Box>
  
      {error && (
        <Typography variant="caption" sx={{ color: '#D32F2F', mt: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </>
  );
  

  const handleGenerateCreditScore = () => {
    const apiData = finalObject;
    const file = riskScoreObject && riskScoreObject;
    setRetailerScoreLoading(true)

    console.log('apiData===========>>>>>>>>>>>', apiData);
    console.log('file===========>>>>>>>>>>>', file);


   //IN CASE THE SCORE DOES NOT CALCULATE
    setTimeout(()=>{
      setRetailerScoreLoading(false)

    },5000)
    
    

    // 2. Dispatch the action you defined earlier
    dispatch(calculateRetailerScore(/*apiData && */file))
      .then((res) => {
        // Access the data here!
        const score = res.data.riskScore;
        console.log('The res containing the risk score is========>>>>>>>>>>', res);
        console.log('The actual risk score is========>>>>>>>>>>', score);
        dispatch(saveRetailerScoreRedux(score && score));
        //if(score){
        //  setRetailerScoreLoading(false)
  
        //    setStep1(false);
        //    setStep2(true);
        //    setStep3(false);

        //}

        if(score){

        setTimeout(()=>{
          setRetailerScoreLoading(false)
          setStep1(false);
          setStep2(true);
          setStep3(false);


        },3500)
      }
        
      })
      .catch((err) => {
        setLoading(false);
        console.log('Submission failed', err);
      });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      // ... reset all other keys
    });
    setDocs({}); // Clear your upload state
  };
  const addRetailer = (e) => {
    // e.preventDefault();
    setLoading(true);
    const agentInfo = {
      ...finalObject,
    };


    const optionalFields = [
      'idDocument',
      'utilityBill',
      'shopPhotos',
      'proofOfAddress',
      'cacCertificate',
      'statusReport',
      'memart',
    ];
    
    const missingFields = Object.entries(formData)
      .filter(([key, value]) => {
        // skip optional fields
        if (optionalFields.includes(key)) return false;
    
        // treat empty strings, null, undefined, false as missing
        return (
          value === '' ||
          value === null ||
          value === undefined
        );
      })
      .map(([key]) => key);



  if (missingFields.length > 0) {

    const formattedFields = missingFields
    .map(field =>
      field
        .replace(/([A-Z])/g, ' $1') // camelCase → words
        .replace(/^./, str => str.toUpperCase()) // capitalize first letter
    )
    .join(', ');


    
    notifyErrorFxn(`The following fields should be filled out/uploaded: ${formattedFields}`)
   
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return
   }
    else{
    dispatch(addNewRetailer(agentInfo, navigate, setLoading, resetForm));
  }


    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {step1 && (
        <form>
          <>
            <Grid
              container
              xs={12}
              spacing={2}
              style={{
                width: '1100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4rem',
                marginTop: '0rem',
              }}
            >
              <>
                <Grid
                  item
                  xs={12}
                  style={{
                    maxWidth: '1000px',
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}
                >
                  <Typography
                    color="textPrimary"
                    variant="p"
                    component="p"
                    style={{ color: '#000000', position: 'relative' }}
                  >
                    Retailer's Personal Information
                  </Typography>

                  <Divider sx={{ width: '100%', backgroundColor: '#90C434' }} />
                </Grid>
              </>

              <>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { md: '3rem' },
                  }}
                >
                  <Grid item sm={fields && fields.length < 2 ? 12 : 5} xs={12}>
                    <Stack
                      spacing={3}
                      sx={{
                        minHeight: '100%',
                        paddingTop: '0rem',
                        display: 'flex',
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        justifyContent: 'center',
                        marginTop: '-3rem',
                      }}
                    >
                      <TextField
                        key={'firstName'}
                        label={'First Name'}
                        inputProps={{ tabIndex: getTabIndex(0, 0) }}
                        value={formData.firstName}
                        onChange={handleChange}
                        name="firstName"
                        error={missingFieldKeys.includes('firstName')}
                         helperText={
                           missingFieldKeys.includes('firstName') ? 'This field is required' : ''
                         }
                        sx={{ color: 'black', maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' } }}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />

                      <TextField
                        key={'promptKey'}
                        label={'Email'}
                        name="email"
                        error={missingFieldKeys.includes('email')}
                        helperText={
                          missingFieldKeys.includes('email') ? 'This field is required' : ''
                        }
                        value={formData.email}
                        type={'email'}
                        onChange={handleChange}
                        sx={{ color: 'black', maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' } }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ tabIndex: getTabIndex(3, 0) }}
                        InputProps={{
                          style: {
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'gray',
                            backgroundColor: '#F9FAFB',
                            paddingRight: '1rem',
                          },
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        key={'promptKey'}
                        label={'Address'}
                        name="address"
                        error={missingFieldKeys.includes('address')}
                        helperText={
                          missingFieldKeys.includes('address') ? 'This field is required' : ''
                        }
                        inputProps={{ tabIndex: getTabIndex(1, 0) }}
                        value={formData.address}
                        onChange={handleChange}
                        sx={{ color: 'black', maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' } }}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />

                      <FormControl
                        sx={{
                          width: '100%',
                          maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' },
                        }}
                        variant="outlined"
                      >
                        {/* Label for Select */}
                        <InputLabel id="hi-3-label" shrink>
                          Nationality
                        </InputLabel>

                        <Select
                          sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '0.5rem',
                            width: '100%',
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'black',
                            backgroundColor: '#F9FAFB',
                          }}
                          inputProps={{ tabIndex: getTabIndex(4, 1) }}
                          labelId="hi-3-label" // Match with InputLabel's `id`
                          id="hi"
                          value={formData.nationality}
                          label=""
                          displayEmpty
                          name="nationality"
                          error={missingFieldKeys.includes('nationality')}
                          helperText={
                            missingFieldKeys.includes('nationality') ? 'This field is required' : ''
                          }
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <em style={{ color: 'lightgray' }}></em>;
                            }
                            return selected;
                          }}
                          onChange={handleChange}
                        >
                          <MenuItem disabled value={''}>
                            Nationality
                          </MenuItem>
                          <MenuItem value={'Nigeria'}>Nigeria</MenuItem>
                        </Select>
                        {missingFieldKeys.includes('nationality') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                      </FormControl>

                      <FormControl
                        sx={{
                          width: '100%',
                          maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' },
                        }}
                        variant="outlined"
                      >
                        {/* Label for Select */}
                        <InputLabel id="hi-3-label" shrink>
                          Local Government Area
                        </InputLabel>

                        <Select
                          sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '0.5rem',
                            width: '100%',
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'black',
                            backgroundColor: '#F9FAFB',
                          }}
                          inputProps={{ tabIndex: getTabIndex(4, 1) }}
                          labelId="hi-3-label" // Match with InputLabel's `id`
                          id="hi"
                          value={formData.lga}
                          label=""
                          displayEmpty
                          name="lga"
                          error={missingFieldKeys.includes('lga')}
                          helperText={
                            missingFieldKeys.includes('lga') ? 'This field is required' : ''
                          }
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <em style={{ color: 'lightgray' }}></em>;
                            }
                            return selected;
                          }}
                          onChange={handleChange}
                        >
                          <MenuItem disabled value={''}>
                            Local Government Area
                          </MenuItem>
                          {selectedStateData?.lgas?.map((lga) => (
                            <MenuItem key={lga} value={lga}>
                              {lga}
                            </MenuItem>
                          ))}
                        </Select>
                        {missingFieldKeys.includes('lga') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                      </FormControl>
                      <FormControl
                        sx={{
                          width: '100%',
                          maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' },
                        }}
                        variant="outlined"
                      >
                        <InputLabel id="age-label" shrink>
                          Age
                        </InputLabel>
                        <Select
                          labelId="age-label"
                          id="age-select"
                          value={formData.age}
                          inputProps={{ tabIndex: getTabIndex(2, 0) }}
                          onChange={handleChange}
                          label="Age"
                          name="age"
                          error={missingFieldKeys.includes('age')}
                          helperText={
                            missingFieldKeys.includes('age') ? 'This field is required' : ''
                          }
                          sx={{
                            color: 'black',
                            width: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' },
                            height: '3rem',
                            backgroundColor: '#F9FAFB',
                            paddingLeft: '1rem',
                            color: 'gray',
                            paddingRight: '1rem',
                          }}
                        >
                          {ageOptions.map((ageValue) => (
                            <MenuItem key={ageValue} value={ageValue}>
                              {ageValue}
                            </MenuItem>
                          ))}
                        </Select>

                        {missingFieldKeys.includes('age') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                      </FormControl>
                      <FormControl
                        sx={{
                          width: '100%',
                          maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' },
                        }}
                        variant="outlined"
                      >
                        {/* Label for Select */}
                        <InputLabel id="hi-3-label" shrink>
                          Select Utility Type
                        </InputLabel>

                        <Select
                          sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '0.5rem',
                            width: '100%',
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'black',
                            backgroundColor: '#F9FAFB',
                          }}
                          inputProps={{ tabIndex: getTabIndex(4, 1) }}
                          InputProps={{
                            style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                          }}
                          labelId="hi-3-label" // Match with InputLabel's `id`
                          id="hi"
                          value={formData.utilityType}
                          label=""
                          name="utilityType"
                          error={missingFieldKeys.includes('utilityType')}
                           helperText={
                             missingFieldKeys.includes('utilityType') ? 'This field is required' : ''
                           }
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <em style={{ color: 'lightgray' }}></em>;
                            }
                            return selected;
                          }}
                          onChange={handleChange}
                        >
                          <MenuItem disabled value={''}>
                            Select Utility Type
                          </MenuItem>
                          <MenuItem value={'Prepaid'}>Prepaid</MenuItem>
                          <MenuItem value={'Postpaid'}>Postpaid</MenuItem>
                        </Select>
                        {missingFieldKeys.includes('utilityType') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                      </FormControl>
                      <Grid item xs={12} sm={6} sx={{ minWidth: '100%' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Utility Bill
                        </Typography>
                        <UploadBox
                          title="Upload your Utility Bill"
                          docType="utilityBill"
                          currentFile={docs.utilityBill}
                          error={missingFieldKeys.includes('utilityBill')}
                         helperText={
                           missingFieldKeys.includes('utilityBill') ? 'This field is required' : ''
                         }
                        />
                      </Grid>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <Stack
                      spacing={3}
                      sx={{
                        minHeight: '100%',
                        paddingTop: '0rem',
                        display: 'flex',
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        justifyContent: 'center',
                        marginTop: '-3rem',
                      }}
                    >
                      <TextField
                        key={'promptKey'}
                        label={'Last Name'}
                        name="lastName"
                        error={missingFieldKeys.includes('lastName')}
                          helperText={
                            missingFieldKeys.includes('lastName') ? 'This field is required' : ''
                          }
                        value={formData.lastName}
                        onChange={handleChange}
                        sx={{ color: 'black', maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' } }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ tabIndex: getTabIndex(0, 1) }}
                        InputProps={{
                          style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        key={'promptKey'}
                        label={'Phone Number'}
                        name="phone"
                        error={missingFieldKeys.includes('phone')}
                          helperText={
                            missingFieldKeys.includes('phone') ? 'This field is required' : ''
                          }
                        value={formData.phone}
                        type={'text'}
                        onChange={handleChange}
                        sx={{ color: 'black', maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' } }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ tabIndex: getTabIndex(3, 0) }}
                        InputProps={{
                          style: {
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'gray',
                            backgroundColor: '#F9FAFB',
                            paddingRight: '1rem',
                          },
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />

                      {
                        <>
                          <div style={{marginBottom:"1.4rem"}}>
                            
                            <div style={inputContainer2}>
                              <div style={{}} >
                              Gender:{" "}
                              </div>
                              <FormControl 
                               error={missingFieldKeys.includes('gender')}
                              style={{ position: 'relative', left: '-0rem', top: '-0rem', scale: '0.9' }}>
                                <RadioGroup
                                  row
                                  name="gender"
                                  error={missingFieldKeys.includes('gender')}
                          helperText={
                            missingFieldKeys.includes('gender') ? 'This field is required' : ''
                          }
                                  value={formData.gender}
                                  onChange={handleChange}
                                  style={{ color: 'grey' }}
                                >
                                  <FormControlLabel
                                    value="male"
                                    control={<Radio style={{ color: 'grey' }} />}
                                    label={
                                      <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>Male</Typography>
                                    }
                                  />
                                  <FormControlLabel
                                    value="female"
                                    control={<Radio style={{ color: 'grey' }} />}
                                    label={
                                      <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>Female</Typography>
                                    }
                                  />
                                </RadioGroup>


                           {missingFieldKeys.includes('gender') && (
                             <FormHelperText>This field is required</FormHelperText>
                           )}
                              </FormControl>
                            </div>
                          </div>
                        </>
                      }

                      <FormControl
                        sx={{
                          width: '100%',
                          maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' },
                          top: '-0.9rem',
                        }}
                        variant="outlined"
                      >
                        {/* Label for Select */}
                        <InputLabel id="hi-3-label" shrink>
                          State of Origin
                        </InputLabel>

                        <Select
                          sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '0.5rem',
                            width: '100%',
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'black',
                            backgroundColor: '#F9FAFB',
                          }}
                          inputProps={{ tabIndex: getTabIndex(4, 1) }}
                          InputProps={{
                            style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                          }}
                          labelId="hi-3-label" // Match with InputLabel's `id`
                          id="hi"
                          value={formData.state}
                          label=""
                          name="state"
                          error={missingFieldKeys.includes('state')}
                          helperText={
                            missingFieldKeys.includes('state') ? 'This field is required' : ''
                          }
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <em style={{ color: 'lightgray' }}></em>;
                            }
                            return selected;
                          }}
                          onChange={(e) => {
                            handleChange(e); // your existing handler
                            setSelectedState(e.target.value); // update selected state
                          }}
                        >
                          <MenuItem disabled value={''}>
                            State of Origin
                          </MenuItem>
                          {nigeriaData.map((item) => (
                            <MenuItem key={item.state} value={item.state}>
                              {item.state}
                            </MenuItem>
                          ))}
                        </Select>
                        {missingFieldKeys.includes('state') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                      </FormControl>
                      {
                        <FormControl
                        error={missingFieldKeys.includes('idType')}
                          sx={{
                            width: '100%',
                            maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%' },
                            top: '-0.9rem',
                          }}
                          variant="outlined"
                        >
                          {/* Label for Select */}
                          <InputLabel id="hi-3-label" shrink>
                            Means of ID
                          </InputLabel>

                          <Select
                            sx={{
                              backgroundColor: '#FFFFFF',
                              borderRadius: '0.5rem',
                              width: '100%',
                              height: '3rem',
                              paddingLeft: '1rem',
                              color: 'black',
                              backgroundColor: '#F9FAFB',
                            }}
                            inputProps={{ tabIndex: getTabIndex(4, 1) }}
                            InputProps={{
                              style: {
                                height: '3rem',
                                paddingLeft: '1rem',
                                color: 'black',
                                backgroundColor: '#F9FAFB',
                              },
                            }}
                            labelId="hi-3-label" // Match with InputLabel's `id`
                            id="hi"
                            value={formData.idType}
                            label=""
                            name="idType"
                            error={missingFieldKeys.includes('idType')}
                          helperText={
                            missingFieldKeys.includes('idType') ? 'This field is required' : ''
                          }
                            displayEmpty
                            renderValue={(selected) => {
                              if (selected.length === 0) {
                                return <em style={{ color: 'lightgray' }}></em>;
                              }
                              return selected;
                            }}
                            onChange={handleChange}
                          >
                            <MenuItem disabled value={''}>
                              ID Type
                            </MenuItem>
                            <MenuItem value={'passport'}>Passport</MenuItem>
                            <MenuItem value={'national Identification'}>National Identification</MenuItem>
                            <MenuItem value={'drivers License'}>Drivers License</MenuItem>
                          </Select>

                      {missingFieldKeys.includes('idType') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                        </FormControl>
                      }
                      <TextField
                        key={'promptKey'}
                        label={'NIN'}
                        name="nin"
                        error={missingFieldKeys.includes('nin')}
                        helperText={
                          missingFieldKeys.includes('nin') ? 'This field is required' : ''
                        }
                        
                        value={formData.nin}
                        type={'string'}
                        onChange={handleChange}
                        sx={{
                          color: 'black',
                          maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%', top: '-0.9rem' },
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ tabIndex: getTabIndex(3, 0) }}
                        InputProps={{
                          style: {
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'gray',
                            backgroundColor: '#F9FAFB',
                            paddingRight: '1rem',
                          },
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        key={'promptKey'}
                        label={'Meter Number'}
                        value={formData.meter}
                        type={'string'}
                        onChange={handleChange}
                        name="meter"
                        error={missingFieldKeys.includes('meter')}
                          helperText={
                            missingFieldKeys.includes('meter') ? 'This field is required' : ''
                          }
                        sx={{
                          color: 'black',
                          maxWidth: { xs: '20rem', sm: '70%', md: '80%', lg: '100%', top: '-0.9rem' },
                        }}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ tabIndex: getTabIndex(3, 0) }}
                        InputProps={{
                          style: {
                            height: '3rem',
                            paddingLeft: '1rem',
                            color: 'gray',
                            backgroundColor: '#F9FAFB',
                            paddingRight: '1rem',
                          },
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <Grid item xs={12} sm={6} sx={{ minWidth: '100%', top: '-0.9rem' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          ID Document
                        </Typography>
                        <UploadBox
                          title="Upload Clear photo of your ID"
                          docType="idDocument"
                          currentFile={docs.idDocument}
                          error={missingFieldKeys.includes('idDocument')}
                          helperText={
                            missingFieldKeys.includes('idDocument') ? 'This field is required' : ''
                          }
                        />
                      </Grid>
                    </Stack>
                  </Grid>
                </Grid>
              </>
            </Grid>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}></Stack>
          </>

          <>
            <Grid
              container
              xs={12}
              spacing={2}
              style={{
                width: '1100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4rem',
                marginTop: '0rem',
              }}
            >
              <Grid
                item
                xs={12}
                style={{
                  maxWidth: '1000px',
                  width: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Typography
                  color="textPrimary"
                  variant="p"
                  component="p"
                  style={{ color: '#000000', position: 'relative', top: '0rem' }}
                >
                  Business Information
                </Typography>

                <Divider sx={{ width: '100%', backgroundColor: '#90C434', marginBottom: '1rem' }} />

                <Grid container spacing={3}>
                  <Grid item xs={8} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Business Name
                    </Typography>
                    <TextField
                      fullWidth
                      name="businessName"
                      error={missingFieldKeys.includes('businessName')}
                          helperText={
                            missingFieldKeys.includes('businessName') ? 'This field is required' : ''
                          }
                      placeholder="e.g afroagro provider limited"
                      variant="outlined"
                      onChange={handleChange}
                      sx={{ backgroundColor: inputBg }}
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      value={formData.businessName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      CAC Registration Number
                    </Typography>
                    <TextField
                      fullWidth
                      name="cac"
                      error={missingFieldKeys.includes('cac')}
                          helperText={
                            missingFieldKeys.includes('cac') ? 'This field is required' : ''
                          }
                      placeholder="e.g RC123456"
                      variant="outlined"
                      sx={{ backgroundColor: inputBg }}
                      
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      onChange={handleChange}
                      value={formData.cac}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Tax Identification Number (TIN)
                    </Typography>
                    <TextField
                      fullWidth
                      name="tin"
                      error={missingFieldKeys.includes('tin')}
                          helperText={
                            missingFieldKeys.includes('tin') ? 'This field is required' : ''
                          }
                      placeholder="e.g 123454784589-0001"
                      variant="outlined"
                      sx={{ backgroundColor: inputBg }}
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      onChange={handleChange}
                      value={formData.tin}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Business Registration Date
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      placeholder="DD/MM/YYYY"
                      variant="outlined"
                      name="businessDate"
                      error={missingFieldKeys.includes('businessDate')}
                          helperText={
                            missingFieldKeys.includes('businessDate') ? 'This field is required' : ''
                          }
                      sx={{ backgroundColor: inputBg }}
                      InputProps={{
                        style: {
                          height: '3rem',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          color: 'black',
                          backgroundColor: '#F9FAFB',
                        },
                      }}
                      onChange={handleChange}
                      value={formData.businessDate}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Business Address
                    </Typography>
                    <TextField
                      fullWidth
                      name="businessAddress"
                      error={missingFieldKeys.includes('businessAddress')}
                          helperText={
                            missingFieldKeys.includes('businessAddress') ? 'This field is required' : ''
                          }
                      placeholder="e.g 23, unity Avenue"
                      variant="outlined"
                      sx={{ backgroundColor: inputBg }}
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      onChange={handleChange}
                      value={formData.businessAddress}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      State
                    </Typography>
                    <Select
                      fullWidth
                      displayEmpty
                      name="businessState"
                      error={missingFieldKeys.includes('businessState')}
                          helperText={
                            missingFieldKeys.includes('businessState') ? 'This field is required' : ''
                          }
                      sx={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.5rem',
                        width: '100%',
                        height: '3rem',
                        paddingLeft: '1rem',
                        color: 'black',
                        backgroundColor: '#F9FAFB',
                      }}
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedBuisnessState(e.target.value);
                      }}
                    >
                      <MenuItem disabled value={''}>
                        State of Origin
                      </MenuItem>
                      {nigeriaData.map((item) => (
                        <MenuItem key={item.state} value={item.state}>
                          {item.state}
                        </MenuItem>
                      ))}
                    </Select>
                    {missingFieldKeys.includes('businessState') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Local Government
                    </Typography>
                    <Select
                      sx={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.5rem',
                        width: '100%',
                        height: '3rem',
                        paddingLeft: '1rem',
                        color: 'black',
                        backgroundColor: '#F9FAFB',
                      }}
                      fullWidth
                      name="businessLga"
                      error={missingFieldKeys.includes('businessLga')}
                          helperText={
                            missingFieldKeys.includes('businessLga') ? 'This field is required' : ''
                          }
                      displayEmpty
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      onChange={handleChange}
                      value={formData.businessLga}
                    >
                      {selectedBusinessStateData?.lgas?.map((lga) => (
                        <MenuItem key={lga} value={lga}>
                          {lga}
                        </MenuItem>
                      ))}
                      <MenuItem value="">Select</MenuItem>
                    </Select>

                    {missingFieldKeys.includes('businessLga') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Nearest Landmark to store
                    </Typography>
                    <TextField
                      fullWidth
                      name="landmark"
                      error={missingFieldKeys.includes('landmark')}
                          helperText={
                            missingFieldKeys.includes('landmark') ? 'This field is required' : ''
                          }
                      placeholder="e.g 123454784589-0001"
                      variant="outlined"
                      sx={{ backgroundColor: inputBg }}
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      onChange={handleChange}
                      value={formData.landmark}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Years in Business
                    </Typography>
                    <Select
                      fullWidth
                      name="businessTenure"
                      error={missingFieldKeys.includes('businessTenure')}
                          helperText={
                            missingFieldKeys.includes('businessTenure') ? 'This field is required' : ''
                          }
                      displayEmpty
                      sx={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.5rem',
                        width: '100%',
                        height: '3rem',
                        paddingLeft: '1rem',
                        color: 'black',
                        backgroundColor: '#F9FAFB',
                      }}
                      InputProps={{
                        style: { height: '3rem', paddingLeft: '1rem', color: 'black', backgroundColor: '#F9FAFB' },
                      }}
                      onChange={handleChange}
                      value={formData.businessTenure}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="lessThan1Year">Less than a year</MenuItem>
                      {businessTenureOptions.map((tenure) => (
                        <MenuItem key={tenure} value={`${tenure} ${tenure === 1 ?`year`:`years`}`}>
                          {tenure} {tenure === 1 ?`year`:`years`}
                        </MenuItem>
                      ))}
                    </Select>
                    {missingFieldKeys.includes('businessTenure') && (
                        <FormHelperText style={{color:"red"}}>This field is required</FormHelperText>
                      )}
                  </Grid>

                  {/* File Uploads Section */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Certificate of Incorporation
                    </Typography>
                    <UploadBox
                      title="Upload your CAC Certificate"
                      name="cacCertificate"
                      error={missingFieldKeys.includes('cacCertificate')}
                          helperText={
                            missingFieldKeys.includes('cacCertificate') ? 'This field is required' : ''
                          }
                      
                      docType="cacCertificate"
                      currentFile={docs.cacCertificate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Business Application Form / Status Report
                    </Typography>
                    <UploadBox
                      title="Upload your Status Report"
                      name="statusReport"
                      error={missingFieldKeys.includes('statusReport')}
                          helperText={
                            missingFieldKeys.includes('statusReport') ? 'This field is required' : ''
                          }
                      docType="statusReport"
                      currentFile={docs.statusReport}
                    />
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '0.7rem', color: 'gray', marginTop: '0.3rem' }}>
                      Please upload all pages of your CAC Application Form
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      MEMART
                    </Typography>

                    <UploadBox title="Upload your MEMART" name="memart" docType="memart" currentFile={docs.memart}
                    
                    error={missingFieldKeys.includes('memart')}
                    helperText={
                      missingFieldKeys.includes('memart') ? 'This field is required' : ''
                    }
                    
                    />
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '0.7rem', color: 'gray', marginTop: '0.3rem' }}>
                      Please upload all pages of your MEMART Document
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
          <>
            <Grid
              item
              xs={12}
              px={1}
              style={{
                maxWidth: '1050px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: '0rem',
                position: 'relative',
                left: '2rem',
                // right: '2rem',
              }}
            >
              <Typography
                color="textPrimary"
                variant="p"
                component="p"
                style={{ color: '#000000', position: 'relative', top: '0rem' }}
              >
                Business Details
              </Typography>

              <Divider sx={{ width: '93%', backgroundColor: '#90C434', marginBottom: '0.5rem' }} />

              <Grid container spacing={0} sx={{ width: '100%' }}>
                <Grid item xs={8} sm={6}>
                  <div style={{ marginTop: '1rem' }}>
                    Is this your shop or rented?
                    <div style={inputContainer2}>
                      <FormControl 
                       error={missingFieldKeys.includes('shopOwnership')}
                      style={{ position: 'relative', left: '-0rem', top: '-0rem', scale: '0.9' }}>
                        <RadioGroup
                          row
                          name="shopOwnership"
                          value={formData.shopOwnership}
                          onChange={handleChange}
                          style={{ color: 'grey' }}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>I own this shop</Typography>
                            }
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                                I rent this shop
                              </Typography>
                            }
                          />
                        </RadioGroup>


  {missingFieldKeys.includes('shopOwnership') && (
    <FormHelperText>This field is required</FormHelperText>
  )}
                      </FormControl>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ marginTop: '0.5rem' }}>
                    Estimate size of your shop
                    <div style={inputContainer2}>
                      <FormControl
                       error={missingFieldKeys.includes('shopSize')}
                        style={{ position: 'relative', left: '-0rem', top: '-0rem', scale: '0.9', width: '90%' }}
                      >
                        <RadioGroup
                          row
                          name="shopSize"
                          value={formData.shopSize}
                          onChange={handleChange}
                          style={{ color: 'grey' }}
                        >
                          <FormControlLabel
                            value="small"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                                Small (can serve 10-50 farmers)
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value="medium"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                                Medium (can serve 50-200 farmers)
                              </Typography>
                            }
                          />
                          <br />
                          <FormControlLabel
                            value="large"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                                Large (can serve 200+ farmers)
                              </Typography>
                            }
                          />
                        </RadioGroup>


                       {missingFieldKeys.includes('shopSize') && (
                         <FormHelperText>This field is required</FormHelperText>
                       )}
                      </FormControl>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ marginTop: '0.5rem' }}>
                    Business Type
                    <div style={inputContainer2}>
                      <FormControl
                       error={missingFieldKeys.includes('businessType')}
                        style={{ position: 'relative', left: '-0rem', top: '-0rem', scale: '0.9', width: '90%' }}
                      >
                        <RadioGroup
                          row
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          style={{ color: 'grey' }}
                        >
                          <FormControlLabel
                            value="individual"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                                Individual
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value="registeredBusiness"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                                Registered Business
                              </Typography>
                            }
                          />
                        </RadioGroup>


                         {missingFieldKeys.includes('businessType') && (
                           <FormHelperText>This field is required</FormHelperText>
                         )}
                      </FormControl>
                    </div>
                  </div>
                </Grid>

                <Grid container spacing={4} sx={{ display: 'flex', width: '100%', mt: 2 }}>
                  <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Shop Photos
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <UploadBox
                        title="Add Photo of your shop (Interior & Exterior)"
                        docType="shopPhotos"
                        currentFile={docs.shopPhotos}
                        name="shopPhotos"
                        error={missingFieldKeys.includes('shopPhotos')}
                          helperText={
                            missingFieldKeys.includes('shopPhotos') ? 'This field is required' : ''
                          }
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '0.7rem', color: 'gray', mt: 1 }}>
                      Clear photos showing the inside and outside of your shop
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Proof of business address
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <UploadBox
                        title="Upload utility bill or lease Agreement"
                        docType="proofOfAddress"
                        currentFile={docs.proofOfAddress}
                        name="proofOfAddress"
                        error={missingFieldKeys.includes('proofOfAddress')}
                          helperText={
                            missingFieldKeys.includes('proofOfAddress') ? 'This field is required' : ''
                          }
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '0.7rem', color: 'gray', mt: 1 }}>
                      Recent utility bill, lease agreement, or property document
                    </Typography>
                  </Grid>
                </Grid>


               

                <Grid item xs={8}>
                  <div style={{ marginTop: '0.5rem' }}>
                    Information Declaration
                    <div style={inputContainer2}>
                      <FormControl
                        style={{ position: 'relative', left: '-0rem', top: '-0rem', scale: '0.9', width: '90%' }}
                      >
                        <RadioGroup
                          row
                          name="completeAndAccurateApplication"
                          //value={formData.completeAndAccurateApplication}
                          //onChange={handleChange}
                          style={{ color: 'grey' }}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio style={{ color: 'grey' }} />}
                            label={
                              <Typography style={{ fontFamily: 'Public Sans, sans-serif' }}>
                                I confirm that all information provided is verified and accurate
                              </Typography>
                            }
                          />
                          
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </Grid>







              </Grid>
            </Grid>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                gap: '1rem',
              }}
              mt={5}
            >
              {
                <LoadingButton
                  onClick={() => {
                    navigate(-1);
                  }}
                  size="large"
                  type="button"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    marginRight: { xs: '0rem', sm: '0rem', md: '0rem' },
                    fontWeight: '500',
                    color: '#21712E',
                    backgroundColor: '#F2F4F7',
                    border: '1px solid #21712E',
                    width: '100%',
                    maxWidth: { xs: '20rem', sm: '29rem' },
                    borderRadius: '0.5rem',
                  }}
                >
                  {'Back'}
                </LoadingButton>
              }

              <LoadingButton
                onClick={() => {
                 if(allRequiredFieldsAreSet){ 
                  setRetailerScoreLoading(true)
                //  if(retailerScoreRedux){
                //  setStep1(false);
                //  setStep2(true);
                //  setStep3(false);
                //  
                //  }

                  

                  handleGenerateCreditScore();
                 }else{
                  notifyErrorFxn("Please make sure all fields are filled in")

                  const optionalFields = [
                    //'idDocument',
                    'utilityBill',
                   // 'shopPhotos',
                    'proofOfAddress',
                   // 'cacCertificate',
                    //'statusReport',
                    //'memart',
                  ];
                  
                  const missingFields = Object.entries(formData)
                    .filter(([key, value]) => {
                      // skip optional fields
                      if (optionalFields.includes(key)) return false;
                  
                      // treat empty strings, null, undefined, false as missing
                      return (
                        value === '' ||
                        value === null ||
                        value === undefined
                      );
                    })
                    .map(([key]) => key);
              
              
              
                if (missingFields.length > 0) {
                  setMissingFieldKeys(missingFields)
                  const formattedFields = missingFields
                  .map(field =>
                    field
                      .replace(/([A-Z])/g, ' $1') // camelCase → words
                      .replace(/^./, str => str.toUpperCase()) // capitalize first letter
                  )
                  .join(', ');
              
              
                  
                  console.log(`The following fields should be filled out/uploaded: ${formattedFields}`)
                 
                  setTimeout(() => {
                    setLoading(false);
                  }, 2000);
              
                 }
                }}
              }
                // onClick={() => handleGenerateCreditScore()}
                size="large"
                type="button"
                variant="contained"
                disabled={loading}
                sx={{
                  width: '100%',
                  fontWeight: '500',
                  maxWidth: { xs: '20rem', sm: '29rem' },
                  color: 'white',
                  backgroundColor: '#0A6054',
                  borderRadius: '0.5rem',
                }}
              >
                {(loading || retailerScoreLoading) ? 'Loading...' : 'Continue'}
              </LoadingButton>
            </Stack>
          </>
        </form>
      )}

      {step2 && (
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Grid
            container
            spacing={4}
            sx={{
              maxWidth: '1100px', // Restricts max width but stays responsive
              width: '100%',
              px: { xs: 2, sm: 4 },
              justifyContent: 'center',
            }}
          >
            {/* --- Section 1: Personal Information Header --- */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: '#000000', fontWeight: 'bold' }}>
                Retailer's Personal Information
              </Typography>
              <Divider sx={{ width: '100%', backgroundColor: '#90C434', mt: 1 }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Stack spacing={2}>
                <Typography variant="body2">
                  Full Name: <b>{`${formData.firstName} ${formData.otherNames || ''} ${formData.lastName}`}</b>
                </Typography>
                <Typography variant="body2">
                  Email: <b>{formData.email}</b>
                </Typography>
                <Typography variant="body2">
                  Gender: <b>{formData.gender}</b>
                </Typography>
                <Typography variant="body2">
                  Phone: <b>{formData.phone}</b>
                </Typography>

                <Typography variant="body2">
                  Retailer Risk Score: <b>{retailerScoreLoading?"loading...":(retailerScoreRedux?retailerScoreRedux:" ")}</b>
                </Typography>
              </Stack>
            </Grid>

            {/* --- Personal Info: Center Column --- */}
            <Grid item xs={12} sm={4}>
              <Stack spacing={2}>
                <Typography variant="body2">
                  Nationality: <b>{formData.nationality}</b>
                </Typography>
                <Typography variant="body2">
                  State of Origin: <b>{formData.state}</b>
                </Typography>
                <Typography variant="body2">
                  LGA: <b>{formData.lga}</b>
                </Typography>
                <Typography variant="body2">
                  Means of ID: <b>{formData.idType}</b>
                </Typography>
                <Typography variant="body2">
                  NIN: <b>{formData.nin}</b>
                </Typography>
              </Stack>
            </Grid>

            {/* --- Personal Info: Right Column --- */}
            <Grid item xs={12} sm={4}>
              <Stack spacing={2}>
                <Typography variant="body2">
                  Utility Type: <b>{formData.utilityType}</b>
                </Typography>
                <Typography variant="body2">
                  Meter Number: <b>{formData.meter}</b>
                </Typography>
                <Typography variant="body2">
                  Utility Upload: <b>{formData.utilityBill ? 'Uploaded' : 'Not Provided'}</b>
                </Typography>
                <Typography variant="body2">
                  ID Document: <b>{formData.idDocument ? 'Uploaded' : 'Not Provided'}</b>
                </Typography>
              </Stack>
            </Grid>

            {/* --- Section 2: Business Information Header --- */}
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Typography variant="subtitle1" sx={{ color: '#000000', fontWeight: 'bold' }}>
                Business Information
              </Typography>
              <Divider sx={{ width: '100%', backgroundColor: '#90C434', mt: 1 }} />
            </Grid>

            {/* --- Business Info: Left Column --- */}
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Typography variant="body2">
                  Business Name: <b>{formData.businessName}</b>
                </Typography>
                <Typography variant="body2">
                  CAC: <b>{formData.cacCertificate ? 'Uploaded' : 'Not Provided'}</b>
                </Typography>
                <Typography variant="body2">
                  TIN: <b>{formData.tin}</b>
                </Typography>
                <Typography variant="body2">
                  Registration Date: <b>{formData.businessDate}</b>
                </Typography>
                <Typography variant="body2">
                  Business Address: <b>{formData.businessAddress}</b>
                </Typography>
                <Typography variant="body2">
                  CAC NUMBER: <b>{formData.cac}</b>
                </Typography>
              </Stack>
            </Grid>

            {/* --- Business Info: Right Column --- */}
            <Grid item xs={12} sm={6}>
              <Stack spacing={2}>
                <Typography variant="body2">
                  State: <b>{formData.businessState}</b>
                </Typography>
                <Typography variant="body2">
                  LGA: <b>{formData.businessLga}</b>
                </Typography>
                <Typography variant="body2">
                  Landmark: <b>{formData.landmark}</b>
                </Typography>
                <Typography variant="body2">
                  Years in Business: <b>{formData.businessTenure}</b>
                </Typography>
                <Typography variant="body2">
                  Shop Ownership: <b>{formData.shopOwnership}</b>
                </Typography>
                <Typography variant="body2">
                  Shop Size: <b>{formData.shopSize}</b>
                </Typography>
              </Stack>
            </Grid>

            {/* --- Action Buttons --- */}
            <Grid item xs={12} sx={{ mt: 6, mb: 4 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
                <LoadingButton
                  onClick={() => {
                    setStep1(true);
                    setStep2(false);
                  }}
                  size="large"
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    color: '#21712E',
                    borderColor: '#21712E',
                    width: { xs: '100%', sm: '200px' },
                    borderRadius: '0.5rem',
                  }}
                >
                  Edit
                </LoadingButton>

                <LoadingButton
                  onClick={() => addRetailer()}
                  size="large"
                  variant="contained"
                  loading={loading}
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                    backgroundColor: '#0A6054',
                    '&:hover': { backgroundColor: '#084d43' },
                    borderRadius: '0.5rem',
                  }}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}

      {step3 && (
        <>
          <Grid
            container
            xs={12}
            spacing={2}
            style={{ width: '1100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem' }}
          >
            <Grid
              item
              xs={12}
              spacing={2}
              style={{
                marginTop: '-3rem',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'space-between',
              }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
              >
                <div style={{ color: '#0A6054' }}>
                  <FaRegCheckCircle style={{ backgroundColor: '#ECE3D0', fontSize: '7rem', borderRadius: '50%' }} />
                </div>

                <b style={{ marginTop: '1.1rem', marginBottom: '1.3rem' }}>Form sent successfully</b>
                {
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                    <Button
                      onClick={() => {
                        window.location.reload();
                      }}
                      component="label"
                      variant="contained"
                      style={{
                        minHeight: '45px',
                        minWidth: '145px',
                        color: '#21712E',
                        border: '1px solid #21712E',
                        backgroundColor: '#F2F4F7',
                        fontWeight: '500',
                        marginTop: '15px',
                      }}
                    >
                      <b>Send Another</b>
                    </Button>

                    <Button
                      component="label"
                      variant="contained"
                      onClick={() => {
                        navigate('/dashboard/forms');
                      }}
                      style={{
                        minHeight: '45px',
                        minWidth: '145px',
                        backgroundColor: '#0A6054',
                        fontWeight: '500',
                        marginTop: '15px',
                      }}
                    >
                      <b>Done</b>
                    </Button>
                  </div>
                }
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
