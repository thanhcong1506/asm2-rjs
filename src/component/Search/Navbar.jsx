import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm'


import './Navbar.scss'

const NavBar = () => {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className={`navBarSearch ${show && 'navBarSearchBlack'}`}>
                <Link to="/" className="navBarSearchLogo">
                    Movie App
                </Link>
                <FontAwesomeIcon
                    className="navBarSearchIcon"
                    icon={faSearch}
                    onClick={() => setShow(!show)}
                />
            </div>
            {show && <SearchForm setShow={setShow} />}
        </>
    )
}

export default NavBar
