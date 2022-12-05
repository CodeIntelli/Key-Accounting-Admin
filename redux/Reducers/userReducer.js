import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  ADMIN_USER_DETAIL_REQUEST,
  ADMIN_USER_DETAIL_SUCCESS,
  ADMIN_USER_DETAIL_FAIL,
  ADMIN_ALL_USER_REQUEST,
  ADMIN_ALL_USER_SUCCESS,
  ADMIN_ALL_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
} from '../Constants/userConstant';

// export const userReducer = (state = { user: {} }, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//     case USER_REGISTER_REQUEST:
//       return { loading: true, isAuthenticated: false };
//     case LOAD_USER_REQUEST:
//       return { loading: true };
//     case LOGIN_SUCCESS:
//     case USER_REGISTER_SUCCESS:
//     case LOAD_USER_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: true,
//         user: action.payload,
//       };
//     case LOGIN_FAIL:
//     case USER_REGISTER_FAIL:
//       return {
//         ...state,
//         loading: false,
//         isAuthenticated: false,
//         user: null,
//         error: action.payload,
//       };
//     case LOAD_USER_FAIL:
//       return {
//         loading: false,
//         isAuthenticated: false,
//         user: null,
//         error: action.payload,
//       };

//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return { loading: true, user: null };

    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ADMIN_ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
