import { TablaComponents } from "../Shared/Table/TablaComponents";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { columns, columnsName } from "./inventory.data";
import { getDataApi } from "../../backend/BasicAxios";
import "./inventory.css";

export const Inventory = () => {
  const navigate = useNavigate();
  const [rows,setRows] = useState([])
  const [filterText, setFilterText] = useState("");


  const goBack = () => {
    navigate(-1);
  };

  const getInventory = () => {
    getDataApi('inventory').then((data)=> {
      setRows(data);
    }).catch(err => {
        console.log(err);
    })
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
          </div>
        </div>

        <div className="tableContent">
          <TablaComponents
            rows={filteredRows}
            columns={columns}
            columnsName={columnsName}
          />
        </div>
      </Paper>
    </div>
  );
};
