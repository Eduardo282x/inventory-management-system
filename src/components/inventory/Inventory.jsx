import {
  InventoryIcon,
  ShoppingCartIcon,
  ArrowBackIcon,
  AddIcon,
  IconButton,
  Button,
  TextField,
  Paper,
  Backdrop,
  Snackbar,
  Box,
  Modal,
  Fade,
  DownloadIcon,
} from "../materialUI";
import {
  style,
  dataFormAdmin,
  dataFormSeller,
  validationSchemaAdmin,
  bodySend,
} from "./inventory.data";
import { FormGenerator } from "../Shared/FormGenerator/FormGenerator";
import { columns, columnsName } from "./inventory.data";
import { getDataApi, postDataApi } from "../../backend/BasicAxios";
import { TablaComponents } from "../Shared/Table/TablaComponents";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import axios from '../../env/axios-instance';

import "./inventory.css";

export const Inventory = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [userRol, setUserRol] = useState("");
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [actionForm, setActionForm] = useState("add");
  const [messageResponse, setMessageResponse] = useState("");
  const [actionTable, setActionTable] = useState("Edit");
  const [columnsInventory, setColumns] = useState(columns);
  const [validationSchema, setValidationSchema] = useState(
    validationSchemaAdmin
  );
  const [columnsInventoryName, setColumnsName] = useState(columnsName);
  const [bodyForm, setBodyForm] = useState(bodySend);
  const [dataSendForm, setdataSendForm] = useState(dataFormAdmin);
  const [openModal, setOpenModal] = useState(false);
  const [openSnak, setOpenSnak] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [filterText, setFilterText] = useState("");

  const getABC = async () => {
    try {
      const response = await axios.get('/inventory/abc', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'InventarioABC.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnak(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goCart = () => {
    navigate("/cart");
  };

  const getDataChild = (data) => {
    if (data.action == "add") {
      handleClose();
      addArticle(data.data);
    }

    if (data.action == "edit") {
      handleClose();
      editArticle(data.data);
    }

    if (data.action == "editSeller") {
      handleClose();
      addArticleCart(data.data);
    }

    if (data.action == "get") {
      if (userData.Rol == "Administrador") {
        const dataEdit = {
          IdCode: data.data.IdCode,
          Code: data.data.Code,
          Description: data.data.Description,
          Axis: data.data.Axis,
          Aloj: data.data.Aloj,
          Height: data.data.Height,
          Amount: data.data.Amount,
          Price: data.data.Price,
        };
        setdataSendForm(dataFormAdmin);
        setValidationSchema(validationSchemaAdmin);
        setActionForm("edit");
        setBodyForm(dataEdit);
        handleOpen();
      } else {
        const dataEdit = {
          IdSheller: userData.Id,
          IdCode: data.data.IdCode,
          Code: data.data.Code,
          Description: data.data.Description,
          Axis: data.data.Axis,
          Aloj: data.data.Aloj,
          Height: data.data.Height,
          Amount: 0,
          Price: data.data.Price,
        };

        const validationSchemaSheller = yup.object({
          Code: yup.string().required("Este campo es requerido"),
          Description: yup.string().required("Este campo es requerido"),
          Amount: yup
            .number()
            .max(
              data.data.Amount,
              "La cantidad ingresada supera su existencia."
            )
            .required("Este campo es requerido"),
          Price: yup.string().required("Este campo es requerido"),
        });

        setValidationSchema(validationSchemaSheller);
        setdataSendForm(dataFormSeller);
        setActionForm("editSeller");
        setBodyForm(dataEdit);
        handleOpen();
      }
    }
  };
  const editArticle = (userEdit) => {
    handleClose();

    postDataApi("inventory/edit", userEdit)
      .then((data) => {
        if (data.success) {
          setOpenSnak(true);
          setMessageResponse(data.message);
          getInventory();
        }
      })
      .catch((err) => console.log(err));

    setActionForm("add");
  };
  const addArticle = (newUser) => {
    postDataApi("inventory/add", newUser)
      .then((data) => {
        if (data.success) {
          setOpenSnak(true);
          setMessageResponse(data.message);
          getInventory();
        }
      })
      .catch((err) => console.log(err));
  };

  const addArticleCart = (article) => {
    postDataApi("cart/add", article)
      .then((data) => {
        if (data.success) {
          setOpenSnak(true);
          setMessageResponse(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const getInventory = () => {
    getDataApi("inventory")
      .then((data) => {
        setRows(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openNew = () => {
    setBodyForm(bodySend);
    setActionForm("add");
    handleOpen();
  };

  useEffect(() => {
    changeColumn();
    getInventory();
  }, []);

  const changeColumn = () => {
    setUserRol(userData.Rol);
    if (userData.Rol != "Administrador") {
      const newColumn = [...columns];
      const newColumnName = [...columnsName];
      const changeColumnAdd = {
        column: "Agregar",
        type: "icon",
        icon: "Add",
        action: "get",
      };
      newColumn[newColumn.length - 1] = "Agregar";
      newColumnName[newColumnName.length - 1] = changeColumnAdd;
      setColumns(newColumn);
      setActionTable("Add");
      setColumnsName(newColumnName);
    }
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    if (rows && rows.length > 0) {
      const filteredRows = rows.filter(
        (row) =>
          row.Code.toLowerCase().includes(filterText.toLowerCase()) ||
          row.Description.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredRows(filteredRows);
    }
  }, [rows, filterText]);

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

            {userRol == "Administrador" ? (
              <div className="flex">
                <IconButton
                  color="primary"
                  className="btnAdd"
                  onClick={openNew}
                >
                  <AddIcon />
                </IconButton>
                <Button onClick={getABC} variant="contained" color="success" endIcon={<DownloadIcon />}>
                  ABC
                </Button>
              </div>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                className="goingCart"
                onClick={goCart}
                endIcon={<ShoppingCartIcon />}
              >
                Ir al carrito
              </Button>
            )}
          </div>
        </div>

        <div className="tableContent">
          {rows && filteredRows.length > 0 ? (
            <TablaComponents
              rows={filteredRows}
              columns={columnsInventory}
              columnsName={columnsInventoryName}
              action={actionTable}
              sendFather={getDataChild}
            />
          ) : (
            <div className="mt-10">No se encuentran articulos disponibles</div>
          )}
        </div>

        <Snackbar
          open={openSnak}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnack}
          message={messageResponse}
        // action={action}
        />

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
                  title={"Agregar Articulo"}
                  dataForm={dataSendForm}
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
