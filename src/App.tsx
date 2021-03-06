import { useEffect, useRef, useState } from 'react'
import './styles/app.css'

function App() {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [alarmSound, setAlarmSound] = useState<boolean>(false);
  const [clearTimer, setClearTimer] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const leftProgressBar = useRef<HTMLDivElement | null>(null);
  const rightProgressBar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (clearTimer) {
      setMinutes(0)
      setSeconds(0)

      return;
    }

    if (timerStarted) {
      setTimeout(() => {
        if (minutes === 0 && seconds === 0) {
          setTimerStarted(false);
          setTimerFinished(true);
          setAlarmSound(true);

          if (leftProgressBar.current && rightProgressBar.current) {
            leftProgressBar.current.style.animation = ''
            rightProgressBar.current.style.animation = ''
          }
          return ;
        }

        if(seconds === 0 ) {
          setSeconds(59)
          setMinutes(prevMinutes => prevMinutes - 1)
        } else {
          setSeconds(prevSeconds => prevSeconds - 1)
        }

      }, 1000);
    }
  }, [seconds, timerStarted, clearTimer])

  function initTimer() {
    if (Number(inputRef.current?.value) <= 0) {
      setMessage(true)

      setTimeout(() => {
        setMessage(false)
      }, 5000)
      return;
    }

    if (timerStarted) {
      setMessage(true)

      setTimeout(() => {
        setMessage(false)
      }, 5000)
      return;
    }

    if (Number(inputRef.current?.value) > 0) {
      setTimerStarted(true);
      setTimerFinished(false);
      setClearTimer(false);
      setMinutes(Number(inputRef.current?.value))

      const timeInFullBarProgress = Number(inputRef.current?.value) * 60;
      const timeInEachBar = timeInFullBarProgress / 2

      if (leftProgressBar.current) {
        leftProgressBar.current.style.animation = `left ${timeInEachBar}s linear forwards`
        leftProgressBar.current.style.animationDelay = `${timeInEachBar}s`
      }

      if (rightProgressBar.current) {
        rightProgressBar.current.style.animation = `right ${timeInEachBar}s linear forwards`
      }

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  function handleClearTimer() {
    if (minutes === 0 && seconds === 0) {
      return;
    }
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
          {Number(inputRef.current?.value) <= 0 ? (
            <p>Enter a time greater than zero</p>
          ) : (
            <p>The counter has already started!</p>
          )}
        </div>
      )}
      <section className="section_container">
        <main className="main_container">
          <div className="circular">
            <div className="inner">
              {timerFinished && alarmSound ? (
                <>
                  <div className="timer finished">{clearTimer ? '0:00' : 'Time over!'}</div>
                  <audio src="assets/alarm-clock.mp3" autoPlay loop/>
                </>
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
              <button onClick={initTimer} className="button blue">Let's Go</button>
              {alarmSound ? (
                <button onClick={() => setAlarmSound(false)} className="button red">Stop Alarm</button>
              ) : (
                <button onClick={handleClearTimer} className="button red">Clear</button>
              )}
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default App
