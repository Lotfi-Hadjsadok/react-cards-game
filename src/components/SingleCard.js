import React from 'react'
import './SingleCard.css'
function singleCard({ card, turnCard, flipped, disabled }) {
    const handleClick = () => {

        if (!disabled) turnCard(card)
    }
    return (
        <div className="card">
            <div className={flipped ? 'flipped' : ''}>

                <img className="front" src={card.src} alt="" />
                <img onClick={handleClick} src="/img/cover.png" alt="" className="back" />
            </div>
        </div>
    )
}

export default singleCard
