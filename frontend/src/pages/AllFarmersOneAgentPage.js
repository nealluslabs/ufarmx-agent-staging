import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups,fetchFarmersFromPage, filterFarmersByCrop, filterFarmersByLocation, filterFarmersByCropType, sectionFarmersFromPage } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';
import { saveCurrentFarmersToDisplay,saveFilteredFarmers,saveCurrentLocationFilter,saveCurrentCropTypeFilter,saveCurrentCropFilter,saveTotalPagesFarmers } from 'src/redux/reducers/group.slice';

import { FaFilter } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import FarmerStatsLong from 'src/components/home/farmer-stats-long';
import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';

import { FaPlus } from 'react-icons/fa6';




export default function AllFarmersForOneAgentPage() {
  const theme = useTheme();
  const { page } = useParams();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

 
 
  useEffect(()=>{
    console.log("ALL FARMERS ONE AGENT, WHAT IS THE USER--->",user)
   if(!user ){
    navigate('/login')
   }

  },[user])



  const { 
    myGroups,
     isLoading,
     currentFarmersToDisplay,
    totalPagesFarmers,
    allFarmersForThisAgent,
    filteredFarmers,
    currentLocationFilter,
    currentCropFilter,
    currentCropTypeFilter 
  } = useSelector((state) => state.group);
   
  //const { students } = useSelector((state) => state.student);


  const [selectedClass, setSelectedClass] = useState(/.*/ );
  const [selectedSection, setSelectedSection] = useState(/.*/ );
  const [selectedFilter, setSelectedFilter] = useState(''); /**not using regular expressions here */
  const [selectedLocation, setSelectedLocation] = useState(/.*/ );
  const [loadingPage,setLoadingPage] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
    setLoadingPage(true)
    }
    ,1500)
    },[])
    

 /* const forcedId =  []
  currentFarmersToDisplay.forEach((item,index)=>{
  
    forcedId.push({
      ...item,
      id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
    })
      
  })
  console.log('FORCED ID IS-->',forcedId)*/

  const[farmersFromDB,setFarmersFromDB] = useState([])

  const farmer1 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863974/farmer8_l3ewpm.png"
  const farmer2 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863990/farmer2_icjojq.png"
  const farmer3 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863997/farmer5_ip0m4q.png"
  const farmer4 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863998/farmer7_zsvpiv.png"
  const farmer5 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724863996/farmer3_ngfl1i.png"
  const farmer6 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866493/farmer1_ijfjvu.png"
  const farmer7 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866568/farmer10_bnpjqc.png"
  const farmer8 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866571/farmer9_l6pqj5.png"
  const farmer9 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer4_mp8ffo.png"
  const farmer10 = "https://res.cloudinary.com/deoprtt98/image/upload/v1724866573/farmer6_fnwxhj.png"



  useEffect(() => {
    /*THIS USE EFFECT IS IMPORTANT TO ASSGIN AN ID SO MUI DATA GRID WILL ACCEPT THE DATA */
  const forcedId =  []
    allFarmersForThisAgent.forEach((item,index)=>{
  
    forcedId.push({
      ...item,
      index:index,
      id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
    })
      
  })

  setFarmersFromDB(forcedId)

 

  }, [allFarmersForThisAgent])






//useEffect(()=>{
//  /**THIS USE EFFECT IS FOR INITIAL LOAD, USUALLY AFTER LOGIN, WITHOUT HAVING SELECTED A PAGE */
//if(!page){
//  dispatch(sectionFarmersFromPage(1,allFarmersForThisAgent,filteredFarmers,"farmers"))
//}
//else{
//  dispatch(sectionFarmersFromPage(page,allFarmersForThisAgent,filteredFarmers,"farmers"))
//}
//
//
//
//},[page,selectedClass,selectedLocation,selectedSection])




