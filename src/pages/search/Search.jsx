import React from 'react'
import NavBar from '../../component/Search/Navbar'
import ResultList from '../../component/Search/ResultList'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const [search] = useSearchParams()
    return (
        <div className="home">
            <NavBar />
            <ResultList search={search.get('query')} />
        </div>
    )
}

export default Search
