import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

function FormMultiLineTextInput(props) {
    return (
        <FormControl fullWidth>
            <TextField 
                label={props.label}
                multiline
                rows={props.rows}
                value={props.value}
                variant={props.variant}
                onChange={props.changeHandler}
            />
        </FormControl>
    );
}

export default FormMultiLineTextInput;