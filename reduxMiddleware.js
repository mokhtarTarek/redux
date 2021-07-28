const redux = require("redux");
const reduxLogger = require('redux-logger')

const createStore = redux.createStore;
const combineReducer = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware;
//define middleware 
const logger = reduxLogger.createLogger()

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREEM = "BUY_ICECREEM";

// action is an obj with type property
// action creator : is a func that create action
function buyIceCreem() {
  return {
    type: BUY_ICECREEM,
  };
}
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

//reducer = (previousState,action) => return newState

//beter aproach is to split the reducer into multiple reducer
const initialCakeSate = {
  numOfCake: 10,
};
const initialIceCreemSate = {
  numOfIceCreams: 20,
};
//reducer 1:
const CakeReducer = (state = initialCakeSate, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        //make a copy of state and only update the numOfCake
        ...state,
        numOfCake: state.numOfCake - 1,
      };
    default:
      return state;
  }
};
//reducer 2:
const IceCreemReducer = (state = initialIceCreemSate, action) => {
  switch (action.type) {
    case BUY_ICECREEM:
      return {
        //make a copy of state and only update the numIceCreams
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

//combine multiple reducers (cake and iceCreem reducer)
const rootReducer = combineReducer({
  cake: CakeReducer,
  iceCream: IceCreemReducer,
});
//create the store and pass applyMiddleWare as second params
const store = createStore(rootReducer,applyMiddleware(logger));

//give the current state
console.log("initial state", store.getState());

//SETUP A LISTENER : any time the store update the subscribed func is called
const unsubscribe = store.subscribe(() =>{}
 
);

//update the state
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreem());
store.dispatch(buyIceCreem());

//unsubscribe
unsubscribe();
