import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups,fetchFarmersFromPage, filterFarmersByCrop, filterFarmersByLocation,filterResponsesByForm, filterFarmersByCropType, sectionResponsesFromPage,sortResponsesByDate, filterResponsesByAgent } from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';



/*import farmer1 from 'src/assets/images/jeansfarmer.jpeg';
import farmer2 from 'src/assets/images/farmer2.jpeg';
import farmer3 from 'src/assets/images/farmer3.jpeg';
import farmer4 from 'src/assets/images/farmer4.jpeg';
import farmer5 from 'src/assets/images/farmer5.jpeg';
import farmer6 from 'src/assets/images/farmer6.jpeg';
import farmer7 from 'src/assets/images/farmer7.jpeg';
import farmer8 from 'src/assets/images/farmer8.jpeg';
import farmer9 from 'src/assets/images/farmer9.jpeg';
import farmer10 from 'src/assets/images/farmer10.jpeg';*/

import noimage from 'src/assets/images/no-image.jpg';




import SmallCustomSearchBar from 'src/components/global/SmalllCustomSearchBar';
import ResponsesStatsLong from 'src/components/home/responses-stats-long';
import PaginateResponses from 'src/components/buttons/PaginateResponses';
import { CiFilter } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa6';
import FormsStatsLong from 'src/components/home/forms-stats-long';


