import React from 'react'

function HeroMobileComp() {
  return (
    <div className='w-[100%] flex flex-col h-[100vh] justify-between p-[50px] relative'>
      <article>
        <h3 className='text-[31px] text-[#A37E2C] font-bold'>Celebrating Life and Legacy</h3>
        <h1 className='text-[#135B3A] text-[50px] font-bold'>40 YEARS</h1>
        <h2 className='text-[#ffff] text-[19px]'>Established in 1984</h2>
      </article>
      <aside className='h-[150px] flex bg-[#A37E2C] w-[40%] rounded-l-[20px] absolute bottom-0 right-[-40%] animate-slideIn'>
        <div className='p-4 text-white'>Get Involved</div>
        <div className='flex w-full rounded-l-[20px] bg-[url(https://static.investindia.gov.in/s3fs-public/inline-images/philanthropy%20.jpg)]'>
          <p className='flex items-center pl-4 text-white'>Discover Giving</p>
        </div>
      </aside>
    </div>
  )
}

export default HeroMobileComp