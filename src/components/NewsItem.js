import React from 'react'

const NewsItem = ({
  dateTime,
  headline,
  source,
  url,
  summary,
  related
}) => {
  return (
    <div>
      <h4>{headline}</h4>
      <a href={url}>{source}</a>
      <p>{summary}</p>
      <time dateTime={dateTime}>{dateTime}</time>
      {/* <p>{related}</p> */}
      <hr />
      </div>
  )
}

export default NewsItem