export default function FormsPage() {
  const theme = useTheme();
  const { page } = useParams();
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { agentType } = useSelector((state) => state.group);

  const { 
   
     currentResponsesToDisplay,
     currentFormsToDisplay,
     allForms,
    
    totalPagesForms,
   
    filteredResponses,
   
    
  } = useSelector((state) => state.group);
 // console.log("All agents-->", currentAgentsToDisplay)
  
   
  //const { students } = useSelector((state) => state.student);


 
  const [selectedFilter, setSelectedFilter] = useState(''); /**not using regular expressions here */
  const [selectedForm, setSelectedForm] = useState(/.*/ );
  const [selectedAgent, setSelectedAgent] = useState(/.*/ );
  const [loadingPage,setLoadingPage] = useState(false)

  useEffect(()=>{
setTimeout(()=>{
  setLoadingPage(true)
  }
   ,1500)
  },[])

 

  const[responsesFromDB,setResponsesFromDB] = useState([])

 


 
  useEffect(()=>{

   if(!user ){
    navigate('/login')
   }

  },[user])




  useEffect(() => {
  
    if(agentType && agentType === "Farmer"){
    /*THIS USE EFFECT IS IMPORTANT TO ASSGIN AN ID SO MUI DATA GRID WILL ACCEPT THE DATA */
    const keywords = [
      'farmer',
      'agriculteur',
      'field',
      'animal',
      'velingara',
      'crop',
      'container',
      'conteneur',
      'cultures',
      'ufarmx',
    ];
 
    const forcedId =  []
    allForms.forEach((item,index)=>{
      //console.log("Names are ", item);
   
if (
  keywords.some((keyword) =>
   item.title &&  item.title.toLowerCase().includes(keyword)
  ))
      
      {
      forcedId.push({
        ...item,
        id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
      })


    

    }
  })

  setResponsesFromDB(forcedId)
}
else{


 

  const keywords = [
    'retailer',
   
  ];

  const forcedId =  []
  allForms.forEach((item,index)=>{
    //console.log("Names are ", item);
 
if (
keywords.some((keyword) =>
  item.title && item.title.toLowerCase().includes(keyword)
))
    
    {
    forcedId.push({
      ...item,
      id:item.id ? item.id: item._id ? item._id: item.OriginalResponseId ? item.OriginalResponseId:item.name ? item.name: Math.random()
    })


  

  }
})


setResponsesFromDB(forcedId)
}

 

 // console.log("WHAT WE ARE PRESENTING FOR FORMS-->",allForms);
 // console.log("ALL FORMS-->",allForms);

  }, [currentResponsesToDisplay,currentFormsToDisplay,selectedAgent,selectedFilter,selectedForm,filteredResponses])






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

{totalPagesForms < 0 ||  !loadingPage?
     <center style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
      <CircularProgress/>
     </center>
  :
      <Container style={{scale:"0.9",position:"relative",top:"-5rem",left:"-2rem"}} maxWidth="xl" >
     <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{marginTop:"0.3rem",paddingRight:"0rem"}}> 
     {/*<CustomToggleSwitch activeButton={activeButton} setActiveButton={setActiveButton} handleViewStudentsClick={handleViewStudentsClick} handleAddStudentsClick={handleAddStudentsClick}/>*/}
  
     <Grid container spacing={2} alignItems="center" justifyContent="flex-start" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",marginTop:"0.3rem",paddingRight:"0rem"}}> 
       
       <Grid item xs={12} style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",left:"1rem"}}>
     
     <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
     
     <h1 style={{fontWeight:"500",marginBottom:"0rem"}}>Forms</h1>
     <div>Create, edit and manage forms</div>
     
     </div>
     
     
        <Button
        onClick={()=>{/*navigate('/dashboard/add-farmer')*/}}
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
                marginRight: '12px',
              }}
              
            >
             <FaPlus   style={{marginRight:"0.1rem"}}/>
             New Form
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
        
         

         <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{display:"flex",alignItems:"flex-end",justifyContent:"flex-end",paddingRight:"0rem",position:"relative",left:"1rem"}}> 
         
         <Grid item  style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "1.5rem", marginBottom: "2rem",borderRadius:"2rem",padding:"0.5rem" }}>
        
             <Box sx={{ width: '100%', marginTop: '0%'}}>
               <SmallCustomSearchBar   title={"Search Forms"} />
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
                    marginRight: '4px',
                  }}
                  
                >
                 <CiFilter  style={{marginRight:"0.5rem"}}/>
                 Filters
                </Button>
  
              </Box>
  
           
            </Grid>



         </Grid>
         <br/>
    

      <Grid item /*xs={6}*/ style={{width:"max-content",display: 'flex',justifyContent:"flex-start", alignItems: 'flex-start', marginTop: "0rem", marginBottom: "0rem",backgroundColor:"#F9F9F9",borderRadius:"2rem",padding:"0.5rem" }}>
         {/*   <Box sx={{ width: '100%'}}>
       
         //     <Button
         //     onClick={()=>{navigate('/dashboard/add-agent')}}
         //       variant={'contained'}
         //       style={{
         //         minHeight: '50px',
         //         minWidth: '180px',
         //         backgroundColor: '#2DA840',
         //         color: '#fff',
         //         border: 'none',
         //         borderRadius: '20px',
         //         marginRight: '4px',
         //       }}
         //       onClick={handleOne}
         //     >
         //      Add Agent
         //     </Button>


         //     <Button
         //       variant={'contained'}
         //       style={{
         //         minHeight: '50px',
         //         minWidth: '180px',
         //         backgroundColor: '#21712E',
         //         color: '#fff',
         //         border: 'none',
         //         borderRadius: '20px',
         //         marginRight: '4px',
         //       }}
         //       // onClick={handleOne}
         //     >
         //      Filter
         //     </Button>



            </Box> 
                */}

         
          </Grid>
     

          </Grid>
          
      



          <Grid item xs={12} md={12} lg={12} >
           <div style={{background: 'white',  padding: '0px',marginTop:"-2.5rem"}}>

           
              
                {/**here 2
                  <Grid container spacing={2} sx={{ padding: '10px'}}>
                 

                 <Grid xs={2} item style={{marginBottom: "0rem",marginRight:"1rem"}}>
             <FormControl sx={{ minWidth: 140,width:"80%" ,background: 'white' }}>
                  <Select
                    value={selectedForm}
                onChange={(e) => {setSelectedForm(e.target.value); dispatch(filterResponsesByForm(e.target.value,allResponses,filteredResponses,page,selectedAgent ))  }}
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      minWidth: 140,
                      p: 1,
                    }}
                  >
                    <MenuItem value={.} disabled={true} >
                      Select From
                    </MenuItem>

                    <MenuItem value={"Questionnaire d'Utilisation du Conteneur UFarmX"}>Questionnaire d'Utilisation du Conteneur UFarmX</MenuItem>
                   
                    <MenuItem value={"Formulaire d'Arrivée des Cultures UFarmX"}> Formulaire d'Arrivée des Cultures UFarmX</MenuItem>
                    <MenuItem value={"Velingara"}>Velingara (Français) 2</MenuItem>
                    <MenuItem value={"February Senegal Field Data"}> February Senegal Field Data</MenuItem>
                   
                    <MenuItem value={"Farmer Intake Form"}> Farmer Intake Form (english)</MenuItem>

                    <MenuItem value={"Nigeria Data"}>Nigeria Data</MenuItem>
                    <MenuItem value={"Intake Aug 2024"}>Intake Aug 2024 English</MenuItem>
                    <MenuItem value={. }>Clear Filter</MenuItem>
                   
                   
                   
                  </Select>
                </FormControl>
              </Grid>


              <Grid xs={2} item style={{marginBottom: "0rem",marginRight:"1rem"}}>
             <FormControl sx={{ minWidth: 140,width:"80%" ,background: 'white' }}>
                  <Select
                    value={selectedAgent}
                onChange={(e) => {setSelectedAgent(e.target.value); dispatch(filterResponsesByAgent(e.target.value,page,allResponses,filteredResponses,selectedForm));}}
                    displayEmpty
                    label=""
                    sx={{
                      height: 45,
                      minWidth: 140,
                      p: 1,
                    }}
                  >
                    <MenuItem value="" disabled={true}>
                      Select From
                    </MenuItem>
                    <MenuItem value={.}>
                     Clear FIlter
                    </MenuItem>
                {
                  currentAgentsToDisplay &&  currentAgentsToDisplay.map( (item,index)=>(  

                    <MenuItem value={item.user_id}>{item.firstName + " " + item.lastName }</MenuItem>
                   
                  ))
                  }
                   
                   
                  </Select>
                </FormControl>
              </Grid>
               
               
               
           

          

              &nbsp; &nbsp;
           
         
              <Grid item sx={{mb: 0}}>
             <FormControl sx={{ minWidth: 140, background: 'white' }}>
                  <Select
                    value={selectedFilter}
                    onChange={(e) => {setSelectedFilter(e.target.value); dispatch(sortResponsesByDate(e.target.value,page,allResponses,filteredResponses)) }}
                    displayEmpty
                    
                    label=""
                    sx={{
                      height: 45,
                      minWidth: 120,
                      p: 1,
                    }}
                  >
                    <MenuItem value="">
                      Filter Response Date
                    </MenuItem>
                    <MenuItem value={"Ascending"}>Ascending</MenuItem>
                    <MenuItem value={"Descending"}>Descending</MenuItem>
                   
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            here */}



        { 
        
       responsesFromDB.length > 0 ?  <FormsStatsLong  forms={responsesFromDB}/> 
       :
       <center style={{marginTop:"2rem",marginBottom:"2rem"}}>
          No Forms.
       </center>

          }
           </div>
           </Grid>
 
           {/*<PaginateResponses style={{position:"relative"}} pages={totalPagesResponses} page={page} isAdmin={true} allResponses={allResponses} filteredResponses={filteredResponses}/>*/}

