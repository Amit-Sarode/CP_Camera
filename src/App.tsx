import React ,{ lazy,Suspense }  from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
const SearchBar = lazy(()=>import ('./component/Search'))
const Tender =lazy(()=>import ('./component/Tender')) 

const App :React.FC = () => {
  return (
    <Suspense fallback={<div>LOading ...</div>}>
      <Navbar/>
      <Routes>
        <Route path='/' Component={Tender}/>
        <Route path='search' Component={SearchBar}/>
      </Routes>
</Suspense>
  )
}

export default App