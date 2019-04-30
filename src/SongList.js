import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectSong } from './actions'

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
             >Details</button>
          </div>
      </div>
    )
  })
}

  render() {

    // console.log(this.props)
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  //  return state

  return { songs: state.songs}
}

export default connect(mapStateToProps,{selectSong})(SongList);

// ??????? if we need crete mapStateToProps in every component or just in one place ????????/
