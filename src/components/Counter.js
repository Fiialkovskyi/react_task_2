import React from 'react';

const Counter = (props) => {
  const {text, count=0} = props;
  return (
    <p>{text} {count}</p>
  )
}

export default Counter;