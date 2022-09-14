import React from 'react'
import './VideoDetail.scss'
import YouTube from 'react-youtube'

const opts = {
    height: '400',
    width: '640',
    playerVars: {
        autoplay: 0,
    },
}

const MovieDetail = ({ movieData }) => {
    return (
        movieData && (
            <div className="trailer-container">
                <div className="trailer-des">
                    <h2>{movieData.title}</h2>
                    <hr />
                    <h4>Release Date: {movieData.release_date}</h4>
                    <h4>Vote: {movieData.vote_average}/10</h4>
                    <p>{movieData.overview}</p>
                </div>
                <YouTube videoId={movieData.key} opts={opts} />
            </div>
        )
    )
}

export default MovieDetail
