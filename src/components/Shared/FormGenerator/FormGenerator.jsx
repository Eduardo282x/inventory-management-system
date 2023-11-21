import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import './formGenerator.css'
import { Button } from '@mui/material';
import { useState } from "react";

export const FormGenerator = ({title, dataForm, bodySend, sendFather}) => {
    const [data, setData] = useState(bodySend)

    const setDataInput = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const submitBtn = () => {
        sendFather(data)
        console.log(data);
    }

    return (
        <div className="formData">
            <h2>{title}</h2>

            {dataForm.map((formInput,index) => (
                <TextField 
                    error={data[formInput.name] == '' ? true : false }
                    required
                    className="inputField"
                    key={index}  
                    name={formInput.name}
                    value={data[formInput.name]}
                    onChange={()=>setDataInput(event)}
                    label={formInput.label} 
                    type={formInput.type}
                    variant="outlined" 
                />
            ))}

            <Button onClick={submitBtn} variant="contained">
                Enviar
            </Button>
        </div>
    )
}


FormGenerator.propTypes = {
    title: PropTypes.string,
    dataForm: PropTypes.array,
    bodySend: PropTypes.object,
    sendFather: PropTypes.func
};