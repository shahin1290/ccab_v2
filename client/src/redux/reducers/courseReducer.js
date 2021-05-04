import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_RESET,
  COURSE_ADD_REQUEST,
  COURSE_ADD_SUCCESS,
  COURSE_ADD_FAIL,
  ADMIN_COURSE_LIST_REQUEST,
  ADMIN_COURSE_LIST_SUCCESS,
  ADMIN_COURSE_LIST_FAIL,
} from '../constences/courseConst'

export const courseListReducer = (state = { courseList: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COURSE_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        courseList: action.payload.bootcamps,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case COURSE_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}


export const AdmincourseListReducer = (state = { courseList: [] }, action) => {
  switch (action.type) {
    case ADMIN_COURSE_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_COURSE_LIST_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        courseList: action.payload.bootcamps,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case ADMIN_COURSE_LIST_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}


export const courseDetailsReducer = (
  state = { course: {}, loading: false },
  action
) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      }

    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        course: action.payload
      }

    case COURSE_DETAILS_FAIL:
      return {
        ...state,
        loading: false, // loading is done laoding!
        error: action.payload
      }

    default:
      return state
  }
}

export const courseCreateReducer = (state = {course:{},success:false}, action) => {
  switch (action.type) {
    case COURSE_ADD_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case COURSE_ADD_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        course: action.payload,
        success: true,
      };
    case COURSE_ADD_FAIL:
      return {
        success: false,
        loading: false, // loading is done laoding!
        error: action.payload,
      }
      case 'COURSE_ADD_RESET':
        return {
          loading: false, // loading is done laoding!
          error: null,
          success:false,
        };
    default:
      return state;
  }
};

export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case COURSE_DELETE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        successDelete: true,
      };
    case COURSE_DELETE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };


    default:
      return state;
  }
};


export const courseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return {
        loading: true, // the raison for loading here if for data is being currently fetching. thats why loaing will be happen
      };

    case COURSE_UPDATE_SUCCESS:
      return {
        loading: false, // loading is done laoding!
        success: true,
      };
    case COURSE_UPDATE_FAIL:
      return {
        loading: false, // loading is done laoding!
        error: action.payload,
      };

case COURSE_UPDATE_RESET:
      return {
        loading: false, // loading is done laoding!
        error: null,
        success:false,
      };
    default:
      return state;
  }
};