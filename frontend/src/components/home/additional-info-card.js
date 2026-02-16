//import * as React from 'react';
import {useState,useEffect} from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Box, Button, Divider, Grid, Modal, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { fetchSpecificResponse } from 'src/redux/actions/group.action';

// MUI Pencil Icon
import CreateIcon from '@mui/icons-material/Create';

import farmer1 from 'src/assets/images/jeansfarmer.jpeg';
import farmer2 from 'src/assets/images/farmer2.jpeg';
import farmer3 from 'src/assets/images/farmer3.jpeg';
import farmer4 from 'src/assets/images/farmer4.jpeg';
import farmer5 from 'src/assets/images/farmer5.jpeg';
import farmer6 from 'src/assets/images/farmer6.jpeg';
import farmer7 from 'src/assets/images/farmer7.jpeg';
import farmer8 from 'src/assets/images/farmer8.jpeg';
import farmer9 from 'src/assets/images/farmer9.jpeg';
import farmer10 from 'src/assets/images/farmer10.jpeg';
import { FaChevronDown, FaEnvelope, FaIdCard, FaMapMarker, FaMapMarkerAlt } from 'react-icons/fa';
import { MdOutlineMultilineChart, MdOutlineScoreboard } from "react-icons/md";
import { MdSmartphone } from 'react-icons/md';
import axios from 'axios';
import AiSolutionsForm from '../aisolutions/aiSolutionsForm';
import { saveFarmerInFocus, saveTotalPagesAgents } from 'src/redux/reducers/group.slice';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { BsSpeedometer } from 'react-icons/bs';
import InfoRow from './inforow';

