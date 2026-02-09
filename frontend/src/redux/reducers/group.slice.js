import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       allGroups: [], 
       allFarmers: [], 
       allRequests: [],
       allProducts: [], 
       allRetailerProducts: [], 
       currentProductsToDisplay: [], 
       allAdmins: [], 
       allSuperAdmins: [], 
       allFarmersForThisAgent: [], 
       filteredFarmers:[],
       filteredFarmersForThisAgent:[],
       allForms: [], 
       filteredForms:[],
       allResponses: [],
       allResponsesAdmin: [],  
       retailersForThisAgent:[],
       filteredResponses:[],
       filteredResponsesAdmin:[],
       allAgents: [], 
       publicGroups: [], 
       privateGroups: [],
       groupMembers: [], 
       employeer: {}, 
       currentFarmersToDisplay:[],
       currentFarmersForThisAgent:[],
       currentResponsesToDisplay:[],
       currentResponsesToDisplayAdmin:[],
       currentDepositsToDisplay:[],
       currentFormsToDisplay:[],
          
      currentRetailersForThisAgent:[],
       allRetailersForThisAgent:[],
      filteredRetailersForThisAgent:[],

      
       totalPagesFarmers:1,
       totalPagesResponses:1,
       totalPagesResponsesAdmin:1,
       totalPagesForms:1,
       totalPagesDeposits:1,
       totalPagesFarmersForThisAgent:1,
       totalPagesFilteredFarmers:1,
       totalPagesFilteredRetailers:1,
       totalPagesFilteredFarmersForThisAgent:1,
       totalPagesFilteredResponses:1,
       totalPagesFilteredResponsesAdmin:1,
       totalPagesFilteredAgents:1,
       farmerInFocus:{},
       inputToUpdateInFocus:{},
       productInFocus:'',
       responseInFocus:{},
       requestInFocus:{},
       productsForRequestInFocus:{},
       formInFocus:{},
       isAgent:false,
       agentType:"Farmer",
       isAdmin:false,
       isSuperAdmin:false,
       isFarmer:false,
       tablesSet:false,
       cacUrl:" ",
       statusReportUrl:" ",
       memartUrl:" ",
       photoOfShopBusUrl:" ",
       photoOfShopIndUrl:" ",
       utilityBillIndUrl:" ",
       utilityBillBusUrl:" ",
       photoIdIndUrl:" ",
       photoIdBusUrl:" ",
       firstName:" ",
       lastName:" ",
       email:" ",
       password:" ",


       currentCropFilter:/.*/ ,
       currentCropTypeFilter:/.*/ ,
       currentLocationFilter:/.*/ ,


       currentFormFilter:/.*/ ,

       currentAgentsToDisplay:[],
       totalPagesAgents:1,
       agentInFocus:{},

       loggedInAgent:{},

       loggedInFarmer:{},


       message: '',
      isLoading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveCurrentFarmersToDisplay: (state, action) => {
      state.currentFarmersToDisplay = action.payload;
  },

  saveTablesSet: (state, action) => {
    state.tablesSet = action.payload;
},

saveCacUrl: (state, action) => {
  state.cacUrl = action.payload;
},

saveStatusReportUrl: (state, action) => {
  state.statusReportUrl = action.payload;
},

saveMemartUrl: (state, action) => {
  state.memartUrl = action.payload;
},
savePhotoOfShopBusUrl: (state, action) => {
  state.photoOfShopBusUrl = action.payload;
},

savePhotoOfShopIndUrl: (state, action) => {
  state.photoOfShopIndUrl = action.payload;
},

saveUtilityBillIndUrl: (state, action) => {
  state.utilityBillIndUrl = action.payload;
},
saveFirstName: (state, action) => {
  state.firstName = action.payload;
},
saveLastName: (state, action) => {
  state.lastName = action.payload;
},
saveEmail: (state, action) => {
  state.email = action.payload;
},
savePassword: (state, action) => {
  state.password = action.payload;
},
saveUtilityBillBusUrl: (state, action) => {
  state.utilityBillBusUrl = action.payload;
},
savePhotoIdIndUrl: (state, action) => {
  state.photoIdIndUrl = action.payload;
},
savePhotoIdBusUrl: (state, action) => {
  state.photoIdBusUrl = action.payload;
},

  saveLoggedInAgent: (state, action) => {
    state.loggedInAgent = action.payload;
},

