import React from 'react'
// import NavBar from '../../component/Search/Navbar'
import ResultList from '../../component/Search/ResultList'
import { useSearchParams } from 'react-router-dom'
import NavBar from '../../component/NavBar/NavBar'
import SearchForm from '../../component/Search/SearchForm'

const Search = () => {
    const [search] = useSearchParams()
    return (
        <div className="home">
            <NavBar />
            <SearchForm />
            <ResultList search={search.get('query')} />
        </div>
    )
}

export default Search
