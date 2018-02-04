import React from 'react'

function StockInfo({ 
  symbol, 
  companyName, 
  primaryExchange, 
  latestPrice, 
  latestSource, 
  week52High, 
  week52Low, 
}) {
  return <div>
      <h2>
        {symbol}: {companyName}
      </h2>
      <h3>
        {latestPrice} ({latestSource})
      </h3>
      <div>
        <p><strong>52 Week High:</strong>{week52High}</p>
        <p><strong>52 Week Low:</strong>{week52Low}</p>
        <p><strong>Exchange:</strong>{primaryExchange}</p>
      </div>
    </div>;
}

export default StockInfo