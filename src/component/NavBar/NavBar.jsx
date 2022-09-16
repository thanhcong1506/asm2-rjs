import React, { useEffect, useState, useDeferredValue } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Stack from '@mui/material/Stack'

import { useNavigate } from 'react-router-dom'

import './NavBar.scss'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const NavBar = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    // search bar
    const [open, setOpen] = useState(false)
    const handleOpenPopupSearchBar = () => setOpen(true)
    const handleClosePopupSearchBar = () => setOpen(false)
    // search keyword
    const [keyword, setKeyword] = useState('')
    const handleOnchangeSearch = (e) => setKeyword(e.target.value)
    const searchTerm = useDeferredValue(keyword, { timeoutMs: 2000 })

    // call API search
    const handleCallApiSearch = () => {
        setOpen(false)
        navigate(`/search?q=${searchTerm}`)
    }

    // old func
    const navBarVisibility = () => {
        if (window.scrollY > 100) return setShow(true)
        return setShow(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', navBarVisibility)
        return () => window.removeEventListener('scroll', navBarVisibility)
    }, [])

    return (
        <>
            <div className={`navBar ${show && 'navBarBlack'}`}>
                <Link to="/" className="navBarLogo">
                    Movie App
                </Link>
                <FontAwesomeIcon
                    className="navBarSearch"
                    icon={faSearch}
                    onClick={handleOpenPopupSearchBar}
                />
            </div>
            <Modal
                open={open}
                onClose={handleClosePopupSearchBar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search keyword' }}
                            value={keyword}
                            onChange={handleOnchangeSearch}
                        />
                        <IconButton
                            type="button"
                            sx={{ p: '10px' }}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                        p={'30px 0 0 0'}
                    >
                        <Button
                            onClick={() => setKeyword('')}
                            variant="outlined"
                        >
                            Reset
                        </Button>
                        <Button
                            onClick={handleCallApiSearch}
                            variant="contained"
                        >
                            Search
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default NavBar
