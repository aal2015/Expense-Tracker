import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RadioOptions(props) {
    console.log(props.options);

    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{props.label}</FormLabel>
            <RadioGroup 
                row 
                value={props.value}
                onChange={props.changeHandler}
            >
                {props.options.map((option, id) => (
                    <FormControlLabel
                        key={id}
                        value={option}
                        control={<Radio />}
                        label={option} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default RadioOptions;