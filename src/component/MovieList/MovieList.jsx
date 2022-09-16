import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './MovieList.scss'
import instance from '../../axios'
import MovieDetail from '../VideoDetail/VideoDetail'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

// Video
const END_POINT = 'https://api.themoviedb.org/3'
const API_KEY = 'dc17f7a108f21df4ba0390d44000c8ef'

export default function MovieList({
    fetchUrl,
    title,
    isLargeRow,
    detailState,
    setDetailState,
}) {
    const [movies, setMovies] = useState([])
    const [videoTrailer, setVideoTrailer] = useState({})

    const fetchData = async () => {
        try {
            const request = await instance.get(fetchUrl)
            setMovies(request.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = async (id) => {
        if (detailState.isOpen && detailState.activeId === id)
            return setDetailState({ activeId: null, isOpen: false })
        try {
            const result = await Promise.all([
                instance.get(`${END_POINT}/movie/${id}?api_key=${API_KEY}`),
                instance.get(
                    `${END_POINT}/movie/${id}/videos?api_key=${API_KEY}`
                ),
            ])
            if (!result) {
                throw new Error('Movie ID is not found...')
            }
            const eligibleVideo = result[1].data.results.filter(
                (v) =>
                    (v.site === 'YouTube' && v.type === 'Trailer') ||
                    v.type === 'Teaser'
            )

            const { key } = eligibleVideo[0]
            result[0].data.key = key
            setDetailState({ ...detailState, activeId: id, isOpen: true })
            setVideoTrailer(result[0].data)
        } catch (error) {
            console.log(error)
            return toast(
                'This movie has not Youtube trailer. Please select others!',
                {
                    type: 'error',
                    position: 'top-center',
                    autoClose: 1000,
                }
            )
        }
    }

    return (
        <div className="list">
            <h2 className="listTitle">{title}</h2>
            <div className="listPosters">
                {movies &&
                    movies.map((movie) => (
                        <img
                            onClick={() => {
                                handleClick(movie.id)
                            }}
                            key={movie.id}
                            className={`listPoster ${
                                isLargeRow && 'listPosterLarge'
                            }`}
                            src={`${baseUrl}${
                                isLargeRow
                                    ? movie.poster_path
                                    : movie.backdrop_path
                            }`}
                            alt={movie.name}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
            </div>
            {detailState.isOpen && detailState.activeId == videoTrailer.id && (
                <MovieDetail movieData={videoTrailer} />
            )}
        </div>
    )
}
