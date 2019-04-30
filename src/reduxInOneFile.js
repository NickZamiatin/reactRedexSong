console.clear()

// people dropping off a form 
// Action 
// --------------------------------
const createPolicy = (name, amount) => {
  return { // Action 
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount
    }
  }
}

const deletePolicy = (name) => {
  return {
    type:'DELETE_POLICY',
    payload: {
      name
    }
  }
}


const createClaim = (name, amountMOney) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
    name, 
    amountMOney
  }
  }
}

// Reducers 
//-------------------------------------------

const claimsHistory = (oldListOfClaims = [] , action) => {
  if(action.type === 'CREATE_CLAIM'){
    // we care about this form 
    return [...oldListOfClaims, action.payload]
  }
  return oldListOfClaims
  // we don't care about this form 
}

const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amountMOney
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount
  }
  return bagOfMoney
}

const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY'){
    return [...listOfPolicies, action.payload.name]
  }else if (action.type === 'DELETE_POLICY'){
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies
}

// -------------------
//Store 
//-------------------

const {createStore, combineReducers} = Redux;
const ourDepartments = combineReducers({
  // Name of our reducers
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
})

const store = createStore(ourDepartments);

//  name of action with we are created on the top (and pass the same parameters )
const action = createPolicy('Nick', 20);
// we don't need create any action as a const we can just pass it down ⬇️
// console.log(action)


store.dispatch(createPolicy('Nick', 20));
store.dispatch(createPolicy('Andre', 50));
store.dispatch(createPolicy('Ira', 60));


store.dispatch(createClaim('Nick', 100));


store.dispatch(deletePolicy('Ira'));


store.dispatch(action);
console.log(store.getState())






// -------------------------------------
// My personal Project
// -------------------------------------





// So we starts with  Actions and create deferent folder 
// Action creator 
// -------------------------------------


export const selectSong = song => {
  return {
    type: 'SONG_SELECTED',
    payload: song 
  };
};

// Then we moving to Reducers 
// -------------------------------------


import { selectSong } from "../actions";
// action from action to pass it to our function combineReducers(REDUX function )
import {combineReducers} from 'redux'




const songReducer = () => {
  return [
    {title : 'Last Friday night', duration: "4.05"},
    {title : 'Abba ', duration: "3.10"},
    {title : 'AC/DC', duration: "6.25"},
    {title : 'I want that way', duration: "2:15"}
  ]
};


// Not necessarily need it 
const selectedSongReducer = (selected=null, action) => {
  if (action.type === "SONG_SELECTED"){
    return action.payload
  }
  return selectSong
};


// function with two parameters our data and action 
export default combineReducers({
  songs: songReducer,
  selectSong : selectedSongReducer
})


// Last step fro Redux its creat Provider in index.js and connect our main App Component 
// with action and Reducers 
// -------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/lux/bootstrap.css'
// Import this two 
import { Provider } from 'react-redux';
import { createStore } from 'redux';
//  and then rap our App with Provider component and Add store={createStore(reducers)}
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers'

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <App />
  </Provider>,
   document.getElementById('root'));

//  Redux Store creat 

// -------------------------------------
// Now  we can start to work with our component and creat connect for then 
//  so when we create component we need import import {connect} from 'react-redux'
// and then export default connect()(SongList);  _______connect()___________


//   then we create a function with call mapStateToProps 
//  
const mapStateToProps = (state) => {
  console.log(state)
   return state
  //   next step will be set up our {}
  // ⬇️
  return { songs: state.songs}

}

//  and then update out connect with this function 

export default connect(mapStateToProps)(SongList);
// Then we start to work with our component anr crete what we need 
//  then we crete a return of all {PROPS !!!!!} and SECOND return with acutal component

class SongList extends Component {
  renderList(){
    return this.props.songs.map((song)=>{
      return (
        <div className="container"   key={song.title} >
            <div className="modal-header">
              <h3>{song.title}</h3>
            </div>
            
            <div className="modal-footer">
            <button
               type="button"
               className="btn btn-success"
               onClick={() => this.props.selectSong(song)}
               >Select</button>
            </div>
        </div>
      )
    })
  }
}


// and then we should update our connect with {ACTION with we imported}
//  and our connection do our despatch 

export default connect(mapStateToProps,{selectSong})(SongList);
