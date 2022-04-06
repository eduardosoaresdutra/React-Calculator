import './Button.css'

export default props => {
    let classes = 'buttonCalc '
    classes += props.double ? 'double ' : ''
    classes += props.triple ? 'triple ' : ''
    classes += props.operation ? 'operation ' : ''

    return (
        <button
            onClick={e => {props.click && props.click(props.label)}}
            className={classes}>
            <p>{props.label}</p>
        </button>
    )
}