import { TablaComponents } from "../Shared/Table/TablaComponents";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { columns, columnsName } from "./inventory.data";
import { getDataApi, postDataApi } from "../../backend/BasicAxios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Fade from '@mui/material/Fade';
import { FormGenerator } from '../Shared/FormGenerator/FormGenerator';
import Backdrop from '@mui/material/Backdrop';
import {style, dataForm, validationSchema, bodySend} from './inventory.data'
import "./inventory.css";

export const Inventory = () => {
  const navigate = useNavigate();
  const [rows,setRows] = useState([]);
  const [actionForm, setActionForm] = useState('add');
  const [bodyForm, setBodyForm] = useState(bodySend);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [filterText, setFilterText] = useState("");


  const goBack = () => {
    navigate(-1);
  };

  const getDataChild = (data) => {
      if(data.action == 'add'){
          handleClose()
          addArticle(data.data)
      }

      if(data.action == 'edit'){
          handleClose()
          editArticle(data.data)
      }

      if(data.action == 'get'){
          const dataEdit = {
              IdCode: data.data.IdCode,
              Code: data.data.Code,
              Description: data.data.Description,
              Axis: data.data.Axis,
              Aloj: data.data.Aloj,
              Height: data.data.Height,
              Amount: data.data.Amount,
              Price: data.data.Price,
          }
          setActionForm('edit')
          setBodyForm(dataEdit)
          handleOpen()
      }
  }

  const editArticle = (userEdit) => {
    handleClose()

    postDataApi('inventory/edit', userEdit).then((data) => {
        if(data.success){ getInventory()}
    }).catch(err => console.log(err))

    setActionForm('add')
  }

  const addArticle = (newUser) => {
    postDataApi('inventory/add', newUser).then((data) => {
        if(data.success){ getInventory()}
    }).catch(err => console.log(err))
  }

  const getInventory = () => {
    getDataApi('inventory').then((data)=> {
      setRows(data);
    }).catch(err => {
        console.log(err);
    })
  }

  const openNew = () => {
    setBodyForm(bodySend)
    setActionForm('add')
    handleOpen()
  }

  useEffect(() => {
    getInventory()
  }, [])


  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.Code.toLowerCase().includes(filterText.toLowerCase()) ||
      row.Description.toLowerCase().includes(filterText.toLowerCase())
  );
  
  return (
    <div className="log">
      <Paper elevation={24} className="paperWidh">
        <div className="btnFilter">
          <div className="buttonBack">
            <Button variant="contained" onClick={goBack}>
              <ArrowBackIcon className="back" />
            </Button>
            <h1 className="font-semibold">
              <InventoryIcon className="groupIcon" />
              Inventario
            </h1>
          </div>

          <div className="inputFilter">
            <TextField
              label="Buscar..."
              className="filter"
              value={filterText}
              onChange={handleFilterChange}
            />

            <IconButton color="primary" aria-label="add" className='btnAdd' onClick={openNew}>
              <AddIcon/>
            </IconButton>
          </div>
        </div>

        <div className="tableContent">
          <TablaComponents
            rows={filteredRows}
            columns={columns}
            columnsName={columnsName}
            sendFather={getDataChild}
          />
        </div>

        <div className="modal">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
              <Fade in={openModal}>
                  <Box sx={style}>
                      <FormGenerator
                          title={'Agregar Articulo'}
                          dataForm={dataForm}
                          bodySend={bodyForm}
                          action={actionForm}
                          validationSchema={validationSchema}
                          sendFather={getDataChild}
                      />
                  </Box>
              </Fade>
          </Modal>
      </div>
      </Paper>
    </div>
  );
};
