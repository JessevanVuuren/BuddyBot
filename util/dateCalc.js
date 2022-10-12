const showTimeLeft = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19)
}

const [diffInMilliseconds, setDiffInMilliseconds] = useState("")
const [timeTillMidnight, setTimeTillMidnight] = useState(0)


const [time, setTime] = useState();
const timerRef = useRef(time);



const daysUntilNext = (month, day) => {
  var bDay = new Date(), y = bDay.getFullYear(), next = new Date(y, month - 1, day);
  bDay.setHours(0, 0, 0, 0);
  if (bDay > next) next.setFullYear(y + 1);
  return Math.round((next - bDay) / 8.64e7);
}

useEffect(() => {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var secondsUntilEndOfDate = (24*60*60) - (h*60*60) - (m*60) - s;
  setTime(secondsUntilEndOfDate)


  const timerId = setInterval(() => {
    secondsUntilEndOfDate -= 1;
    if (secondsUntilEndOfDate < 0) {
      clearInterval(timerId);
    } else {
      setTime(secondsUntilEndOfDate);
    }
  }, 1000);
  return () => {
    clearInterval(timerId);
  };
}, []);

const setSecondsTime = () => {
  
}