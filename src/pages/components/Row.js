import React from 'react';
import Item from './Item';

function Row({head, arr, removeItem}) {

    return (
        <div>
            <h5>{head.toUpperCase()}</h5>
            {
                arr.length > 0 &&
                arr.map((obj) => (
                    <div>
                        <Item
                        obj={obj}
                        removeItem={removeItem}
                        />
                    </div>
                ))
            }
        </div>
    );
}

export default Row;
const Main = `
    h5 {
        border-bottom: 1px, solid;
    }
`
const Expense = `
  display: flex;
  flex-direction: column;
`