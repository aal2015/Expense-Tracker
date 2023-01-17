import { useState } from 'react';

import dayjs from 'dayjs';

const UseDatePicker = (validateValue) => {
    const [date, setDate] = useState(dayjs(new Date()));

    const valueIsValid = validateValue(date);

    const initDate = (day, month, year) => {
        setDate(dayjs(new Date(`${year}-${month}-${day}`)));
    }

    const dateChangeHandler = newDate => {
        setDate(newDate);
    }

    const reset = () => {
        setDate(dayjs(new Date()));
    }

    return {
        initDate,
        date,
        isValid: valueIsValid,
        dateChangeHandler, 
        reset
    };
}

export default UseDatePicker;