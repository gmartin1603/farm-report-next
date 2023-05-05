import React from 'react';
import Item from './Item';

function Row({head, arr, removeItem}) {
    const styles = {
        main:``,
    }
    return (
        <div>
            <h5>{head.toUpperCase()}</h5>
            {
                arr.length > 0 &&
                arr.map((obj) => (
                <div className="row justify-content-center">
                    <div className="col-2">
                        <p>{obj.name}</p>
                    </div>
                    <div className="col-2">
                        {
                            obj.qty > 1 ?
                            <p>{obj.qty} <b>{obj.unit + "s"}</b></p>
                            :
                            <p>{obj.qty} <b>{obj.unit}</b></p>
                        }
                    </div>
                    <div className="col">
                        <p>@ ${obj.price} <b>per {obj.unit}</b></p>
                    </div>
                    <div className="col">
                        <p><b>Total:</b> ${(obj.price * obj.qty).toFixed(2)}</p>
                    </div>
                    <div id="button" className="col">
                    <button className="btn btn-outline-danger" onClick={() => removeItem(obj.arr, 'id', obj.id)}>Delete</button>
                    </div>
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