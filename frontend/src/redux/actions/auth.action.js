import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup, saveIsAgent,saveAgentType, saveIsFarmer, saveIsAdmin,saveIsSuperAdmin } from '../reducers/group.slice';
//import { clearPitch } from '../reducers/pitch.slice';
import baseUrl from './baseUrl';
import { fetchAllFarmers,fetchAllFarmersForOneRetailer, fetchAllResponses,fetchAgentByPhone,fetchAgentByUserId,fetchFarmerByPhone, fetchAllForms, fetchAllAdmins, fetchFarmersForOneAgent, fetchAllResponsesForOneAgent, fetchAllFarmerProduce,fetchAllRequests, fetchAllRetailerProducts, fetchAllRetailers } from './group.action';
import axios from 'axios';

const getPersistedState = () => {
  try {
    const persistedRootRaw = localStorage.getItem('persist:root');
    if (!persistedRootRaw) return null;
    const persistedRoot = JSON.parse(persistedRootRaw);
    const authState = persistedRoot?.auth ? JSON.parse(persistedRoot.auth) : null;
    const groupState = persistedRoot?.group ? JSON.parse(persistedRoot.group) : null;
    return { authState, groupState };
  } catch (error) {
    return null;
  }
};

const normalizeIdentifier = (value) => (value || '').toString().trim().toLowerCase();

const isSameCachedUser = (inputIdentifier, cachedUser) => {
  const normalizedInput = normalizeIdentifier(inputIdentifier);
  const candidates = [
    cachedUser?.email,
    cachedUser?.phone,
    cachedUser?.phoneNumber,
    cachedUser?.phone_number,
    cachedUser?.username,
  ].map(normalizeIdentifier);

  return normalizedInput && candidates.includes(normalizedInput);
};

const navigateFromCachedRole = (groupState, navigate) => {
  if (groupState?.isAgent) {
    const agentType = (groupState?.agentType || '').toLowerCase();
    if (agentType === 'retailer') {
      navigate('/dashboard/all-retailers-one-agent', { replace: true });
      return;
    }
    navigate('/dashboard/all-farmers-one-agent', { replace: true });
    return;
  }

  if (groupState?.isFarmer) {
    navigate('/dashboard/home-farmer', { replace: true });
    return;
  }

  navigate('/dashboard/home', { replace: true });
};