saveLoggedInFarmer: (state, action) => {
  state.loggedInFarmer = action.payload;
},

  clearCurrentFarmersToDisplay: (state, action) => {
    state.currentFarmersToDisplay = initialState.currentFarmersToDisplay;
},

  saveCurrentFarmersForThisAgent: (state, action) => {
    state.currentFarmersForThisAgent = action.payload;
},

saveCurrentRetailersForThisAgent: (state, action) => {
  state.currentRetailersForThisAgent = action.payload;
},
clearCurrentFarmersForThisAgent: (state, action) => {
  state.currentFarmersForThisAgent = [];
 
  state.filteredFarmersForThisAgent = [];
},

clearCurrentRetailersForThisAgent: (state, action) => {
  state.currentRetailersForThisAgent = [];
 
  state.filteredRetailersForThisAgent = [];
},


  saveCurrentResponsesToDisplay: (state, action) => {
    state.currentResponsesToDisplay = action.payload;
},
saveCurrentResponsesToDisplayAdmin: (state, action) => {
  state.currentResponsesToDisplayAdmin = action.payload;
},

clearCurrentResponsesToDisplay: (state, action) => {
  state.currentResponsesToDisplay = [];
},
clearAllResponsesToDisplayAdmin: (state, action) => {
  state.currentResponsesToDisplayAdmin = [];
  state.allResponsesAdmin = [];
},

saveCurrentFormsToDisplay: (state, action) => {
  state.currentFormsToDisplay = action.payload;
},

clearCurrentFormsToDisplay: (state, action) => {
state.currentFormsToDisplay = [];
},

clearRetailersForThisAgent: (state, action) => {
  state.retailersForThisAgent = [];
  },

  saveCurrentAgentsToDisplay: (state, action) => {
    state.currentAgentsToDisplay = action.payload;
},

saveCurrentCropFilter: (state, action) => {
  state.currentCropFilter = action.payload;
},


saveCurrentFormFilter: (state, action) => {
  state.currentFormFilter = action.payload;
},

saveCurrentCropTypeFilter: (state, action) => {
  state.currentCropTypeFilter = action.payload;
},

saveCurrentLocationFilter: (state, action) => {
  state.currentLocationFilter = action.payload;
},

  saveFarmerInFocus: (state, action) => {
    state.farmerInFocus = action.payload;
},

clearFarmerInFocus: (state, action) => {
  state.farmerInFocus = {};
},

saveInputToUpdateInFocus: (state, action) => {
  state.inputToUpdateInFocus = action.payload;
},

saveProductInFocus: (state, action) => {
  state.productInFocus = action.payload;
},

saveResponseInFocus: (state, action) => {
  state.responseInFocus = action.payload;
},

saveRequestInFocus: (state, action) => {
  state.requestInFocus = action.payload;
},
saveProductsForRequestInFocus: (state, action) => {
  state.productsForRequestInFocus = action.payload;
},


clearResponseInFocus: (state, action) => {
  state.responseInFocus = {}
},
clearRequestInFocus: (state, action) => {
  state.requestInFocus = {}
},

saveFormInFocus: (state, action) => {
  state.formInFocus = action.payload;
},


clearFormInFocus: (state, action) => {
  state.formInFocus = {}
},




saveAgentInFocus: (state, action) => {
  state.agentInFocus = action.payload;
},
    saveAllGroup: (state, action) => {
        state.allGroups = action.payload;
    },
    saveAllFarmers: (state, action) => {
      state.allFarmers = action.payload;
  },
  saveAllRequests: (state, action) => {
    state.allRequests = action.payload;
},
  saveAllProducts: (state, action) => {
    state.allProducts = action.payload;
},

