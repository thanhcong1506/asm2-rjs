import React from 'react'
import MovieList from '../../component/MovieList/MovieList'
import requests from '../../requests'
import Banner from '../../component/Banner/Banner'
import NavBar from '../../component/NavBar/NavBar'

import './Browse.scss'
import { useState } from 'react'

function Browse() {
    const [detailState, setDetailState] = useState({
        activeId: null,
        isOpen: false,
    })
    return (
        <div className="home">
            <NavBar />
            <Banner />
            {movie_list.map((item, index) =>
                item.isLargeRow ? (
                    <MovieList
                        detailState={detailState}
                        setDetailState={setDetailState}
                        key={index}
                        isLargeRow
                        fetchUrl={item.url}
                        title={item.title}
                    />
                ) : (
                    <MovieList
                        detailState={detailState}
                        setDetailState={setDetailState}
                        key={index}
                        fetchUrl={item.url}
                        title={item.title}
                    />
                )
            )}
        </div>
    )
}

const movie_list = [
    {
        title: 'Original',
        isLargeRow: true,
        url: requests.fetchNetflixOriginals,
    },
    {
        title: 'Xu hướng',
        isLargeRow: false,
        url: requests.fetchTrending,
    },
    {
        title: 'Xếp hạng cao',
        isLargeRow: false,
        url: requests.fetchTopRated,
    },
    {
        title: 'Hành động',
        isLargeRow: false,
        url: requests.fetchActionMovies,
    },
    {
        title: 'Hài',
        isLargeRow: false,
        url: requests.fetchComedyMovies,
    },
    {
        title: 'Kinh dị',
        isLargeRow: false,
        url: requests.fetchHorrorMovies,
    },
    {
        title: 'Lãng mạn',
        isLargeRow: false,
        url: requests.fetchRomanceMovies,
    },
    {
        title: 'Tài liệu',
        isLargeRow: false,
        url: requests.fetchDocumentaries,
    },
]

export default Browse
