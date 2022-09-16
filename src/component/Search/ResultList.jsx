import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import instance from '../../axios'
import requests from '../../requests'
import MovieDetail from '../VideoDetail/VideoDetail'

const baseUrl = 'https://image.tmdb.org/t/p/original/'
// Video
const END_POINT = 'https://api.themoviedb.org/3'
const API_KEY = 'dc17f7a108f21df4ba0390d44000c8ef'

const ResultList = ({ search }) => {
    const [searchList, setSearchList] = useState([])
    const [detailState, setDetailState] = useState({
        activeId: null,
        isOpen: false,
    })

    const [videoTrailer, setVideoTrailer] = useState({})

    useEffect(() => {
        const fetchSearch = async () => {
            if (!search) return
            try {
                const res = await instance.get(
                    `${requests.fetchSearch}&query=${search}`
                )
                setSearchList(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        setDetailState({ activeId: null, isOpen: false })
        fetchSearch()
    }, [search])

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
            <h2 className="listTitle">Search Result</h2>
            <div className="listPosters">
                {searchList && (
                    <Grid container spacing={1}>
                        {searchList.map((item, index) => (
                            <Grid key={index} item xs={1.33}>
                                <img
                                    key={index}
                                    src={baseUrl + item.poster_path}
                                    className="listPoster listPosterLarge"
                                    onClick={() => handleClick(item.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>
            {detailState.isOpen && detailState.activeId == videoTrailer.id && (
                <MovieDetail movieData={videoTrailer} />
            )}
        </div>
    )
}

export default ResultList