function preventDefault(event) {
  event.preventDefault();
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "85%",
  height:"85%",

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AdditionalInfoCard({data,type,image,agentId,agentAddedId,farmerId,farmerName,farmName,phoneNumber,email,city,index,setAiForm,aiForm}) {
  const { user } = useSelector((state) => state.auth);
  console.log("data in farmer-->",data)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  function normalizeAge(ageValue) {
  
    // If it's null, undefined, or empty, return as is
    if (!ageValue) return ageValue;


    // If it's a string that contains the word "year", just return it as is
    if (typeof ageValue === "string") {
      return ageValue;
    }
  
  
    // If it's already a number, assume it's an age in years
    if (typeof ageValue === "number") return ageValue.toString();
  
    // If it's a string that contains the word "year", just return it as is
    if (typeof ageValue === "string" && ageValue.toLowerCase().includes("year")) {
      return ageValue;
    }
  
    // If it looks like a date string, try to parse it
    const date = new Date(ageValue);
    if (!isNaN(date.getTime())) {
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const m = today.getMonth() - date.getMonth();
  
      // Adjust if birthday hasn’t occurred yet this year
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
      }
  
      return age;
    }
  }

 
console.log("IMAGE IN ADDITIONAL CARD IS__>",image)


  const [mapsLocation,setMapsLocation] = useState(' ')
 const [open,setOpen] =useState(false)

 const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
 //   const fetchLocationData = async () => {
 //     try {
 //       const response = await axios.get(
 //         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.gps.split(',')[0]}&lon=${data.gps.split(',')[1]}&zoom=8&addressdetails=3`
 //       );
 //       const returnData = await response.data;
 //   
 //       console.log("data from nominatim is --> ",returnData)  
//
 //   if (returnData && returnData.display_name) {
 //     
 //     setMapsLocation(
 //      
 //       returnData.display_name
 //     );
 //   }
 // } catch (error) {
 //   console.error('Error fetching location data from nominatim:', error);
 // }
//};
//
//
 // fetchLocationData();

  // console.log("GPS 0-->",data.gps && data.gps.split(',')[0])
  // console.log("GPS 1-->",data.gps && data.gps.split(',')[1])

  }, []);




  return (
<>
  <Grid container alignItems="center" style={{ padding: '10px', backgroundColor: "transparent" }} onClick={() => { setAiForm(false) }}>

    {aiForm &&
      <AiSolutionsForm setAiForm={setAiForm} />
    }

    <Grid xs={12} sm={12} container alignItems="center" sx={{
      borderRadius: "1rem",
      display: "flex",
      gap: { xs: "1.5rem", sm: "1rem" },
      width: "100%",
      alignItems: "center",
      flexDirection: { xs: "column", sm: "row" }
    }}>
       
      <Grid xs={12} sm={6.7} sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#FFF",
        borderRadius: "1rem",
        padding: { xs: "1.5rem 1rem", sm: "0" },
        height: "13.5rem",
      }}>
        <Grid item xs={12} sm={9} sx={{
          textAlign: 'center',
          // height: { xs: "auto", sm: "10.5rem" },
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-start" },
          position: "relative",
          bottom: { xs: "0", sm: "0.3rem" },
          left: { xs: "0", sm: "1.5rem" },
        }}>
          <img src={image && image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; 
              currentTarget.src = index === 0 ? farmer1 : index === 1 ? farmer2 : index === 2 ? farmer3 : index === 3 ? farmer4 : index === 4 ? farmer5 : index === 5 ? farmer6 : index === 6 ? farmer7 : index === 7 ? farmer8 : index === 8 ? farmer9 : index === 9 ? farmer10 : farmer10;
            }} 
            style={{ 
              position: "relative",
              top: { xs: "0", sm: "1.3rem" },
              marginLeft: { xs: "0", sm: "2rem" },
              marginBottom: { xs: "1.5rem", sm: "1rem" },
              height: "7rem",
              width: "7rem",
              borderRadius: "50%" 
            }} alt="farmer image"
          />
        </Grid>

        <Grid xs={12} sm={8} sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#FFF",
          padding: { xs: "0 0.5rem", sm: "0" }
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1rem",
            position: "relative"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              textAlign: "left",
              color: "lightgray",
              width: "100%"
            }}>
              <Typography variant="h4" sx={{ 
                fontFamily: "Poppins", 
                fontWeight: "500", 
                color: "black",
                fontSize: { xs: "1rem", sm: "1.3rem" }
              }}> 
                {data.name}
              </Typography>

              <div style={{ 
                fontSize: { xs: "0.5rem", sm: "0.6rem" },
                color: "#000000", 
                position: "relative", 
                top: "-0.2rem", 
                marginBottom: "0.5rem" 
              }}>
                Onboard Date: <b>{data.onboardDate && !isNaN(new Date(data.onboardDate).getTime()) ? new Date(data.onboardDate).toDateString() : data.createdAt && !isNaN(new Date(data.createdAt).getTime()) ? new Date(data.createdAt).toDateString() : "Sept 23rd, 2024"}</b> 7:16PM
              </div>

              {agentAddedId &&
                <div> 
                  {agentAddedId}
                </div>
              }
      
              {type === "one" &&
                <div>
                  {farmName}
                </div>
              }
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FaIdCard style={{ fontSize: "0.8rem", cursor: "pointer" }}/>
                <span style={{ wordBreak: "break-all" }}>
                  {agentId}&nbsp;&nbsp;{farmerId}
                </span>
              </div>

              {type === "one" &&
                <div style={{ 
                  display: "flex", 
                  gap: "0rem", 
                  marginTop: "0rem", 
                  marginBottom: "0rem", 
                  justifyContent: "flex-start"
                }}>
                  <FaMapMarker style={{ fontSize: "0.7rem", position: "relative", top: "0.3rem", cursor: "pointer" }}/>
                  &nbsp;&nbsp;
                  <div style={{ maxWidth: "16rem", wordBreak: "break-word" }}>
                    {data.locationName ? data.locationName : "N/A"}
                  </div>
                </div>
              }

              <div>
                <FaEnvelope className="iconHover" style={{ fontSize: "0.7rem", cursor: "pointer" }} />
                &nbsp;&nbsp;-
              </div>
            </div>

            {type !== "one" &&
              <Button
                variant={'contained'}
                style={{
                  minHeight: '30px',
                  minWidth: '120px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '4px',
                }}
                onClick={() => {}}
              >
                Contact
              </Button>
            }
          </div>
        </Grid>

        <Grid xs={12} sm={12} style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start", justifyContent: "flex-start", backgroundColor: "#FFF" }}>
          <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "flex-start", justifyContent: "flex-start", gap: "0rem", position: "relative", top: { xs: "0", sm: "-1.55rem" } }}>
            <div onClick={() => {
              dispatch(saveFarmerInFocus(data));
              setTimeout(() => { navigate('/dashboard/credit-score') }, 1300);
            }}
              style={{ cursor: "pointer", display: "flex", flexDirection: "row", width: "100%", justifyContent: "flex-start", alignItems: "center", gap: "1rem", textAlign: "left", color: "black", position: "relative", left: { xs: "0", sm: "0.9rem" } }}
            >
              <BsSpeedometer style={{ fontSize: "1.5rem", top: { xs: "0", sm: "-14px" }, position: "relative", left: { xs: "0", sm: "0.5rem" } }} /> 
              <div style={{ display: "flex", flexDirection: "column" }}> 
                Credit Score:
                <b> 
                  <Box flex={1} display="flex" flexDirection="row" alignItems="center" sx={{ position: "relative", top: "-0.3rem", gap: "0rem", flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                    <Typography variant="h3" fontWeight={700} color="#141B34" style={{ 
                      fontFamily: "Poppins",
                      scale: "0.7",
                      color: data && data.riskScore ?
                        (data.riskScore < 4 ?
                          "#DF2007"
                          :
                          data.riskScore >= 4 && data.riskScore < 7 ?
                            "#ED9E0B"
                            :
                            "#0A9C36"
                        )
                        : '#0A9C36',
                    }}>
                      {data && data.riskScore ? data.riskScore : "7.5"}
                    </Typography>
                   
                    <Button
                      variant="contained"
                      sx={{
                        scale: "0.7",
                        position: "relative",
                        left: { xs: "0", sm: "-0.5rem" },
                        fontFamily: "Poppins",
                        backgroundColor: data && data.riskScore ?
                          (data.riskScore < 4 ?
                            "#DF200733"
                            :
                            data.riskScore >= 4 && data.riskScore < 7 ?
                              "#ED9E0B33"
                              :
                              "#0A9C3633"
                          )
                          : '#0A9C3633',
                        borderRadius: '2rem',
                        color: 'white',
                        textTransform: 'none',
                        paddingX: 3,
                        fontWeight: 400,
                        fontSize: '0.675rem',
                        '&:hover': {
                          backgroundColor: data && data.riskScore ?
                            (data.riskScore < 4 ?
                              "#DF200733"
                              :
                              data.riskScore >= 4 && data.riskScore < 7 ?
                                "#ED9E0B33"
                                :
                                "#0A9C3633"
                            )
                            : '#0A9C3633',
                          color: 'inherit',
                          cursor: 'default',
                          boxShadow: 'none',
                        },
                        marginTop: { xs: "0.5rem", sm: "0" }
                      }}
                    >
                      {data && data.riskScore ?
                        (data.riskScore < 4 ?
                          <span style={{ 
                            opacity: 1,
                            color: data && data.riskScore ?
                              (data.riskScore < 4 ?
                                "#DF2007"
                                :
                                data.riskScore >= 4 && data.riskScore < 7 ?
                                  "#ED9E0B"
                                  :
                                  "#0A9C36")
                              : "#0A9C36"
                          }}>Poor</span>
                          :
                          data.riskScore >= 4 && data.riskScore < 7 ?
                            <span style={{ 
                              opacity: 1,
                              color: data && data.riskScore ?
                                (data.riskScore < 4 ?
                                  "#DF2007"
                                  :
                                  data.riskScore >= 4 && data.riskScore < 7 ?
                                    "#ED9E0B"
                                    :
                                    "#0A9C36")
                                : "#0A9C36"
                            }}>Good</span>
                            :
                            <span style={{ 
                              opacity: 1,
                              color: data && data.riskScore ?
                                (data.riskScore < 4 ?
                                  "#DF2007"
                                  :
                                  data.riskScore >= 4 && data.riskScore < 7 ?
                                    "#ED9E0B"
                                    :
                                    "#0A9C36")
                                : "#0A9C36"
                            }}>Excellent</span>
                        )
                        : 
                        <span style={{ 
                          opacity: 1,
                          color: data && data.riskScore ?
                            (data.riskScore < 4 ?
                              "#DF2007"
                              :
                              data.riskScore >= 4 && data.riskScore < 7 ?
                                "#ED9E0B"
                                :
                                "#0A9C36")
                            : "#0A9C36"
                        }}>Good</span>
                      }
                    </Button>
                  </Box>
                </b>
              </div>    
              <FaChevronDown style={{ fontSize: "1rem", top: { xs: "0", sm: "-14px" }, left: { xs: "0", sm: "-18px" }, position: "relative" }}/>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={5} sx={{ textAlign: 'center', display: "flex", minHeight: "12.5rem", justifyContent: "center", background: "white", borderRadius: "1rem", marginTop: { xs: "1rem", sm: "0" } }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column" }}> 
          <Box sx={{ width: "80%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" } }}>Farm Size/ha </Box>
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" }, fontWeight: "1rem", color: "#000000" }}>
            {data && data.farmSize ? data.farmSize.slice(0, 3) : 0}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%", flexDirection: "column" }}> 
          <Box sx={{ width: "30%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" } }}>Crops/Livestock </Box>
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" }, fontWeight: "1rem", color: "#000000" }}> 1 </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexDirection: "column" }}> 
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.1rem" } }}>Harvests </Box>
          <Box sx={{ width: "50%", textAlign: "center", fontSize: { xs: "0.8rem", sm: "1.1rem", md: "1.6rem" }, fontWeight: "1rem", color: "#000000" }}>
            {data && data.lastHarvest ? data.lastHarvest : 2}
          </Box>
        </Box>
      </Grid>
    </Grid>

    <br/>
    <br/>

    {/* INFORMATION SECTION - KEEP EXACTLY AS ORIGINAL */}
    {/**FOR NON MOBILE SCREENS */ !isMobile &&
    <Grid container sx={{ borderRadius: "1rem", background: "#FFF", color: "black", marginTop: "2rem", padding: "20px" }}>
      <Grid item xs={6}>
        <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '22.23px', fontWeight: "300" }}>
          Information
        </Typography>
        <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '24.33px' }}>
          <b></b>
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          border: '0px solid red',
          minHeight: '25px',
          minWidth: '100px',
        }}
      >
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
        </Grid>
      </Grid>
     
      <br />

      <Grid container sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", flexDirection: "row" }}>
        
        <Grid item xs={12} sm={7.5} sx={{ textAlign: 'center', height: "36rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem", width: "100%", fontSize: "1rem", paddingLeft: "1rem" }}>
          <Box sx={{ scale: "1", display: "flex", width: "47%", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "1.5rem" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "50%", textAlign: "left" }}>Age</Box>
              <Box sx={{ width: "50%", textAlign: "left" }}>{data && data.age!==null && normalizeAge(data.age.toString())  }</Box>

              
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "50%", textAlign: "left" }}>Gender</Box>
              <Box sx={{ width: "50%", textAlign: "left" }}>{data && data.gender ? data.gender : "Male"}</Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "50%", textAlign: "left" }}>Phone</Box>  
              <Box sx={{ width: "50%", maxWidth: "50%", textAlign: "left", wordBreak: "break-all" }}>
                {data && data.phone && !data.phone.includes('/') ?
                  data && data.phone
                  :
                  data.phone && data.phone.includes('/') ? data.phone.split('/').map((item, index) => (
                    <span key={index} style={{ marginRight: "0rem" }}> {item}{index !== data.phone.split('/').length ? ',' : '.'} </span>
                  ))
                  :
                  data && data.phoneNumber ?
                    data.phoneNumber
                    :
                    "+221772109382"
                }
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "50%", textAlign: "left" }}>Family Size</Box>
              <Box sx={{ width: "50%", textAlign: "left" }}>{data && data.familySize ? data.familySize : "7"} </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "50%", textAlign: "left" }}>GPS Stamp</Box>
              <Box sx={{ width: "50%", textAlign: "left", wordBreak: "break-all" }}>
                {data && data.gps && data.gps.split(',').map((item, index) => (
                  <span key={index} style={{ marginRight: "0rem" }}> {item}{index !== data.gps.split(',').length - 1 ? ',' : ''} </span>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "50%", textAlign: "left" }}>ID Type</Box>
              <Box sx={{ width: "50%", textAlign: "left" }}>{data && data.idType ? data.idType : "-"}</Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "50%", textAlign: "left" }}>Farming Experience</Box>
              <Box sx={{ width: "50%", textAlign: "left" }}>{data && data.experience ? data.experience : data && data.farmingExperience ? data.farmingExperience : "5 years"}</Box>
            </Box>
          </Box>
      
          <Box sx={{ display: "flex", width: "1%", height: "32rem", borderLeft: "1px solid lightgrey", position: "relative" }}>
          </Box>

          <Box sx={{ scale: "1", display: "flex", width: "49%", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "1.5rem" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "60%", textAlign: "left" }}>Crops/Livestock</Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>
                {data && data.produce ? data.produce : data && data.crop_types ? data.crop_types : data && data.what_crop_are_you_farming ? data.what_crop_are_you_farming : data.farmingCrop ? data.farmingCrop : data.cropType ? data.cropType : 'Maize'}
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "60%", textAlign: "left" }}>Farm Size</Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>{data.farmSize && data.farmSize}{data.farmSize && !data.farmSize.includes("hect") && " Hectares"} </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "60%", textAlign: "left" }}>Sales Channels</Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>{data && data.salesChannel ? data.salesChannel : data && data.whereDoYouSell ? data.whereDoYouSell : data && data.market ? data.market : "Market"}</Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "60%", textAlign: "left" }}>Insurance</Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>{data && data.insurance ? data.insurance : "None"}</Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "60%", textAlign: "left" }}>Irrigation</Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>{data && data.irrigation ? "Yes" : "No"} </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "60%", textAlign: "left" }}>Chemicals Used</Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>{data && data.chemicals && data.chemicals !== 'yes' && data.chemicals !== 'no' ? data.chemicals : data && data.previousChemicals ? data.previousChemicals : 'NPX-15-15-15'} </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}> 
              <Box sx={{ width: "60%", textAlign: "left", color: "red" }}>Challenges</Box>
              <Box sx={{ width: "40%", textAlign: "left" }}>{data && data.challenges ? data.challenges : data && data.problem ? data.problem : "None for now"} </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} sx={{ textAlign: 'center', height: "10rem", display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "1rem", flexDirection: "row", fontSize: "1rem", paddingLeft: "3rem" }}>
          {!data.gps ?
            <div
              style={{
                textDecoration: 'none',
                overflow: 'hidden',
                maxWidth: '100%',
                width: '400px',
                height: '500px',
                borderRadius: "1.3rem",
                borderBottomRadius: "1.3rem"
              }}
            >
              <div
                style={{
                  height: '70%',
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <iframe
                  style={{
                    height: '100%',
                    width: '100%',
                    border: 0,
                  }}
                  frameBorder="0"
                  src={`https://www.google.com/maps/embed/v1/place?q=+13.1383064,-14.1242743&zoom=11&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            :
            <div
              style={{
                textDecoration: 'none',
                overflow: 'hidden',
                maxWidth: '100%',
                width: '400px',
                height: '500px',
                borderRadius: "1.3rem",
                borderBottomRadius: "1.3rem"
              }}
            >
              <div
                style={{
                  height: '70%',
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <iframe
                  style={{
                    height: '100%',
                    width: '100%',
                    border: 0,
                  }}
                  frameBorder="0"
                  src={`https://www.google.com/maps/embed/v1/place?q=${data.gps.split(',')[0]},${data.gps.split(',')[1]}&zoom=11&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                  allowFullScreen
                ></iframe>
              </div>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <iframe
                    style={{
                      height: '100%',
                      width: '100%',
                      border: 0,
                    }}
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/streetview?location=${data.gps.split(',')[0]},${data.gps.split(',')[1]}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                    allowFullScreen
                  ></iframe>
                </Box>
              </Modal>
            </div>
          }
        </Grid>

        <Box 
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          //onClick={() => {
          //  const username = data.name__first__last || data.name;
          //  dispatch(fetchSpecificResponse(data._id))
          //    .then((res) => { 
          //      setTimeout(() => {
          //        navigate("/dashboard/view-response")
          //      }, 2000);
          //    })
          //}}
        >
          <Box sx={{ justifySelf: "flex-end", marginRight: "10%", marginTop: "-5%", cursor: "pointer" }}>
            <CreateIcon />
          </Box>
        </Box>
      </Grid>
    </Grid>
   /**NOT FOR MOBILE END */ }


{/*FOR MOBILE SCREENS START*/ isMobile &&
<Grid
  container
  sx={{
    borderRadius: "1rem",
    background: "#FFF",
    color: "black",
    mt: 4,
    p: 3,
  }}
>
  {/* HEADER */}
  <Grid item xs={12} sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{ fontSize: { xs: "18px", md: "22px" }, fontWeight: 400 }}
    >
      Information
    </Typography>
  </Grid>

  {/* LEFT SIDE - INFO */}
  <Grid item xs={12} md={8}>
    <Grid container spacing={3}>
      {/* LEFT COLUMN */}
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <InfoRow label="Age" value={data?.age ? normalizeAge(data.age.toString()) : "-"} />
          <InfoRow label="Gender" value={data?.gender || "Male"} />
          <InfoRow label="Phone" value={data?.phone || data?.phoneNumber || "+221772109382"} />
          <InfoRow label="Family Size" value={data?.familySize || "7"} />
          <InfoRow
            label="GPS Stamp"
            value={data?.gps || "-"}
          />
          <InfoRow label="ID Type" value={data?.idType || "-"} />
          <InfoRow
            label="Farming Experience"
            value={
              data?.experience ||
              data?.farmingExperience ||
              "5 years"
            }
          />
        </Stack>
      </Grid>

      {/* RIGHT COLUMN */}
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <InfoRow
            label="Crops/Livestock"
            value={
              data?.produce ||
              data?.crop_types ||
              data?.what_crop_are_you_farming ||
              data?.farmingCrop ||
              data?.cropType ||
              "Maize"
            }
          />
          <InfoRow
            label="Farm Size"
            value={
              data?.farmSize
                ? `${data.farmSize} ${
                    !data.farmSize.includes("hect") ? "Hectares" : ""
                  }`
                : "-"
            }
          />
          <InfoRow
            label="Sales Channels"
            value={
              data?.salesChannel ||
              data?.whereDoYouSell ||
              data?.market ||
              "Market"
            }
          />
          <InfoRow label="Insurance" value={data?.insurance || "None"} />
          <InfoRow label="Irrigation" value={data?.irrigation ? "Yes" : "No"} />
          <InfoRow
            label="Chemicals Used"
            value={
              data?.chemicals &&
              data.chemicals !== "yes" &&
              data.chemicals !== "no"
                ? data.chemicals
                : data?.previousChemicals || "NPX-15-15-15"
            }
          />
          <InfoRow
            label="Challenges"
            value={data?.challenges || data?.problem || "None for now"}
            danger
          />
        </Stack>
      </Grid>
    </Grid>
  </Grid>

  {/* RIGHT SIDE - MAP */}
  <Grid item xs={12} md={4} sx={{ mt: { xs: 4, md: 0 } }}>
    <Box
      sx={{
        width: "100%",
        height: { xs: "300px", md: "500px" },
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <iframe
        style={{
          width: "100%",
          height: "100%",
          border: 0,
        }}
        src={`https://www.google.com/maps/embed/v1/place?q=${
          data?.gps
            ? `${data.gps.split(",")[0]},${data.gps.split(",")[1]}`
            : "13.1383064,-14.1242743"
        }&zoom=11&key=YOUR_GOOGLE_MAPS_KEY`}
        allowFullScreen
      />
    </Box>
  </Grid>

  {/* EDIT ICON */}
  <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
    <Box
      sx={{ cursor: "pointer" }}
     // onClick={() => {
     //   dispatch(fetchSpecificResponse(data._id)).then(() => {
     //     setTimeout(() => {
     //       navigate("/dashboard/view-response");
     //     }, 1000);
     //   });
     // }}
    >
      <CreateIcon />
    </Box>
  </Grid>
</Grid>
/*FOR MOBILE SCREENS END*/}




    <br />
  </Grid>
</>
  );
}
