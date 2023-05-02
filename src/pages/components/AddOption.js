import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useAddValue } from '../../context/providers/AddProvider';
import { buildDoc, getData, writeData } from '../firebase/firestore';

function AddOption(props) {

    const [state, dispatch] = useAddValue()

    const [optionList, setOptionList] = useState()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [unt, setUnt] = useState([])
    const [col, setCol] = useState('')
    const [id, setId] = useState('')

    const [exp, setExp] = useState(false)
    const [asU, setAsU] = useState(false)
    const [head, setHead] = useState(false)
    const [dis, setDis] = useState(true)
    const [hide, setHide] = useState(true)

    const units = ["Gal", "Lb", "Oz", "Ton", "Bu", "Mile", "Bag", "Acre"]

    useEffect(() => {
        getData("labels-4.0", dispatch)
        getData("expenses-4.0", dispatch)
    },[])

    const mkDoc = () => {
        buildDoc("expenses-4.0", "misc", "Misc.", [])
        // buildDoc("labels-4.0", "year", "Year", ["2019", "2020", "2021", "2022", "2023", "2024", "2025"])
        // buildDoc("labels-4.0", "crop", "Crop", ["Corn", "Soy Beans"])
        // buildDoc("labels-4.0", "landLord", "Land Lord", ["Elaine", "Kathleen", "Benson", "Martinson", "Larson", "Margret", "Bushman", "Metzer", "The 40", "Bermans", "Children"])
    }

    const formatTxt = (str) => {
        if(str.length > 0) {
            let first = str.charAt(0).toUpperCase()
            let rest = str.substring(1)
            setText(`${first}${rest}`)
        } else {
            setText('')
        }
    }

    const validate = () => {
        if(text.length || unt.length > 0) {
            setHide(false)
        } else {
            setHide(true)
        }
    }

    const handleChange = (e) => {
        // console.log(e.target.value)

        state[col].map((item) => {
            // console.log(item.id)
            if(item.id === e.target.value) {
                setOptionList(item.options)
                setId(item.id)
            }})
        setDis(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let load = ''
        let arr = []
        if (head || exp) {
            load=text
            arr = optionList
            if (arr.includes(load)) {
                alert("Option already exists in data base")
                setText('')
            } else {
                arr.push(load)
                writeData(col, id, 'options', arr)
                setHead(false)
                setExp(false)
            }
        }
        if (asU) {
            writeData(col, id, 'units', unt)
            setAsU(false)
            setUnt([])
        }

    }

    const handleChk = (e) => {
        if(e.target.checked){
            setUnt([...unt, e.target.value])
        } else {
            let arr = unt.filter(i => i !== e.target.value)
            setUnt(arr)
        }

    }

    useEffect(() => {
        validate()
        // console.log(state)
        if(head || exp || asU) {
            if(head) {
                setTitle("Add Heading Option");
                setCol("labels-4.0");

            }
            if(exp) {
                setTitle("Add Expenses Option")
                setCol("expenses-4.0")
            }
            if (asU) {
                setTitle("Assign Units to Category")
                setCol("expenses-4.0")

            }

        } else {
            setDis(true)
            setText('')
            setTitle("")
            setCol("")
            setOptionList("")
        }

    })

    return (
        <Container>
                <Select>
            <form id="add__new__label" action="add__new__label">
                    <div>
                        <label > Heading
                            <input type="checkbox" checked={head} name={'head'} disabled={exp || asU} onChange={() => {setHead(!head);}}/>
                        </label>
                        <label > Expense
                            <input type="checkbox" checked={exp} name={'exp'} disabled={head || asU} onChange={() => {setExp(!exp);}}/>
                        </label>
                        <label > Assign Units
                            <input type="checkbox" checked={asU} name={'assign units'} disabled={exp || head} onChange={() => {setAsU(!asU);}}/>
                        </label>
                    </div>

                    {
                        head || exp ?
                        <div>
                        <label >{title}</label>
                        <select className="form-select" onChange={(e) => handleChange(e)}>
                        <option value="" defaultValue hidden>Choose here</option>
                        {
                            state[col] &&
                            state[col].map((obj) => (
                                <option value={obj.id}>{obj.label}</option>
                                ))
                            }
                        </select>
                        <input type="text" hidden={dis} value={text} onChange= {(e) => formatTxt(e.target.value)}/>
                        </div>
                        : ''
                    }
                    {
                        asU &&
                        <div>
                        <label >{title}</label>
                        <select className="form-select" onChange={(e) => handleChange(e)}>
                        <option value="" defaultValue hidden>Choose here</option>
                        {
                            state[col] &&
                            state[col].map((obj) => (
                                <option value={obj.id}>{obj.label}</option>
                                ))
                        }
                        </select>
                    {
                        units.map((unit) => (
                            <label htmlFor="" hidden={dis}>
                            {unit}
                            <input type="checkbox" hidden={dis} value={unit} onChange={(e) => handleChk(e)}/>
                            </label>
                        ))
                    }
                        </div>
                    }
                    <button class="btn btn-outline-primary" type="submit" hidden={hide} onClick={(e) => handleSubmit(e)}>ADD</button>

            </form>
            {/* <button onClick={() => mkDoc()}>Make Doc</button> */}
                </Select>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center
`
const Select = styled.div`
    max-width: 10%;
    min-width: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 550;
  font-size: 27px;

    form {
        input[type=text] {
            width: 100%;
            height: 40px;
            margin-top: 15px;
            border-radius: 5px;
            border: 1px solid #ced4da;
        }
        input[type=checkbox] {
            height: 18px;
            width: 18px;
            margin: 20px;
        }
    }

    div {
        label {
            margin: 10px;
        }
        input {
            height: 18px;
            width: 18px;
        }
    }

    button {
        margin-top: 20px;
        width: 75%;
        margin-left: 10%;
    }
`

export default AddOption;