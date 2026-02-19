import React, { useState } from 'react'

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The function of good software is to make the complex appear simple.", author: "Grady Booch" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "The most dangerous phrase in the language is: we've always done it this way.", author: "Grace Hopper" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
  { text: "The details are not the details. They make the design.", author: "Charles Eames" },
  { text: "Design is thinking made visual.", author: "Saul Bass" },
  { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
  { text: "Less, but better.", author: "Dieter Rams" },
  { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
  { text: "Creativity takes courage.", author: "Henri Matisse" },
  { text: "People ignore design that ignores people.", author: "Frank Chimero" },
  { text: "Design is the silent ambassador of your brand.", author: "Paul Rand" },
  { text: "A user interface is like a joke. If you have to explain it, it's not that good.", author: "Martin LeBlanc" },
  { text: "Every great design begins with an even better story.", author: "Lorinda Mamo" },
  { text: "Design creates culture. Culture shapes values. Values determine the future.", author: "Robert L. Peters" },
  { text: "Great things are not done by impulse, but by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "The life of a designer is a life of fight against the ugliness.", author: "Massimo Vignelli" },
  { text: "Absorb what is useful, discard what is useless.", author: "Bruce Lee" },
  { text: "The most innovative designers consciously reject the standard option box.", author: "Marty Neumeier" },
  { text: "Design is where science and art break even.", author: "Robin Mathew" },
]

function getRandomQuote(currentIndex) {
  let idx
  do {
    idx = Math.floor(Math.random() * QUOTES.length)
  } while (idx === currentIndex)
  return idx
}

function QuoteCard() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length))

  const handleRefresh = () => {
    setQuoteIndex(prev => getRandomQuote(prev))
  }

  const quote = QUOTES[quoteIndex]

  return (
    <div className="card quote-card">
      <div className="quote-header">
        <h2 className="card-title">💭 Quote</h2>
        <button className="quote-refresh-btn" onClick={handleRefresh} title="New quote">
          ↻
        </button>
      </div>
      <p className="quote-text">"{quote.text}"</p>
      <p className="quote-author">— {quote.author}</p>
    </div>
  )
}

export default QuoteCard