{/* OLD FARMER DISPLAY

           <Grid container spacing={2}>
<Grid item xs={8} md={12} lg={12}>
  <div style={{background: 'white',  padding: '10px',display:"flex",flexDirection:"column",gap:"1rem"}}>
   

{  
currentFarmersToDisplay && currentFarmersToDisplay.map((item,index)=>(

   <PitchCard pic={item.photo != null && item.photo != undefined && item.photo.trim() != ''?item.photo:
   index===0?redboy:index===1?greenboy:index===2?athlete:index===3?amfootball:index===4?redboy:index===5?greenboy:index===6?athlete:index===7?amfootball:index===8?redboy:index===9?greenboy:amfootball}
 
    data={item}
    collection={item.name?(item.name).toUpperCase(): item.firstName && item.lastName? (item.firstName + " " + item.lastName).toUpperCase():" "}
     name={'Dakar, Senegal'}
      uni={ item.produce?item.produce:item.what_crop_are_you_farming?item.what_crop_are_you_farming:item.farmingCrop?item.farmingCrop:" "}
      />

  ))

}   
  


    </div>

 

</Grid>


</Grid>

<Paginate style={{position:"relative"}} pages={totalPagesFarmers} page={page} isAdmin={true}/>


*/}









      </Container>





    }


    </>
  );
}
