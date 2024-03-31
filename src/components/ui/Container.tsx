import React from 'react'

function Container({ children} : { children: React.ReactNode}) {
  return (
    <div className='max-w-[97%] lg:max-w-[85%] mx-auto'>
      {children}
    </div>
  )
}

export default Container