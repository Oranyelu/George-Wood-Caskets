import React from 'react'
import Weather from './Weather'

function HeroPage() {
  return (
      <div className='pt-[10vh] flex'>
          <main className='min-w-[60vw]'></main>
          <aside className='bg-[#A37E2C] pt-10 w-[40vw]'><Weather />
              <h1 className='text-[#011309]'>Celebrating Life and Legacy</h1>
          <p className='dynamic-text'></p></aside>
  </div>
  )
}

export default HeroPage