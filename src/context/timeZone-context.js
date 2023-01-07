import React, { useState } from 'react';

const TimeZoneContext = React.createContext({
    timeZone: 'Asia/Bangkok',
    setTimeZone: (newTimeZone) => { }
})

export const TimeZoneContextProvider = (props) => {
    const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

    const changeTimeZone = newTimeZone => {
        setTimeZone(newTimeZone);
    }

    return <TimeZoneContext.Provider
        value={{
            timeZone: timeZone,
            onChangeTimeZone: changeTimeZone
        }}
    >
        {props.children}
    </TimeZoneContext.Provider>
}

export default TimeZoneContext;