export const signin = (user, navigate, setLoading) => async (dispatch) => {
 
   const farmerInfo = user
   //console.log('users comms triggered!',farmerInfo)
   const config = {
    headers:{
      'Content-type':"application/json",
      //Authorization:`Bearer ${user.token}`
    }
   }
   //you may not use config here in sign in, but in other routes the config header will be more relevant



   axios.post(`${baseUrl}/api/users/login`,farmerInfo,config)
   .then((res)=>{

    if(res.data.message){

      setLoading(false)
      notifyErrorFxn("Invalid username/password,please try again")
    }
    else{
  //IN THIS BLOCK OF CODE, A USER IS FOUND AND THERE IS NO RES.DATA.MESSAGE, ONLY RES.DATA.USER
    

    console.log('res.data is for token-->',res.data.user)

    //localStorage.setItem('userInfo',JSON.stringify({...res.data.user/*._doc*/,token:res.data.user.token}))
  


 
  if(res.data && res.data.user && res.data.user/*._doc*/ &&  res.data.user/*._doc*/.role &&  res.data.user/*._doc*/.role.includes("Agent")){
  

     //dispatch(fetchAllFarmers())
   axios.get(`${baseUrl}/api/agents/`)
   .then((results) => {
 
    console.log("RESULTS.DATA IS -->",results.data)
    let userData  = {}

    userData = results.data &&  results.data.agents && results.data.agents.filter((item)=>(item.user_id  === res.data.user/*._doc*/._id)) &&  results.data.agents.filter((item)=>(item.user_id  === res.data.user/*._doc*/._id))[0]
    
        console.log("results from ffetching agent by id DATA--->",userData)
  
     if (userData) {
     
      if(userData.type && userData.type.toLowerCase() === "retailer"){ 
      dispatch(fetchAllRetailers(userData && userData.agentId))
     }


     if (userData.type && userData.type.toLowerCase() === "farmer") {
     dispatch(fetchFarmersForOneAgent(userData && userData.agentId))
     
     }

    dispatch(fetchAllForms()); // not using
   dispatch(fetchAllFarmerProduce())  // not using
    dispatch(fetchAllResponsesForOneAgent(res.data.user && res.data.user._id))  // not using
    
    dispatch(saveIsAgent(true))
    dispatch(saveAgentType(userData.type?userData.type:"Farmer"))
    dispatch(saveIsSuperAdmin(false))
    dispatch(saveIsFarmer(false))
    console.log("we have acknowledged agent---->",res.data.user)

    dispatch(/*console.log("Hello")*/ fetchAllResponsesForOneAgent(res.data.user && res.data.user._id)).then(()=>{
   
    dispatch(/*console.log("Hello")*/ fetchFarmersForOneAgent(res.data.user && res.data.user._id)).then(()=> 
    {
if(res.data.user && (res.data.user.phone||res.data.user.phoneNumber||res.data.user.phone_number)){
    setTimeout( ()=>{dispatch(fetchAgentByPhone(res.data.user && (res.data.user.phone||res.data.user.phoneNumber||res.data.user.phone_number),navigate,setLoading,userData.type && userData.type)) }, 3000 )
}
else{
  console.log("WE ARE FETCHING BY USER ID NOW, CUZ PHONE IS UNDEFINED--->",res.data.user)
  setTimeout( ()=>{dispatch(fetchAgentByUserId(res.data.user && (res.data.user._id),navigate,setLoading,userData.type && userData.type)) }, 3000 )
}
  
  }
   )
  
  
  })
     }else{
      setLoading(false);
    notifyErrorFxn("Invalid email/password, please try again")
     }


   })
   
  }

 
 //setTimeout(()=>{setLoading(false);notifySuccessFxn("Logged In")},3000)
 
 
     //dispatch(fetchUserData(user.uid, "sigin", navigate, setLoading));
     //END OF ELSE STATEMEMNT
    }
   }).then(()=>{
    //setLoading(false)
    //setTimeout(()=>{notifySuccessFxn("Logged In")},3000)
    ;
   })
   .catch((error) => {
    const isNetworkIssue = error?.code === 'ERR_NETWORK' || !error?.response;
    if (isNetworkIssue) {
      const persistedState = getPersistedState();
      const cachedUser = persistedState?.authState?.user;
      const cachedGroup = persistedState?.groupState;

      if (cachedUser && isSameCachedUser(user?.email, cachedUser)) {
        dispatch(storeUserData(cachedUser));
        dispatch(loginSuccess(cachedUser));
        dispatch(saveIsAgent(!!cachedGroup?.isAgent));
        dispatch(saveAgentType(cachedGroup?.agentType || "Farmer"));
        dispatch(saveIsSuperAdmin(!!cachedGroup?.isSuperAdmin));
        dispatch(saveIsAdmin(!!cachedGroup?.isAdmin));
        dispatch(saveIsFarmer(!!cachedGroup?.isFarmer));
        setLoading(false);
        notifySuccessFxn("Logged in using offline mode");
        navigateFromCachedRole(cachedGroup, navigate);
        return;
      }

      setLoading(false);
      notifyErrorFxn("Offline login is only available for users who have previously logged in on this device");
      return;
    }

    setLoading(false);
    notifyErrorFxn("Invalid email/password, please try again")
    var errorCode = error.code;
    var errorMessage = error.message;
   // notifyErrorFxn(errorMessage);
   // console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
    dispatch(loginFailed(errorMessage));
  });

};


export const fetchAdminById = (id,token) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))

  const config = {
    headers:{
      'Content-type':"application/json",
      Authorization:`Bearer ${token}`
    }
   }

   


 await axios.get(`${baseUrl}/api/admins/${id}`)
   .then((results) => {

   // console.log("results from ffetching admin by id--->",results)
    let userData  = {}

     userData = results.data[0]
  
     // console.log("results from ffetching agent by id DATA--->",userData)

   if (userData) {
   
    // console.log("Agent with this id-->:", userData);
     dispatch(storeUserData({...userData,token:token}));

    
   } else {
    
       dispatch(storeUserData({...userData,token:token}));
      
      // console.log("ERROR HERE, No agents returned, by id!");
      
   }
 }).catch((error) => {
  // console.log("Error getting document of agent by id:", error);
   //notifyErrorFxn("Please Check your number and try again!");
  
 });

}


export const updateNewPasswordForRetailer = (userInfo,token,

  setEightCharacters,
  setLowerCaseCharacters,
  setUpperCaseCharacters,
  setSpecialCharacters,
  setNumberCharacters,
  setMatchesConfirmPassword,
  setFormData
) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))

  const config = {
    headers:{
      'Content-type':"application/json",
      Authorization:`Bearer ${token}`
    }
   }

   


   axios.post(`${baseUrl}/api/users/update-password`,userInfo,config)
   .then((results) => {

   // console.log("results UPDATING NEW PASSWORD--->",results)
    let userData  = {}

     userData = results.data[0]
  
     // console.log(" USER DATA AFTER UPDATING NEW PASSWORD--->",userData)

   if (userData) {
   
    // console.log("Agent with this id-->:", userData);
     dispatch(storeUserData({...userData,token:token}));


     setEightCharacters(false)
     setLowerCaseCharacters(false)
      setUpperCaseCharacters(false)
     setSpecialCharacters(false)
     setNumberCharacters(false)
     setMatchesConfirmPassword(false)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
      })

    
   } else {
    
       dispatch(storeUserData({...userData,token:token}));
      
      // console.log("ERROR HERE, No agents returned, by id!");
      
   }
 }).catch((error) => {
  // console.log("Error getting document of agent by id:", error);
   //notifyErrorFxn("Please Check your number and try again!");
  
 });

}




