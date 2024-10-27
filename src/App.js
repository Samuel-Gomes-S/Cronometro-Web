import React, { useEffect, useState } from 'react';
import './App.css';

//Variaveis globais para acompanhar os segundos, minutos, horas
let seconds = 0
let minutes = 0
let hours = 0

function App() {

  const [time, setTime] = useState(0)
  const [buttonText, setButtonText] = useState('Iniciar')
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    return () => clearInterval(timer) // para limpar o intervalo ao desmontar o componente ou quando `timer` muda 
  }, [timer])

  //função de iniciar o timer
  function playTime() {

    if (timer) {

      clearInterval(timer)
      setTimer(null)
      setButtonText('Iniciar')

    } else {

      setTimer(

        setInterval(() => {

          let timeFormated;

          if (seconds < 60) {
            seconds++
          }

          if (seconds === 60) {
            seconds = 0
            minutes++
          }

          if (minutes === 60) {
            minutes = 0
            hours++
          }

          timeFormated = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds < 10 ? '0' + seconds : seconds)
          setTime(timeFormated)

        }, 1000)
      )

      setButtonText('Pausar')
    }
  }

  //função para limpar o timer
  function clearTime() {
    if (time === 0) return //apenas verificar  se o cronometro já está limpo

    //reseta as variáveis de tempo e atualiza o estado
    clearInterval(timer)
    setTimer(null)
    setButtonText('Iniciar')
    seconds = 0
    minutes = 0
    hours = 0
    setTime(0)
  }

  return (
    <div id='container' >
      <div id='content'>
        <p id='crono'> {time} </p>
        <div id='contentButton'>
          <button
            className='buttons'
            onClick={() => playTime()}
          >
            {buttonText}
          </button>
          <button
            className='buttons'
            onClick={() => clearTime()}
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}




export default App;
