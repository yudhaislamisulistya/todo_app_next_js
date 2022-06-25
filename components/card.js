const Card = ({todo}) => {
    const { heading, description } = todo
    return(
        <div className="card text-left mt-2">
            <div className="card-body">
            <h4 className="card-title">{heading}</h4>
            <p className="card-text">{description}</p>
            </div>
        </div>
    )
}
    
export default Card;