export const fetchRetailerById = (id,token) => async (dispatch) => {
  
  //dispatch(saveCurrentFarmersToDisplay([]));
  //dispatch(saveTotalPagesFarmers(0))

 // console.log("RETAILER FETCHING HAS BEEN REACHED!!")


 await axios.get(`${baseUrl}/api/retailers/`)
   .then((results) => {

   // console.log("results from ffetching retailer by id--->",results)
    let userData  = {}

     userData =  results.data && results.data.filter((item)=>(item.retailer_user_id === id)) &&  results.data.filter((item)=>(item.retailer_user_id === id))[0]
  
     // console.log("results from ffetching retailer by id DATA--->",userData)

   if (userData) {
   
     //console.log("retailer with this id-->:", userData);
     dispatch(storeUserData({...userData,token}));
    
      return userData._id && userData._id
    
   } else {
    
       dispatch(storeUserData({...userData,token:token}));
       
      
       //console.log("ERROR HERE, No retailers returned, by id!");

       return userData._id && userData._id
      
   }
 }).catch((error) => {
   //console.log("Error getting document of retailer by id:", error);
   //notifyErrorFxn("Please Check your number and try again!");
  
 });

}




export const signinAthlete = (user, navigate, setLoading) => async (dispatch) => {
   
  //dispatch(clearPitch())

  fb.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
  //  console.log('Signed In user is: ', user.email);
    //I AM COMMENTING OUT USER DATA FOR NOW, FOR UfarmX ATHLETES, LATER THERE WILL BE A COLLECTION THAT I CALL FROM - MAY 28TH 2024
     dispatch(fetchUserDataAthlete(user.uid, "sigin", navigate, setLoading));
  })
  .catch((error) => {
    setLoading(false);
    var errorCode = error.code;
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage);
    //console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
    dispatch(loginFailed(errorMessage));
  });

};


export const signup = (user, navigate, setLoading) => async (dispatch) => {
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();

   // dispatch(clearPitch())

  fb.auth().createUserWithEmailAndPassword(
    user.email,
    user.password
).then((res)=>{
  //console.log("Good to go...");
  return db.collection('users').doc(res.user.uid).set({
    adminId: res.user.uid,
    email: user.email,
    schoolName: user.sname,
    firstName: user.fname,
    lastName: user.lname,
    middlename:user.middleName,
    nearestLandmark:user.nearestLandmark,
    yearsInBusiness:user.yearsInBusiness,
    gender:user.gender,
    shopOwned:user.shopOwned,
    sizeOfShop:user.sizeOfShop,
    nationality:user.nationality,
    localGovernment:user.localGovernment,
    dob:user.dob,
    address:user.address,
    utilityType:user.utilityType,
    meansOfId:user.meansOfId,
    nin:user.nin,
    idDocument:user.idDocument,
    certificateOfIncorporation:user.certificateOfIncorporation,
    statusReport:user.statusReport,
    idNumber:user.idNumber,
    memart:user.memart,
    photoId:user.photoId,
    utilityBill:user.utilityBill,
    meterNumber: user.meterNumber,
    password: user.password,
    userType:"athlete",
    accountCreated: today.toLocaleDateString("en-US", options),
  })
}).then(() => {
  notifySuccessFxn('Registered Successfully✔');
  navigate('/login-athlete', { replace: true });
}).catch((err) => {
  console.error("Error signing up: ", err);
  var errorMessage = err.message;
  notifyErrorFxn(errorMessage);
  dispatch(signupFailed({ errorMessage }));
  setLoading(false);
})
}


export const uploadImage = (user, file, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  //console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
     // console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          //console.log('Image URL: ', url);
          dispatch(signup(user, file, navigate, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      //console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const fetchUserDataAthlete = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home-athlete', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
    //  console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const uploadProfileImage = (profileData, file, userID, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  //console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
        //  console.log('Image URL: ', url);
          dispatch(updateProfile(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID/*, file, navigate, setLoading, url*/) => async (dispatch) => {
  // return  
  //db.collection('users').doc(userID).update({
  //  paymentLink: profileData.paymentLink,
  //  imageUrl: url,
  //}).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(()=>{
     db.collection("users").doc(userID).update({
      password:profileData?.password
     }).catch((error) => {
      // An error happened.
     // console.log('COULDNT UPDATE USER PASSWORD IN THEIR RECORDS-->: ', error.message);
    })

          }).then(() => {
            //setLoading(false);
         //   console.log("Password updated successfully");
            notifySuccessFxn("Updated successfully");
            //navigate('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            //setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        //setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        //navigate('/dashboard/home', { replace: true });
       }
     
  //}).catch((err) => {
  // // setLoading(false);
  //  console.log("ERR-: ", err);
  //})
}


export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
    navigate('/', { replace: true });
    notifySuccessFxn("Logged out!")
   // console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}
