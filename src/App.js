
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "img/helmet-1.png", matched: 'false' },
  { "src": "img/potion-1.png", matched: 'false' },
  { "src": "img/ring-1.png", matched: 'false' },
  { "src": "img/scroll-1.png", matched: 'false' },
  { "src": "img/shield-1.png", matched: 'false' },
  { "src": "img/sword-1.png", matched: 'false' },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const turnCard = (card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card)
  }

  console.log(cards)
  // Compare two cards
  useEffect(() => {
    if (!choiceOne || !choiceTwo) return
    if (choiceOne.src == choiceTwo.src && choiceOne.id !== choiceTwo.id) {
      setDisabled(true)
      setCards((prevState) => {
        return prevState.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      })

      resetTurn()


    } else {
      setTimeout(() => {
        resetTurn()
      }, 1000);
    }
  }, [choiceTwo])


  // Shake Cards
  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
    setChoiceTwo(null)
    setChoiceOne(null)
    console.log(cards, turns)
  }

  // reset choices & turnes update
  const resetTurn = () => {
    setChoiceTwo(null)
    setChoiceOne(null)
    setTurns((prevState) => {
      return prevState + 1
    })
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCard()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      <div className="card-grid">
        {cards.map((card, key) => (
          <SingleCard disabled={disabled} key={key} flipped={card === choiceOne || card === choiceTwo || card.matched === true} turnCard={turnCard} card={card} />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
