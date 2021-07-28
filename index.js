const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREEM ='BUY_ICECREEM'

// action is an obj with type as property
// action creator : is a func that create action
function buyIceCreem (){
    return{
        type: BUY_ICECREEM,
    }
}
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

//reducer = (previousState,action)=> return newState

const initialSate = {
  numOfCake: 10,
  numOfIceCreams: 20,
};


const reducer = (state = initialSate, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        //make a copy of state and only update the numOfCake
        ...state,
        numOfCake: state.numOfCake - 1,
      };
    case BUY_ICECREEM:
      return {
        //make a copy of state and only update the numOfCake
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

//give the current state
console.log("initial state", store.getState());

//SETUP A LISTENER : any time the store updated the subscribed func is called
const unsubscribe = store.subscribe(() =>
  console.log("updatedState", store.getState())
);

//update the satate
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreem());
store.dispatch(buyIceCreem());

//unsubscribe
unsubscribe();

// initial state { numOfCake: 10, numOfIceCreams: 20 }
// updatedState { numOfCake: 9, numOfIceCreams: 20 }
// updatedState { numOfCake: 8, numOfIceCreams: 20 }
// updatedState { numOfCake: 7, numOfIceCreams: 20 }
// updatedState { numOfCake: 7, numOfIceCreams: 19 }
// updatedState { numOfCake: 7, numOfIceCreams: 18 }
