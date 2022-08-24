import React, { useState } from 'react'
import { Route } from 'react-router-dom'

// DayPicker
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

// NumberPicker
import NumberPicker from 'react-widgets/NumberPicker'


const AddScore = ({ onAdd }) => {
    const [course, setCourse] = useState('')
    const [text, setText] = useState('')
    const [favorite, setFavorite] = useState(false)
    // Without Day Picker...
    // const [day, setDay] = useState('')

    // DayPicker
    const [day, setDay] = useState(new Date())

    // onSubmit Function

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a score')
            return
        }

        onAdd({ course, text, day, favorite })

        setCourse('')
        setText('')
        setDay('')
        setFavorite(false)

    }


    return (
        <form className="add-score" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Golf Course</label>
                <input type='text' placeholder="Add Course" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Score</label>
                {/* Default without NumberPicker
                <input type='text' placeholder="Add Score" value={text} onChange={(e) => setText(e.target.value)} /> */}
                <NumberPicker
                    defaultValue={72}
                    value={text}
                    onChange={setText}
                    min={54}
                    max={144}
                />
            </div>
            <div className="form-control">
                <label>Day</label>
                {/*Default without DayPicker
                <input type='text' placeholder="Add Day" value={day} onChange={(e) => setDay(e.target.value)} /> 
                */}
                <DayPicker
                    className='day-picker'
                    mode='single'
                    selected={day}
                    onDayClick={setDay}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set Favorite</label>
                <input
                    type='checkbox'
                    checked={favorite}
                    value={favorite}
                    onChange={(e) => setFavorite(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Score' className="btn btn-block" />
        </form>
    )
}

export default AddScore