saveAllRetailerProducts: (state, action) => {
  state.allRetailerProducts = action.payload;
},

saveCurrentProductsToDisplay: (state, action) => {
  state.currentProductsToDisplay = action.payload;
},
  saveAllAdmins: (state, action) => {
    state.allAdmins = action.payload;
},
saveAllSuperAdmins: (state, action) => {
  state.allSuperAdmins = action.payload;
},
  saveAllFarmersForThisAgent: (state, action) => {
    state.allFarmersForThisAgent = action.payload;
},

saveAllRetailersForThisAgent: (state, action) => {
  state.allRetailersForThisAgent = action.payload;
},


  saveFilteredFarmers: (state, action) => {
    state.filteredFarmers = action.payload;
},


saveFilteredRetailers: (state, action) => {
  state.filteredRetailers = action.payload;
},
clearFilteredFarmers: (state, action) => {
  state.filteredFarmers = initialState.filteredFarmers;
},

saveFilteredFarmersForThisAgent: (state, action) => {
  state.filteredFarmersForThisAgent = action.payload;
},

saveFilteredRetailersForThisAgent: (state, action) => {
  state.filteredRetailersForThisAgent = action.payload;
},


saveAllResponses: (state, action) => {
  state.allResponses = action.payload;
},
saveAllResponsesAdmin: (state, action) => {
  state.allResponsesAdmin = action.payload;
},

saveFilteredResponses: (state, action) => {
state.filteredResponses = action.payload;
},
saveFilteredResponsesAdmin: (state, action) => {
  state.filteredResponsesAdmin = action.payload;
  },

clearFilteredResponses: (state, action) => {
  state.filteredResponses =initialState.filteredResponses;
  },

  saveAllForms: (state, action) => {
    state.allForms = action.payload;
  },
  saveFilteredFormss: (state, action) => {
    state.filteredFormss = action.payload;
    },
    
    clearFilteredForms: (state, action) => {
      state.filteredForms =initialState.filteredForms;
      },
    



    savePublicGroup: (state, action) => {
        state.publicGroups = action.payload;
    },
    savePrivateGroup: (state, action) => {
        state.privateGroups = action.payload;
    },
    saveTotalPagesFarmers: (state, action) => {
      state.totalPagesFarmers = action.payload;
  },
  saveTotalPagesFarmersForThisAgent: (state, action) => {
    state.totalPagesFarmersForThisAgent = action.payload;
},

saveTotalPagesRetailersForThisAgent: (state, action) => {
  state.totalPagesRetailersForThisAgent = action.payload;
},
  saveTotalPagesResponses: (state, action) => {
    state.totalPagesResponses = action.payload;
},
saveTotalPagesResponsesAdmin: (state, action) => {
  state.totalPagesResponseAdmin = action.payload;
},

saveTotalPagesForms: (state, action) => {
  state.totalPagesForms = action.payload;
},


  saveTotalPagesDeposits: (state, action) => {
    state.totalPagesDeposits = action.payload;
},
saveCurrentDepositsToDisplay: (state, action) => {
  state.currentDepositsToDisplay = action.payload;
},
clearCurrentDepositsToDisplay: (state, action) => {
  state.currentDepositsToDisplay = [];
},


  saveTotalPagesFilteredFarmers: (state, action) => {
    state.totalPagesFilteredFarmers = action.payload;
},
saveTotalPagesFilteredRetailers: (state, action) => {
  state.totalPagesFilteredRetailers = action.payload;
},
saveTotalPagesFilteredResponses: (state, action) => {
  state.totalPagesFilteredResponses = action.payload;
},

saveTotalPagesFilteredResponsesAdmin: (state, action) => {
  state.totalPagesFilteredResponsesAdmin = action.payload;
},


saveTotalPagesFilteredAgents: (state, action) => {
  state.totalPagesFilteredAgents = action.payload;
},

