import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import './SearchForm.scss'
import { useNavigate, createSearchParams } from 'react-router-dom'

const SearchForm = () => {
    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')

    const inputRef = useRef()

    const fetchData = async (e) => {
        if (!searchValue) return
        return navigate({
            pathname: '/search',
            search: createSearchParams({
                query: searchValue,
            }).toString(),
        })
    }

    const searchMovie = (e) => {
        e.preventDefault()
        fetchData(e)
    }

    return (
        <div className="search">
            <form className="form" action="" onSubmit={searchMovie}>
                <div className="formInput">
                    <input
                        className="input"
                        type={'text'}
                        ref={inputRef}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <FontAwesomeIcon className="navBarSearch" icon={faSearch} />
                </div>
                <div className="button">
                    <button
                        className="resetButton"
                        onClick={() => {
                            setSearchValue('')
                            inputRef.current.focus()
                        }}
                    >
                        RESET
                    </button>
                    <button className="searchButton" type="submit">
                        SEARCH
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchForm
