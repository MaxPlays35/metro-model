import './App.css'
import { motion } from "framer-motion"
import React, { useEffect } from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'
import trainImg from './subway.png'
import { io } from "socket.io-client"

const socket = io('https://trains.radolyn.com/', {path: "/api/ws/socket.io"})

function App() {

  const [stations, setStations] = React.useState({
    "Рокоссовская": 0,
    "Соборная": 0,
    "Кристалл": 0,
    "Заречная": 0,
    "Библиотека им. Глеба": 0,
  })

  const [trains, setTrains] = React.useState([])

  const [coords, setCoords] = React.useState(-700)

  // console.log("re-render occured");

  const [step, setStep] = React.useState(0);
  const [imgGraph, setImgGraph] = React.useState("");

  // useEffect(() => {
  //   let a = setInterval(() => {
  //     console.log(coords);
      
  //     if (coords >= 700) {
  //       setStep(-1)
  //     }
  //     if (coords < 0){
  //       setStep(1)
  //     }
  //     setCoords(coords + step*100)
  //   }, 2000)

  //   return () => clearInterval(a)
  // })

  useEffect(() => {

    socket.on("stations", (data) => {
      setStations(data)
    })
    socket.on("trains", (data) => {
      setTrains(data)
    })

    socket.on("image", (data) => {
      setImgGraph(data)
    })
    
    return () => {
      socket.off("stations")
    }
  }, [])

  return (
      <div className="w-auto h-[200vh] flex flex-col justify-center items-center select-none bg-gray-800 text-white gap-y-2 overflow-x-hidden">
        <button className='btn' onClick={() => {socket.emit("start", {"trains": 18, "speed": 1})}}>Start</button>
        {
          imgGraph != "" && 
          <img src={`data:image/jpeg;base64,${imgGraph}`} className="bg-white"/>
        }
        <div className="flex flex-row items-center">
          <div className="dot">
            <div className="inner-dot">
              <p>{stations["Рокоссовская"]}</p>
            </div>
            <div className="relative -ml-4">
              <div className="absolute w-20">
                Рокоссовская
              </div>
            </div>
          </div>
          <div className="w-[360px] h-1 bg-violet-500"/>
          <div className="dot">
            <div className="inner-dot">
              <p>{stations["Соборная"]}</p>
            </div>
            <div className="relative -ml-2">
              <div className="absolute w-20">
                Соборная
              </div>
            </div>
          </div>
          <div className="w-[180px] h-1 bg-violet-500"/>
          <div className="dot">
            <div className="inner-dot">
              <p>{stations["Кристалл"]}</p>
            </div>
            <div className="relative -ml-2">
              <div className="absolute w-20">
                Кристалл
              </div>
            </div>
          </div>
          <div className="w-[120px] h-1 bg-violet-500"/>
          <div className="dot">
            <div className="inner-dot">
              <p>{stations["Заречная"]}</p>
            </div>
            <div className="relative -ml-2">
              <div className="absolute w-20">
                Заречная
              </div>
            </div>
          </div>
          <div className="w-[420px] h-1 bg-violet-500"/>
          <div className="dot">
            <div className="inner-dot">
              <p>{stations["Библиотека им. Глеба"]}</p>
            </div>
            <div className="relative -ml-2">
              <div className="absolute w-20">
                Библиотека им. Глеба
              </div>
            </div>
          </div>
        </div>
          <div className="trains pt-7 w-[1400px] flex flex-col">
            {/* <motion.img src={trainImg} alt="train" className="train" drag animate={{"x": 700}} height={50} width={50}/> */}
            {trains.map((train, index) => {
              return (
                  <motion.div className="train" animate={{x: train["x"], y: train["y"]}} key={index.toString()}>
                    <img src={trainImg} alt="train" className="train" height={50} width={50}/>
                    <p>{train["current_capacity"]}</p>
                  </motion.div>
              )
            })}
          </div>
        </div>

  )
}

export default App
