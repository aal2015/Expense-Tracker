import { useContext } from 'react';
import TimeZoneContext from '../../context/timeZone-context';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function TimeZoneSelect() {
    const ctx = useContext(TimeZoneContext);

    const handleChange = (event) => {
        ctx.onChangeTimeZone(event.target.value);
    };

    const availableTimeZones = Intl.supportedValuesOf('timeZone');

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Current Time Zone</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ctx.timeZone}
                    label="Current Time Zone"
                    onChange={handleChange}
                >
                    {availableTimeZones.map((item, id) => (
                        <MenuItem key={id} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default TimeZoneSelect;