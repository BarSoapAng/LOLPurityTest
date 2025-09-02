import { useEffect, useState } from 'react'
// import logo from './assets/logo.svg'
import './App.css'

const questions = [
  "Finished the tutorial.",
  "Level 30+.",
  'Level 100+.',
  "Level 200+.",
  "Level 300+.",
  "Played 10+ games within 24 hours.",
  "Went 0/10.",
  "Went 0/20.",
  "Went 10/0.",
  "Went 20/0.",
  "Got a penta in norms.",
  "Hit Iron IV.",
  "Hit Challenger.",
  "Boosted someone or got boosted.",
  "Won clash.",
  "Won a 4v5 game.",
  "Got a friend to try the game.",
  "Met a friend through League.",
  "Played in a 5 stack.",
  "Played in a 5v5 scrim.",
  "Participated in a LAN party for League (gathered IRL to play).",
  "Seen a Poro explode.",
  "Seen Shelly dance.",
  "Died to fountain.",
  "Died to minions/jungle camps.",
  "Flashed into a wall.",
  "Played on trackpad.",
  "Own 100+ champions.",
  "Own every champion.",
  "Rolled an ultimate skin from hextech chests.",
  "Own 100+ skins.",
  "Own 200+ skins.",
  "Own 3+ Lux skins.",
  "Spent $50+ on the game.",
  "Spent $100+ on the game.",
  "Gave/received skins/RP as a gift.",
  "Own League merch.",
  "Typed \“ggez\” in chat.",
  "Typed \“___ diff\” in chat.",
  "Received a chat restriction.",
  "Received a multi-game chat ban.",
  "Got banned.",
  "Got IP banned.",
  "Reported someone without a valid reason.",
  "Been honor level 0 or 1.",
  "Been honor level 5.",
  "Rage DMed someone after a game.",
  "Rage quit a game.",
  "Broke something IRL out of rage.",
  "Lied about your rank.",
  "Used scripts/cheats.",
  "Missed an exam for League.",
  "Missed work for League.",
  "Played drunk.",
  "Played high.",
  "Played while sick.",
  "Played on vacation.",
  "Played on a date.",
  "Played at 12am on New Year\’s.",
  "Played in public.",
  "Quoted a voice line.",
  "Dreamed about League.",
  "Thought \“I could be playing right now\” while outside.",
  "Deleted and reinstalled the game.",
  "Watched Worlds.",
  "Went to Worlds in person.",
  "Favorite team is T1.",
  "Follow League cosplayers.",
  "Cosplayed something League themed.",
  "Posted to r/leagueoflegends.",
  "Followed official League of Legends accounts on social media.",
  "Played Valorant, TFT, or Riot Forge games.",
  "Completed a client mini-game/story quest (ie. Soul Fighter, Demon\’s Hand, etc.)",
  "Joined a League Stream.",
  "Spent money on a League Stream.",
  "Installed Porofessor.",
  "Used u.gg, op.gg, and/or league of stats.",
  "Watched Skill Capped on YouTube.",
  "Paid for coaching.",
  "Used practice tool for the sole purpose of mastering a champion.",
  "Gone 3 or more days without showering.",
  "Gone a week or more without showering.",
  "Been in a relationship (not including e-dating).",
  "Body count > 0.",
  "Catfished someone for skins/RP.",
  "E-dated your duo.",
  "Met your partner through League.",
  "Got into an argument over League.",
  "Broke up because of League.",
  "Had a League related desktop wallpaper.",
  "Paid for League themed \“exclusive content\”.",
  "Made a League sex joke.",
  "Wrote/read League fanfics.",
  "Fantasized about a champion.",
  "Masturbated to champion fanart.",
  "Own a champion body pillow.",
  "Jerked off between queues.",
  "Supported under the desk during a League game.",
  "Had sex during a game.",
  "In a relationship with the game."
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

    if (window.gtag) {
      gtag('event', 'test_submitted', {
        value: score,   // user’s test score
        score: score,   // custom parameter (for GA4 custom dimension)
      });
    }
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
