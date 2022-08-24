import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'

function ScoreDetails() {
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState({})
    // const [error, setError] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        const fetchScore = async () => {
            const res = await fetch(`http://localhost:5000/scores/${params.id}`)
            const data = await res.json()

            if (res.status === 404) {
                navigate('/')
            }

            setScore(data)
            setLoading(false)
        }

        fetchScore()
    })

    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div>
            <h3>{score.course}</h3>
            <p>{score.text}</p>
            <p>{score.day}</p>
            <Button
                onClick={() => {
                    navigate(-1)
                }}
                text='Go Back'
            />
        </div>
    )
}

export default ScoreDetails