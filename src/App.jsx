import { useEffect, useState } from 'react'
// import logo from './assets/logo.svg'
import './App.css'

const questions = [
  "meow",
  "rawr"
];

function copyLink() {
  const shareLink = window.location.href;
  navigator.clipboard.writeText(shareLink).then(() => {
    (alert("Link copied!"))
  });
}

function shareToX(score) {
  const shareLink = window.location.href;
  const scoreText = score ? `I got ${score} on the League Purity Test!\n` : '';
  const xLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(scoreText)}&url=${encodeURIComponent(shareLink)}`;
  console.log(xLink);
  window.open(xLink, '_blank');
}

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const scoreFromUrl = urlParams.get("score");

  const [answers, setAnswers] = useState(Array(100).fill(false));
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (index) => {
    const newAnswers = [...answers];
    newAnswers[index] = !newAnswers[index];
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScore = 100 - answers.filter(Boolean).length;
    setSubmitted(true);
    setScore(newScore);
    window.history.replaceState(null, '', `?score=${newScore}`)
  };

  useEffect(() => {
    if(scoreFromUrl == score) {
      setSubmitted(true);
      setScore(scoreFromUrl);
    }
  })

  return (
    <>
        <div className="title">
          <h1>League Purity Test</h1>
          <p id="caution">Caution: This is not a bucket list. Completion of all items on this test will likely result in a permaban.</p>
        </div>
      {!submitted && (
        <div className="inputSection">
          <form onSubmit={handleSubmit}>
            <div class="questions">
              {questions.map((q, i) => (
                <label key={i} >
                  <input
                    type="checkbox" 
                    name={i}
                    checked={answers[i]}
                    onChange={() => handleCheckboxChange(i)}
                  />
                  <span>{i + 1}. {q}</span>
                </label>
              ))}
            </div>


            <input type="submit"/>
          </form>
          
        </div>
      )}

      {submitted && (
        <div className="results">
          <h2>Your Score: </h2>
          <h1 id="scoreText">{score}</h1>
          <div className="resultButtons">
            <a href="../">
              <button>Take Again!</button>
            </a>
            <button onClick={() => shareToX(score)}>Share on X</button>
            <button onClick={copyLink}>Copy Link</button>            
          </div>
          <p id="selfInsert">This test was created by ananas.</p>
        </div>
      )}
        
    </>
  )
}

export default App
