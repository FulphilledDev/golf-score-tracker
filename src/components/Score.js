import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Score = ({ score, onDelete, onToggle }) => {
    return (
        <div className={`score ${score.favorite ? 'favorite' : ''}`} onDoubleClick={() => onToggle(score.id)}>
            <h3>
                {score.text}{' '}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(score.id)}
                />
            </h3>
            <p>{score.day}</p>
            <p><Link to={`/score/${score.id}`}>View Details</Link></p>
        </div>
    )
}

export default Score
