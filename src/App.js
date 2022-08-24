import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Scores from './components/Scores'
import AddScore from './components/AddScore'
import About from './components/About'
import ScoreDetails from './components/ScoreDetails'


const App = () => {
  const [showAddScore, setShowAddScore] = useState(false)
  const [scores, setScores] = useState([])

  // useEffect cant be async, so we have to create variables with async functions
  useEffect(() => {
    const getScores = async () => {
      const scoresFromServer = await fetchScores()
      setScores(scoresFromServer)
    }

    getScores()
  }, [])

  // Fetch Scores
  const fetchScores = async () => {
    const res = await fetch('http://localhost:5000/scores')
    const data = await res.json()

    return data
  }

  // Fetch Score
  const fetchScore = async (id) => {
    const res = await fetch(`http://localhost:5000/scores/${id}`)
    const data = await res.json()

    return data
  }


  // Add Score
  const addScore = async (score) => {
    const res = await fetch(`http://localhost:5000/scores`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(score)
    })

    const data = await res.json()

    setScores([...scores, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newScore = { id, ...task }
    // setTasks([...tasks, newScore])
  }

  // Delete Score
  const deleteScore = async (id) => {
    await fetch(`http://localhost:5000/scores/${id}`, {
      method: 'DELETE'
    })

    setScores(scores.filter((score) => score.id !== id))
  }

  // Toggle Favorite
  const toggleFavorite = async (id) => {
    const scoreToToggle = await fetchScore(id)
    const updScore = {
      ...scoreToToggle,
      favorite: !scoreToToggle.favorite
    }

    const res = await fetch(`http://localhost:5000/scores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updScore)
    })

    const data = await res.json()

    setScores(
      scores.map((score) =>
        score.id === id ? { ...score, favorite: data.favorite } : score))
  }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddScore(!showAddScore)}
          showAdd={showAddScore} />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddScore && <AddScore onAdd={addScore} />}
                {scores.length > 0 ?
                  <Scores
                    scores={scores}
                    onDelete={deleteScore}
                    onToggle={toggleFavorite} /> : 'No Scores to Show'}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/score/:id" element={<ScoreDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
