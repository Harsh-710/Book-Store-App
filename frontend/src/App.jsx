import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateBook from './routes/CreateBook'
import DeleteBook from './routes/DeleteBook'
import EditBook from './routes/EditBook'
import ShowBook from './routes/ShowBook'
import Home from './routes/Home'
import Books from './routes/Books'

const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/books' element = {<Books />} />
      <Route path='/books/create' element = {<CreateBook />} />
      <Route path='/books/details/:id' element = {<ShowBook />} />
      <Route path='/books/edit/:id' element = {<EditBook />} />
      <Route path='/books/delete/:id' element = {<DeleteBook />} />
    </Routes>
  )
}

export default App
