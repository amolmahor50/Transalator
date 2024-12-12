import React from 'react'
import Navbar from '../components/Navabr'
import { TranslateActionButton } from '../components/TranslateActionButtons'
import { SelectLanguageDropDown } from '../components/SelectLanguageDropDown'

function HomePage() {
  return (
    <>
      <div className='max-w-7xl mx-auto'>

        <Navbar />
        <TranslateActionButton />
        <SelectLanguageDropDown/>
        
      </div>

    </>
  )
}

export default HomePage