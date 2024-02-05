import {TextField,Button} from '../../materialUI';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from "formik";
import {getDataApi} from '../../../backend/BasicAxios'
import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import * as yup from "yup";

const validationSchema = yup.object({
    clientId : yup.string().required('El cliente es requerido'),
});

export const SelectClient = ({sendFather}) => {

    const [clients, setClients] = useState([]);

    const submitBtn = (values) => {
        sendFather(values)
    }

    const comple = (event, value) => {
        formik.values.clientId = value.id;
    }
    const formik = useFormik({
        initialValues: {
            clientId: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => submitBtn(values),
    });

    const getClient = () => {
        getDataApi('client').then((data)=> {
            setClients([]);
            console.log(data);
            const optionClients = [];
            data.map(client => {
                optionClients.push({label: `${client.Name} ${client.Lastname}`, id: client.Id})
            })
            setClients(optionClients);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=> {
        getClient();
    }, [])

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-center gap-5'>
            <p className='font-bold text-[20px]'>Cliente</p>
            {clients && 
                <Autocomplete
                    // disablePortal
                    freeSolo
                    onChange={(event, value) => comple(event, value)}
                    options={clients}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name='clientId'
                            value={formik.values.clientId}
                            label='Seleccione un cliente'
                        />
                    )}
                />
            }

            <Button type="submit" variant="contained" disabled={!formik.isValid}>
                Enviar
            </Button>
        </form>
    );
};


SelectClient.propTypes = {
    sendFather: PropTypes.func,
};