import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
function Clock() {
    const [date, setDate] = useState(new Date());
    const [editTime, setEditTime] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [tempTime, setTempTime] = useState(new Date().toLocaleTimeString().split(":"));
    const router = useRouter();
    let addSeconds1 = 0;
    const handleChange = (e: any) => {
        setEditValue(e.target.value);
    }
    const isTimeValid = () => {
        const rexexRxp = /^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/;
        return (rexexRxp.test(editValue)) ? true : false;
    }
    function refreshClock() {
        const tempDate = new Date();
        tempDate.setHours(parseInt(tempTime[0]));
        tempDate.setMinutes(parseInt(tempTime[1]));
        tempDate.setSeconds(parseInt(tempTime[2]) + addSeconds1);
        addSeconds1++;
        setDate(tempDate);

    }

    useEffect(() => {
        const time = document.querySelector(".hours");
        const secHand = document.querySelector(".second");
        const minHand = document.querySelector(".minute");
        const hourHand = document.querySelector(".hour");

        for (let i = 1; i <= 60; i++) {
            if (i % 5 == 0) {
                time.innerHTML += "<div class='hour-number'><div>" + (i / 5) + "</div></div>";
                let hours = document.getElementsByClassName("hour-number");
                hours[hours.length - 1].style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
                hours[hours.length - 1].firstChild.style.transform = `rotate(${i * -6}deg)`;
            } else {
                time.innerHTML += "<div class='minute-bar'></div>";
                let bars = document.getElementsByClassName("minute-bar");
                bars[bars.length - 1].style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
            }
        }

        function startClock() {

            const now = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();

            let secDeg = seconds * (360 / 60) + minutes * 360;
            let minDeg = minutes * (360 / 60) + seconds / 12;
            let hourDeg = hours * (360 / 12) + (minutes / 12) * (360 / 60);
            secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
            minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
            hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        }
        setInterval(startClock, 1000);
        startClock();

    }, [])
    useEffect(() => {
        let timerId = setInterval(refreshClock, 1000);

        if (editTime === true) {
            clearInterval(timerId);
        }
        else {
            setEditValue(date.toLocaleTimeString())
        }
        return function cleanup() {
            clearInterval(timerId);
        };
    }, [editTime]);
    return (
        <>
            <div className="clock-body">
                <div className="hours"></div>
                <div className="disc disc-top"></div>
                <div className="disc disc-bottom"></div>
                <div className="hand second"></div>
                <div className="hand minute"></div>
                <div className="hand hour"></div>
            </div>
            <br />
            {editTime === false ?
                <>
                    <span suppressHydrationWarning onDoubleClick={() => setEditTime(true)}>
                        {date.toLocaleTimeString()}
                    </span>
                    <p>Double Click on Time To Edit the Time </p>
                </> :
                <>
                    <input onChange={handleChange} onDoubleClick={() => {
                        if (isTimeValid()) {
                            setEditTime(false);
                            let time = editValue.split(":"); // replace with ":" for differently displayed time.


                            setTempTime(time);
                            //setDate(date);
                        }
                        else
                            alert("Please Enter Valid Time")
                    }} value={editValue.replace(" AM", "").replace(" PM", "")} />
                    <p>24 Hours Format (HH:mm:ss)</p>
                </>
            }
            <div className="mortgage-form--row mortgage-form--row__button-wrapper">

                <button type="reset" onClick={() => router.push('/')}>Navigate To Calculator</button>
            </div>

        </>
    );
}
export default Clock;