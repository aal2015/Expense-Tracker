import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

function FormSelect(props) {
    return (
        <FormControl fullWidth>
            <InputLabel id="select-input">{props.label}</InputLabel>
            <Select
                labelId="select-input"
                // id="demo-simple-select"
                value={props.value}
                label={props.label}
                onChange={props.changeHandler}
                onBlur={props.blurHandler}
            >
                {props.itemValues.map((item, id) => (
                    <MenuItem key={id} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default FormSelect;