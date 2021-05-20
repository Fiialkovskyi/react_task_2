import React from 'react';

const DoneItems = (props) => {
    const {finishedTime, name} = props;

    return (
        <>
        <span className='badge'>
          {new Date(finishedTime).toLocaleTimeString()}
        </span>
        {name}
      </>
    )
}

export default DoneItems;