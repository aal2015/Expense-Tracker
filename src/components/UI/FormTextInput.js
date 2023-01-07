import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

function FormTextInput(props) {
    return (
        <FormControl fullWidth>
            <TextField
                error={props.hasError}
                label={props.label}
                value={props.value}
                variant={props.variant}
                onChange={props.changeHandler}
                onBlur={props.blurHandler}
                type={props.inputType}
            />
        </FormControl>
    );
}

export default FormTextInput;