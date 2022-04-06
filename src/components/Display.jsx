import './Display.css'

export default props => {
    return (
        <div className="display">
            <h3>{props.value || 0}</h3>
        </div>
    )
}