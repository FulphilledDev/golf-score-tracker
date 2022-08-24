import Score from "./Score"

const Scores = ({ scores, onDelete, onToggle }) => {
    return (
        <>
            {scores.map((score) => (
                <Score
                    key={score.id}
                    score={score}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </>
    )
}

export default Scores
