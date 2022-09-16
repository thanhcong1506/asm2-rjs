import React, { useState, useDeferredValue } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import { useNavigate, createSearchParams } from 'react-router-dom'

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const SearchForm = ({ setShow }) => {
    const navigate = useNavigate()
    // search keyword
    const [keyword, setKeyword] = useState('')
    const handleOnchangeSearch = (e) => setKeyword(e.target.value)
    const searchTerm = useDeferredValue(keyword, { timeoutMs: 2000 })

    // trigger enter
    const handleKeyUpEnter = (e) => e.keyCode === 13 && handleCallApiSearch()

    // call API search
    const handleCallApiSearch = async () => {
        setShow(false)
        if (!searchTerm) return
        return navigate({
            pathname: '/search',
            search: createSearchParams({
                query: searchTerm,
            }).toString(),
        })
    }

    return (
        <Container>
            <Box
                xs={style}
                style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 5,
                }}
            >
                <Paper
                    sx={{
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
                        onKeyUp={handleKeyUpEnter}
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
                    <Button onClick={() => setKeyword('')} variant="outlined">
                        Reset
                    </Button>
                    <Button onClick={handleCallApiSearch} variant="contained">
                        Search
                    </Button>
                </Stack>
            </Box>
        </Container>
    )
}

export default SearchForm
