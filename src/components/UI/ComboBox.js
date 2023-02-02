import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ComboBox(props) {
    const optionList = [];

    props.list.forEach(item => {
        optionList.push(item)
    })

    console.log(optionList);

    return (
        <Autocomplete
            options={optionList}
            defaultValue={props.value}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />
    );
}

export default ComboBox;