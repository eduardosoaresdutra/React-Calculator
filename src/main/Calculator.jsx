import './Calculator.css'
import { useState } from 'react'

import CalcButton from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default props => {

    const [displayValue, setDisplayValue] = useState('0')
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operation, setOperationState] = useState(null)
    const [values, setValues] = useState([0, 0])
    const [current, setCurrent] = useState(0)

    const setInitialState = _ => {
        setDisplayValue(initialState.displayValue)
        setClearDisplay(initialState.clearDisplay)
        setOperationState(initialState.operation)
        setValues(initialState.values)
        setCurrent(initialState.current)
    }

    const clearMemory = _ => {
        setInitialState()
        console.log(values)
        console.log('clear')
    }

    const addDigit = n => {
        if (n === '.' && displayValue.includes('.')) {
            return
        }

        const boolClearDisplay = displayValue === '0' || clearDisplay
        const constCurrentValue = boolClearDisplay? '' : displayValue
        const constDisplayValue = constCurrentValue + n

        setDisplayValue(constDisplayValue)
        setClearDisplay(false)

        if (n !== '.') {
            const newValue = parseFloat(constDisplayValue)
            const valuesTemp = [...values]
            valuesTemp[current] = newValue
            setValues(valuesTemp)
        }
    }

    const setOperation = operationParam => {
        if (current === 0) {
            setOperationState(operationParam)
            setCurrent(1)
            setClearDisplay(true)
        } else {
            const equals = operation === '='
            const currentOperation = operation
            const valuesTemp = [...values]
            
            try {
                valuesTemp[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                valuesTemp[0] = values[0]
            }

            valuesTemp[1] = 0

            setDisplayValue(valuesTemp[0])
            setCurrent(equals ? 0 : 1)
            setValues(valuesTemp)
            setClearDisplay(!equals)
            setOperationState(equals ? null : operationParam)
        }
    }

    return(
        <>
            <h1>Calculator</h1>
            <div className='calculator'>
                <Display value={displayValue} />
                <CalcButton label="CE" click={clearMemory} triple />
                <CalcButton label="/" click={setOperation} operation />
                <CalcButton label="7" click={addDigit} />
                <CalcButton label="8" click={addDigit} />
                <CalcButton label="9" click={addDigit} />
                <CalcButton label="*" click={setOperation} operation />
                <CalcButton label="4" click={addDigit} />
                <CalcButton label="5" click={addDigit} />
                <CalcButton label="6" click={addDigit} />
                <CalcButton label="-" click={setOperation} operation />
                <CalcButton label="1" click={addDigit} />
                <CalcButton label="2" click={addDigit} />
                <CalcButton label="3" click={addDigit} />
                <CalcButton label="+" click={setOperation} operation />
                <CalcButton label="0" click={addDigit} double />
                <CalcButton label="." click={addDigit} />
                <CalcButton label="=" click={setOperation} operation />
            </div>
        </>
    )
}