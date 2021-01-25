import React from 'react';

const MovieDetailPage = (props) =>{
    const movieData= props.location.state.selectedMovieData;
    return(
        <>
        <a id='homeLink' onClick={()=> props.history.push('/MovieListComponent')}>Home</a>
        <div className= 'movieDetails'>
            <img src={'../Images/Mowgli.jpg'} width = "500px" height= "100%"></img>
            <div id='movieInfo'>
            <div className='movieTitle'>{movieData.name}</div>
            <div><label>Year of Release</label> {movieData.productionYear}</div>
            <div><label>Genre</label> {movieData.genre}</div>
            <div className= 'shortSynopsis'><label>Synopsis Short</label> {movieData.synopsisShort}</div>
            <div className = 'synopsis'><label>Synopsis</label>{movieData.synopsis}</div>
            </div>
        </div>
        </>
    )
}

export default (MovieDetailPage);