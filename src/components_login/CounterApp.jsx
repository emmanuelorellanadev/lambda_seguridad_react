import React, { useState } from 'react';


export const CounterApp = (props) => {
    const [ value, setValue ] = useState(10)

    function handleEventAdd (event) {
        // console.log(event);
        // setValue( (c) => c+1 );
        setValue( value + 1);
    }

    function handleEventLess (event) {
        setValue( value - 1);
    }

    function handleEventReset (event) {
        setValue( 10);
    }

    return(
        <>
            <h1>CounterApp</h1>
            <h2>{ value }</h2>
            <button className='btn btn-primary' onClick={ (event) => handleEventAdd(event)  }>{/*Puede llamarse solo como handleEvent  */}
                +1
            </button>
            <button className='btn btn-primary' onClick={ handleEventLess } >
                -1
            </button>
            <button className='btn btn-primary' onClick={ handleEventReset  }>
                Reset
            </button>
            
        </>
    )
}