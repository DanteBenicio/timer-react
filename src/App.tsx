import { useEffect, useRef, useState } from 'react'
import './styles/app.css'

function App() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const leftBar = useRef<HTMLDivElement | null>(null);
  const rightBar = useRef<HTMLDivElement | null>(null);

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
    if (minutes === 0 && seconds === 0) {
      setTimerStarted(true);
      setTimerFinished(false);
    }

    if (inputRef.current?.value) {
      setMinutes(Number(inputRef.current.value))

      const timeInFullBarProgress = Number(inputRef.current.value) * 60;
      const timeInEachBar = timeInFullBarProgress / 2

      if (leftBar.current?.firstChild) {
        console.log(timeInEachBar)

        leftBar.current.firstChild.style.animation = `left ${timeInEachBar}s linear both`
        leftBar.current.firstChild.style.animationDelay = `${timeInEachBar}s`
      }

      if (rightBar.current?.firstChild) {
        rightBar.current.firstChild.style.animation = `right ${timeInEachBar}s linear both`
      }

      if (inputRef.current) {
      inputRef.current.value = ''
      }
    }
  }

  function handleClearTimer() {
    setTimerStarted(false);
    setTimerFinished(true);
    setClearTimer(true);

    if (leftProgressBar.current && rightProgressBar.current) {
      leftProgressBar.current.style.animation = ''
      rightProgressBar.current.style.animation = ''
    }
  }

  return (
    <>
      {message && (
        <div className="message">
          <p>O Contador ja foi iniciado</p>
        </div>
      )}
      <section className="section_container">
        <main className="main_container">
          <div className="circular">
            <div className="inner">
              {timerFinished ? ( 
                <div className="timer finished">{clearTimer ? '0:00' : 'Time over!'}</div>
              ) : (
                <div className="timer">{minutes}:{seconds < 10 ? String(seconds).padStart(2, '0') : seconds}</div>
              )}
            </div>
            <div className="circle">
              <div className="bar left">
                <div className={`${timerFinished ? 'progress-finished' : 'progress'}`} ref={leftProgressBar}></div>
              </div>
              <div className="bar right" >
                <div className={`${timerFinished ? 'progress-finished' : 'progress'}`} ref={rightProgressBar}></div>
              </div>
            </div>
          </div>
          <div className="input_section">
            <div className="input_group">
              <input type="number" ref={inputRef} placeholder="Enter time in minutes"/>
              <button onClick={initTimer}>Let's Go</button>
              <button onClick={handleClearTimer}>Clear</button>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default App
