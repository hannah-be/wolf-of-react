import React from 'react'

function StockLogo({
  url
}) {
  console.log(url)
  return (
    <div>
      <img 
        className='stock-logo'
        src={url}
        alt='no logo found'
        aria-label='logo for the displayed company'
      />
    </div>
  )
}

export default StockLogo