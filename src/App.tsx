import { useEffect, useRef, useState } from 'react'
import './styles/app.css'

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerFinished, setTimerFinished] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!timerFinished) {
      setTimeout(() => {
        if (minutes === 0 && seconds === 0) {
          setTimerFinished(true)
          return ;
        }
        if(seconds === 0 ) {
          setSeconds(59)
          setMinutes(prevMinutes => prevMinutes - 1)
        } else {
          setSeconds(prevSeconds => prevSeconds - 1)
        }

      }, 1000)
    }
  }, [seconds, timerFinished])

  function initTimer() {
    setTimerFinished(!timerFinished);
    if (inputRef.current) {
      setMinutes(Number(inputRef.current.value))
      inputRef.current.value = ''
    }
  }

  return (
    <main className="main_container">
      <div className="circular">
        <div className="inner">
          <div className="timer">{minutes}:{seconds < 10 ? String(seconds).padStart(2, '0') : seconds}</div>
        </div>
        <div className="circle">
          <div className="bar left" ref={leftBar}>
            <div className="progress"></div>
          </div>
          <div className="bar right" ref={rightBar}>
            <div className="progress"></div>
          </div>
        </div>
      </div>
      <div className="input_section">
        <input type="number" ref={inputRef} placeholder="Insert the time in minutes"/>
        <button onClick={initTimer}>Let's Go</button>
      </div>
    </main>
  )
}

export default App
