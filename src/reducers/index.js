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
const selectedSongReducer = (selectSong=null, action) => {
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

