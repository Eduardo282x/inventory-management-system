import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import './formGenerator.css'
import { Button } from '@mui/material';
import { useState } from "react";
import { useFormik } from "formik";
// import * as yup from 'yup';

export const FormGenerator = ({title, dataForm, bodySend, sendFather}) => {

    // const validationSchema = yup.object({
    //     email: yup
    //         .string('Enter your email')
    //         .email('Enter a valid email')
    //         .required('Email is required'),
    //     password: yup
    //         .string('Enter your password')
    //         .min(8, 'Password should be of minimum 8 characters length')
    //         .required('Password is required'),
    // });

    const submitBtn = (values) => {
        // sendFather(data)
        console.log(values);
    }

    const formik = useFormik({
        initialValues: bodySend,
        // validationSchema: validationSchema,
        onSubmit: (values) => console.log(values),
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center justify-center gap-5">
                <h2>{title}</h2>

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
                        variant="outlined" 
                    />
                ))}

                <Button type="submit" variant="contained">
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
    sendFather: PropTypes.func
};