useEffect(()=>{
  /**THIS USE EFFECT IS TO CLEAR UP FILTERS ANYTIME THE PAGE IS RELOADED, FOR A FRESH START */
  /**THIS USE EFFECT HAS TO BE BELOW THE PAGE ONE SO THAT */
     
        // dispatch(sectionFarmersFromPage(1,[],allFarmersForThisAgent))
     return ()=>{
      dispatch(saveCurrentCropTypeFilter(/.*/));
        dispatch(saveCurrentLocationFilter(/.*/));
        dispatch(saveCurrentCropFilter(/.*/));
      dispatch(saveCurrentFarmersToDisplay(allFarmersForThisAgent && allFarmersForThisAgent/*.slice(0,10)*/  ))
      dispatch(saveFilteredFarmers(allFarmersForThisAgent && allFarmersForThisAgent/*.slice(0,10)*/ ))
         dispatch(saveTotalPagesFarmers(Math.ceil(allFarmersForThisAgent.length/10)))
         //console.log('FARMERS CLEARED UP!');
      }
    },[])




  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('viewStudents');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleViewStudentsClick = () => {
    setActiveButton('viewStudents');
 
  };

  const handleAddStudentsClick = () => {
    setActiveButton('addStudents');
  };

  return (
    <>

     <Helmet>
        <title> UfarmX </title>
      </Helmet>

{totalPagesFarmers < 0  || !loadingPage?
     <center style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
      <CircularProgress/>
     </center>
  :
      <Container maxWidth="xl" style={{scale:"0.9",position:"relative",top:"-2rem",left:"-2rem"}} >
      
   
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",marginTop:"0.3rem",paddingRight:"0rem"}}> 
       
       <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"1.5rem"}}>
     
     <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
     
     <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Farmers</h1>
     <div>View and manage all farmers</div>
     
     </div>
     
     
        <Button
        onClick={()=>{navigate('/dashboard/add-farmer')}}
              variant={'contained'}
              style={{
                minHeight: '50px',
                maxWidth: '150px',
                backgroundColor: '#0A6054',
                // backgroundColor: '#FFFFFF',
     
                color: 'white',
                border: '1px solid black',
                fontWeight:"400",
                fontSize:"1.1rem",
                borderRadius: '5px',
                marginRight: '0px',
              }}
              
            >
             <FaPlus   style={{marginRight:"0.1rem"}}/>
             Add Farmer
         </Button>
     
     </Grid>
     
     
            {/*
               <Button
                   onClick={()=>{navigate('/dashboard/add-farmer')}}
                     variant={'contained'}
                     style={{
                       minHeight: '50px',
                       minWidth: '180px',
                       backgroundColor: '#2DA840',
                       color: '#fff',
                       border: 'none',
                       borderRadius: '20px',
                       marginRight: '4px',
                       position:"relative",
                       bottom:"4px"
                     }}
                    
                   >
                    Add Farmer
                   </Button>
           
     
            <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
                 <Box sx={{ width: '100%'}}>
                  
     
                   <Button
                     variant={'contained'}
                     style={{
                       minHeight: '50px',
                       minWidth: '180px',
                       backgroundColor: '#21712E',
                       color: '#fff',
                       border: 'none',
                       borderRadius: '20px',
                       marginRight: '4px',
                     }}
                     
                   >
                    Filter
                   </Button>
     
                 </Box>
     
              
               </Grid>
          
           */}
               </Grid>
             
               
     
               <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end",paddingRight:"0rem"}}> 
               
               <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",borderRadius:"2rem",padding:"0.5rem" }}>
              
                   <Box sx={{ width: '100%', marginTop: '0%'}}>
                     <SmallCustomSearchBar   title={"Search Farmers"} functionality={"farmers"} />
                   </Box>
                </Grid>
     
               
                  <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
                  
     
                    <Box sx={{ width: '100%'}}>
                 
                      <Button
                        variant={'contained'}
                        style={{
                          minHeight: '50px',
                          minWidth: '140px',
                         // backgroundColor: '#21712E',
                           backgroundColor: '#FFFFFF',
     
                          color: 'black',
                          border: '1px solid black',
                          fontWeight:"400",
                          fontSize:"1.3rem",
                          borderRadius: '5px',
                          marginRight: '-10px',
                        }}
                        
                      >
                       <CiFilter  style={{marginRight:"0.5rem"}}/>
                       Filters
                      </Button>
        
                    </Box>
        
                 
                  </Grid>
     
     
     
               </Grid>
          <br/>
          


          <Grid item xs={12} md={12} lg={12} >
           <div style={{background: 'white', padding: '10px',paddingLeft:"0",paddingRight:"0",marginTop:"-2.5rem",width:"100%"}}>

           
              
                {/**here 2 */}
                  <Grid container spacing={2} sx={{ padding: '10px',display:"flex",justifyContent:{xs:"space-around",sm:"flex-start"}}}>
                  {/*<Grid item xs={3} sx={{mb: 0}}>
                <p style={{fontSize:"24px",fontWeight:"600",position:"relative",top:"-1.2rem",left:"2rem"}}>Farmers</p>
                 </Grid>*/}

               {
               
                 <Grid xs={2} item sx={{mb: 0}}>
             <FormControl sx={{width:{xs:60,sm:140}, minWidth: 60, background: 'white' }}>
                  <Select
                    value={selectedLocation}
                    onChange={(e) => {setSelectedLocation(e.target.value); dispatch(filterFarmersByLocation(e.target.value,allFarmersForThisAgent,filteredFarmers,page,currentLocationFilter,currentCropFilter,currentCropTypeFilter ))  }}
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      width:{xs:60,sm:140},
                      p: 1,
                    }}
                  >
                    <MenuItem value="">
                      Select Location
                    </MenuItem>
            
                    <MenuItem value={"Sénégal"}>Sénégal</MenuItem>
                    <MenuItem value={"Nigeria"}>Nigeria</MenuItem>
                    <MenuItem value={"Cameroon"}>Cameroon</MenuItem>
                    <MenuItem value={/.*/ }>Clear Filter</MenuItem>
                   
                  </Select>
                </FormControl>
              </Grid>
                }
               

      {  
                <Grid xs={2} item sx={{mb: 0}}>
             <FormControl sx={{ width:{xs:60,sm:140},minWidth: 60, background: 'white' }}>
                  <Select
                    value={selectedClass}
                    onChange={(e) => {setSelectedClass(e.target.value);dispatch(filterFarmersByCropType(e.target.value,allFarmersForThisAgent,filteredFarmers,page,currentLocationFilter,currentCropFilter,currentCropTypeFilter)) }  }
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      width:{xs:60,sm:140},
                      p: 1,
                    }}
                  >
                    <MenuItem value="">
                      Select Crop Type
                    </MenuItem>
                <MenuItem value={'Cash Crops'}>Cash Crops</MenuItem>
                <MenuItem value={'Forage Crops'}>Forage Crops</MenuItem>
                <MenuItem value={'Fibre Crops'}>Fibre Crops</MenuItem>
                <MenuItem value={'Oil Crops'}>Oil Crops</MenuItem>
                <MenuItem value={/.*/ }>
                      Clear Filter
                    </MenuItem>
               
                  </Select>
                </FormControl>
              </Grid>
             } 
           

        {   
            <Grid xs={2} item sx={{mb: 0}}>
            <FormControl sx={{  width:{xs:60,sm:140},minWidth: 60, background: 'white' }}>
                 <Select
                   value={selectedSection}
                   onChange={(e) => {setSelectedSection(e.target.value) ; dispatch(filterFarmersByCrop(e.target.value,allFarmersForThisAgent,filteredFarmers,page,currentLocationFilter,currentCropFilter,currentCropTypeFilter))  } }
                   displayEmpty
                   label=""
                   sx={{
                     height: 45,
                     width:{xs:60,sm:140},
                     p: 1,
                   }}
                 >
                   <MenuItem value="" disabled={true}>
                     Select Crop
                   </MenuItem>
                   <MenuItem value={/.*/ }>
                     Clear Filter
                   </MenuItem>
                   <MenuItem value={"Mai"}>Maize</MenuItem>
                   <MenuItem value={"Tomat"}>Tomato</MenuItem>
                   <MenuItem value={"Potato"}>Potato</MenuItem>
                   <MenuItem value={"Onion"}>Onions</MenuItem>
                   <MenuItem value={"mouton"}>Sheep</MenuItem>
                   <MenuItem value={"Oignon"}>Onions(French)</MenuItem>
                  
                   <MenuItem value={"gumbo"}>Gumbo</MenuItem>
                   <MenuItem value={"Millet"}>Millet</MenuItem>
                   <MenuItem value={"Okra"}>Okra</MenuItem>
                   <MenuItem value={"Cocoyam"}>Cocoyam</MenuItem>
                   <MenuItem value={"Pepper"}>Pepper</MenuItem>
                   <MenuItem value={"bergine"}>Aubergine</MenuItem>
                   
                   <MenuItem value={"ulet"}>Chicken</MenuItem>
                   <MenuItem value={"Cabbage"}>Cabbage</MenuItem>
                   <MenuItem value={"vache"}>Cow</MenuItem>
                  
                   <MenuItem value={"âne"}>Donkey </MenuItem>
                   <MenuItem value={"chiévres"}>Goat</MenuItem>
                   <MenuItem value={"cheavel"}>Horse</MenuItem>
        
        
        
               
                  
                 </Select>
               </FormControl>
             </Grid>
         //     &nbsp; &nbsp;
         //
         //     <Box sx={{ width: '20%', marginTop: '1.2%',}}>
         //       <SmallCustomSearchBar   title={"Search Crop"} />
         //     </Box>
         //     
         //     <Box sx={{ flexGrow: 1}}>
         //       <Button
         //         variant="contained"
         //         style={{ height: '45px', minWidth: '45px', backgroundColor: '#000000',  marginTop: '6.5%' }}
         //       >
         //         <SearchIcon />
         //       </Button>
         //     </Box>
         //
         //     <Grid item sx={{mb: 0}}>
         //    <FormControl sx={{ minWidth: 140, background: 'white' }}>
         //         <Select
         //           value={selectedFilter}
         //           onChange={(e) => setSelectedFilter(e.target.value)}
         //           displayEmpty
         //           disabled={true}
         //           label=""
         //           sx={{
         //             height: 45,
         //             minWidth: 120,
         //             p: 1,
         //           }}
         //         >
         //           <MenuItem value="">
         //             Filter By
         //           </MenuItem>
         //           <MenuItem value={1}>Option 1</MenuItem>
         //           <MenuItem value={2}>Option 2</MenuItem>
         //           <MenuItem value={3}>Option 3</MenuItem>
         //         </Select>
         //       </FormControl>
         // 
        // </Grid>
        }
            </Grid>

        
            {/*here */}



        { 
        
       farmersFromDB.length > 0 ?
          <FarmerStatsLong  farmers={farmersFromDB}/> 
          :
          <center style={{marginTop:"6rem"}}>
           No Farmers To Display
          </center>
          }
           </div>
           </Grid>
 
           {/*<Paginate style={{position:"relative"}} pages={totalPagesFarmers} page={page} isAdmin={true} allFarmersForThisAgent={allFarmersForThisAgent} filteredFarmers={filteredFarmers}/> */}


      </Container>





    }


    </>
  );
}
