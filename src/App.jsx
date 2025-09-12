import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='ViewWindow'>
        <div className="arrayContainer">
          <div className="arrayBox">1</div>
          <div className="arrayBox">2</div>
          <div className="arrayBox">3</div>
          <div className="arrayBox">4</div>
          <div className="arrayBox">5</div>
          <div className="arrayBox">6</div>
          <div className="arrayBox">7</div>
        </div>

        <div className="infoContainer">
          <div className="helper pseudocode"></div>
          <div className="helper controls"></div>
          <div className="helper indices"></div>
        </div>
      </div>
    </>
  )
}

export default App
