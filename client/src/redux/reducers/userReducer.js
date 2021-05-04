import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REG_REQUEST,
  USER_REG_SUCCESS,
  USER_REG_FAIL,
  USER_REG_REST,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REST,
  VALID_REQUEST,
  VALID_SUCCESS,
  VALID_FAIL,
  VALID_REST,
  USER_NUMBERS_SUCCESS,
  USER_NUMBERS_REQUEST,
  USER_NUMBERS_FAIL,
} from "../constences/userConst";

export const userLoginReducer = (state = {userDetail:{}}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        userDetail: action.payload,
        loginSuccess: true,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload,
        user:{}
      };
    case USER_LOGOUT:
      return {userDetail:{}}; // returning empty object

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REG_REQUEST:
      return {
        ...state,
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case USER_REG_SUCCESS:
      return {
        ...state,
        loading: false, // loading is done laoding!
        registerSuccess: true,
      };

    case USER_REG_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload,
      };
    case USER_REG_REST:
      return { 
        ...state,
        loading: false,
        error:'',
        registerSuccess: false };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        // user: console.log("user8: ", action.payload),
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
        user:{}
      };

    default:
      return state;
  }
};


export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case USER_PROFILE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        // user: console.log("user8: ", action.payload),
        user: action.payload,
      };

    case USER_PROFILE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
        user:{}
      };

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case USER_LIST_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        users: action.payload.data,
      };

    case USER_LIST_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};


export const userNumbersReducer = (state = { usersCount:0 }, action) => {
  switch (action.type) {
    case USER_NUMBERS_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case USER_NUMBERS_SUCCESS:
      // console.log("actionP: ", action.payload)

      return {
        loading: false, // loading is done laoding!
        usersCount: action.payload.data,
      };

    case USER_NUMBERS_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

    default:
      return state;
  }
};


export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case USER_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        deleteSuccess: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {userDetail:{}}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        loading: false,
        userDetail: action.payload,
        updateSuccess: true,
      };
    case USER_PROFILE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        updateSuccess: false,
      };
    case USER_PROFILE_UPDATE_REST:
      return {
        ...state,
        loading: false,
        error: '',
        updateSuccess: false,};
        
    default:
      return state;
  }
};

export const UpdateUserRoleReducer = (state = {userDetail:{}}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        userDetail: action.payload,
        updateSuccess: true,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        updateSuccess: false,
      };
    case USER_UPDATE_REST:
      return {
        ...state,
        loading: false,
        error: '',
        updateSuccess: false,};
        
    default:
      return state;
  }
};


export const ValidReducer = (state = {userDetail:{},loading: true}, action) => {
  switch (action.type) {

    case VALID_REQUEST:
      return {
        ...state,
        loading: true,
        success:false,
      };

    case VALID_SUCCESS:
      return {
        loading: false,
        success: true,
        userDetail:action.payload,
      };

      case VALID_FAIL:
        return {
        loading: false,
        error: action.payload,
        success: false,
        userDetail:{},
        };

      case VALID_REST:
        return {
          loading: false,
          error: '',
          success: false,
          userDetail:{}
        };

      default:
        return state;
       }


}