import React from 'react'
import Navbar from '../components/Navabr'
import { TranslateActionButton } from '../components/TranslateActionButtons'

function HomePage() {
  return (
    <>
      <Navbar />

      <div className='max-w-7xl mx-auto'>
        <TranslateActionButton />
      </div>
      
    </>
  )
}

export default HomePage