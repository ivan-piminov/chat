import React, {useEffect, useState} from "react"
import "./Time.css"

const Time = () => {
    const [time, setTime] = useState(new Date().toString().slice(0, 25))

    useEffect(() => {
            const timer = setInterval(() => setTime(new Date().toString().slice(0, 25)), 1000);
            return () => clearInterval(timer)
        }
    )

    return <div className="time-custom">{time}</div>
}
export default Time;
