import React from 'react';
import { connect } from 'react-redux'

const SongDetail = ({song}) => {

if (!song) {
  return <h1>Select a song</h1>
}

  return (
  <div>
    <h1>Title :{song.title}</h1>
    <h3>Details for :{song.duration}</h3>
  </div>
  )

}

  const mapStateToProps = (state) => {
     return {song: state.selectSong};
  };


export default connect(mapStateToProps)(SongDetail)