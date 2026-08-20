import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div>
          <h1>Ingoma</h1>
          <p>
            Microlearning commande publique &amp; comptabilité publique
            <br />
            pour les fonctionnaires du Burundi
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <p style={{ fontSize: 14, opacity: 0.7 }}>
          Starter Vite + React — prêt pour le développement du parcours.
        </p>
      </section>
    </>
  )
}

export default App