saveIsAgent: (state, action) => {
  state.isAgent = action.payload;
},
saveAgentType: (state, action) => {
  state.agentType = action.payload;
},
saveIsAdmin: (state, action) => {
  state.isAdmin = action.payload;
},
saveIsSuperAdmin: (state, action) => {
  state.isSuperAdmin = action.payload;
},
saveIsFarmer: (state, action) => {
  state.isFarmer = action.payload;
},



  saveTotalPagesAgents: (state, action) => {
    state.totalPagesAgents = action.payload;
},
    
    saveGroupMembers: (state, action) => {
      state.groupMembers = action.payload;
  },
    saveEmployeer: (state, action) => {
      state.employeer = action.payload;
  },
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = groupSlice;

export const {
 saveMyGroup,
 saveAllGroup,
 saveTablesSet,
 saveCacUrl,
 saveStatusReportUrl,
 saveMemartUrl,
 savePhotoOfShopBusUrl,
 savePhotoOfShopIndUrl,
 saveFirstName,
 saveLastName,
 saveEmail,
 savePassword,
 saveUtilityBillBusUrl,
 saveUtilityBillIndUrl,
 savePhotoIdIndUrl,
 savePhotoIdBusUrl,
 saveAllFarmers,
 saveAllRequests,
 saveAllProducts,
 saveAllRetailerProducts,
 saveCurrentProductsToDisplay,
 saveAllAdmins,
 saveAllSuperAdmins,
 saveAllFarmersForThisAgent,
 saveAllRetailersForThisAgent,
 saveFilteredFarmers,
 clearFilteredFarmers,
 saveFilteredFarmersForThisAgent,
 saveFilteredRetailersForThisAgent,
 saveAllResponses,
 saveAllResponsesAdmin,
 saveAllForms,
 saveFilteredResponses,
 saveFilteredResponsesAdmin,
 clearFilteredResponses,
 saveFilteredForms,
 clearFilteredForms,
 saveAllAgents,
 saveCurrentFarmersToDisplay,
 clearCurrentFarmersToDisplay,
 saveCurrentFarmersForThisAgent,
 clearCurrentFarmersForThisAgent,
 saveCurrentRetailersForThisAgent,
 clearCurrentRetailersForThisAgent,
 clearRetailersForThisAgent,
 saveCurrentResponsesToDisplay,
 saveCurrentResponsesToDisplayAdmin,
 clearAllResponsesToDisplayAdmin,
 clearCurrentResponsesToDisplay,
 saveCurrentFormsToDisplay,
 clearCurrentFormsToDisplay,
 saveFarmerInFocus,
 clearFarmerInFocus,
 saveInputToUpdateInFocus,

 saveProductInFocus,
 saveTotalPagesFarmers,
 saveTotalPagesFarmersForThisAgent,
 saveTotalPagesRetailersForThisAgent,
 saveTotalPagesResponses,
 saveTotalPagesResponsesAdmin,
 saveTotalPagesForms,

 saveCurrentDepositsToDisplay,
 clearCurrentDepositsToDisplay,
 saveTotalPagesDeposits,

 saveCurrentCropFilter,
 saveCurrentLocationFilter,
 saveCurrentCropTypeFilter,

 saveCurrentFormFilter,

 saveCurrentAgentsToDisplay,
 saveAgentInFocus,
 saveResponseInFocus,
 saveRequestInFocus,
 saveProductsForRequestInFocus,
 clearResponseInFocus,
 clearRequestInFocus,
 saveFormInFocus,
 clearFormInFocus,
 saveTotalPagesAgents,
 saveTotalPagesFilteredAgents,
 saveTotalPagesFilteredFarmers,
 saveTotalPagesFilteredRetailers,
 saveTotalPagesFilteredResponses,
 saveTotalPagesFilteredResponsesAdmin,

 saveLoggedInAgent,
 saveLoggedInFarmer,

 saveIsAgent,
 saveAgentType,
 saveIsSuperAdmin,
 saveIsAdmin,
 saveIsFarmer,

 savePublicGroup,
 savePrivateGroup,
 saveGroupMembers,
 saveEmployeer,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


