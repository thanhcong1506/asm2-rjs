import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Browse from './pages/browse/Browse'
import Search from './pages/search/Search'

import './App.scss'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Browse />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    )
}

export default App
