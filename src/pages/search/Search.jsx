import React from 'react'
import NavBar from '../../component/NavBar/NavBar'
import Banner from '../../component/Banner/Banner'
import Results from '../../component/ResultList/Results'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const [search] = useSearchParams()
    return (
        <div className="home">
            <NavBar />
            <Banner />
            <Results search={search.get('q')} />
        </div>
    )
}

export default Search
