import React from 'react';
// import { writeReport } from '../firebase/firestore';
import Row from './Row';
import { useAppState } from '@/context/AppProvider';

function Text() {

    const [{report}, dispatch] = useAppState()


    const saveReport = () => {
        let id = Date.now().toString()
        // writeReport(report)
    }

    const styles = {
        main:`w-[70%] rounded p-[4%] m-[4%] text-black bg-white flex flex-col items-center justify-start`,
        title:`text-xl font-bold`,
        button:`text-xl font-bold px-1 rounded hover:text-white border-2 border-transparent hover:border-black mx-[4px]`,
    }

    return (
        <div className={styles.main}>
            <div>
                <h2 className={styles.title}>{report.name} {report.commodity} {report.year}</h2>
            </div>

            {
                Object.keys(report.body).map((key) => {
                    let arr = report.body[key]
                    if (arr && arr.length > 0) {
                        return (
                            <Row
                            head={key}
                            arr={arr}
                            removeItem={removeItem}
                            />
                        )
                    }
                })
            }
            {
                <div className="w-full flex justify-between">
                    <div className="col-3">
                        <h5 className="font-bold">Total Billed</h5>
                    </div>
                    <div className="col-2">
                        <p>${report.total.toFixed(2)}</p>
                    </div>
                </div>
            }
            {
                report.name && report.commodity && report.year !== '' ?
                <div>
                    <button className={`${styles.button} bg-green-500`} onClick={() => saveReport()}>Save</button>
                    <button className={`${styles.button} bg-blue-500`} onClick={() => window.print()}>Print</button>
                    <button className={`${styles.button} bg-red-500`} onClick={() => clearContext()}>Clear Sheet</button>
                </div>
                :
                ''
            }
        </div>
    );
}

const Container = `
    width: 60%;

    h4, h5 {
        text-align: center;
        padding: 5px;
    }
    @media print {
        width: 100%;
        margin-left: 70px;
    }
`

const Header = `
  text-align: center;
`
const Buttons = `
    display: flex;
    width: 100%;
    justify-content: space-around;
    @media print {
        display: none;
    }
`
const Total = `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 150px;

    p {
        font-size: 20px;
    }
`

export default Text;