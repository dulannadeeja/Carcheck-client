import React from 'react'

function ContainerLarge({ children} : { children: React.ReactNode}) {
  return (
    <div className='max-w-[97%] mx-auto'>
      {children}
    </div>
  )
}

export default ContainerLarge