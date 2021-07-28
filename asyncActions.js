const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware  = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
//state
const initialState = {
  loading: false,
  users: [],
  error: "",
};
//actions constans :
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

//actions creators to pass as args to dispatch methods
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
 
const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};
const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default: return state;  
  }
};

/*the thunk middleware allow the dispatch() method to recieve a function
unstead of an object
this function dos not have to be a pure function
she can do some side effect like asunc function
this function receive the dispatch method as parameter
*/
const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            //response.data is the array of users
            const users = response.data.map(user=>user.id)
            dispatch(fetchUserSuccess(users))
        })
        .catch(error=>{
            //error.message
            dispatch(fetchUserFailure(error.message))
        })
    }
} 
const store = createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())
//