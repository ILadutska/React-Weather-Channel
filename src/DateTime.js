import  React, { useState , useEffect } from 'react';

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
        clearInterval(timer)
        }
        
    });
    
    return(
        <div>
            <p>{date.toLocaleTimeString()}</p>
            <p>{date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit',year: 'numeric'})}</p>
            <p>{date.toLocaleDateString('en-US', { weekday: 'long' })}</p>

        </div>
    )
}
export default DateTime