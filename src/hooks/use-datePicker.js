import { useState } from 'react';

import dayjs from 'dayjs';

const UseDatePicker = (validateValue) => {
    const [date, setDate] = useState(dayjs(new Date()));

    const valueIsValid = validateValue(date);

    const dateChangeHandler = newDate => {
        setDate(newDate);
    }

    const reset = () => {
        setDate(dayjs(new Date()));
    }

    return {
        date,
        isValid: valueIsValid,
        dateChangeHandler, 
        reset
    };
}

export default UseDatePicker;