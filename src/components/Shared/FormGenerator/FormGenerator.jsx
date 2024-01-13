import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import './formGenerator.css'
import { Button } from '@mui/material';
import { useFormik } from "formik";

export const FormGenerator = ({title, dataForm, bodySend, validationSchema, action, sendFather}) => {

    const submitBtn = (values) => {
        sendFather({action: action, data: values});
    }

    const formik = useFormik({
        initialValues: bodySend,
        validationSchema: validationSchema,
        onSubmit: (values) => submitBtn(values),
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center gap-5">
                <p className="font-bold text-[20px]">{title}</p>

                {dataForm.map((formInput,index) => (
                    <TextField 
                        // error={formik[formInput.name] == '' ? true : false }
                        // required
                        className="inputField"
                        label={formInput.label} 
                        type={formInput.type}
                        key={index}  
                        name={formInput.name}
                        value={formik.values[formInput.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[formInput.name] && Boolean(formik.errors[formInput.name])}
                        helperText={formik.touched[formInput.name] && formik.errors[formInput.name]}
                        variant="outlined" 
                    />
                ))}

                <Button type="submit" variant="contained" disabled={!formik.isValid}>
                    Enviar
                </Button>
            </form>
        </div>
    )
}


FormGenerator.propTypes = {
    title: PropTypes.string,
    dataForm: PropTypes.array,
    bodySend: PropTypes.object,
    sendFather: PropTypes.func,
    validationSchema: PropTypes.any,
    action: PropTypes.string
};