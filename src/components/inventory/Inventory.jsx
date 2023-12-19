import { TablaComponents } from "../Shared/Table/TablaComponents";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import { columns, rows, columnsName } from "./inventory.data";
import "./inventory.css";

export const Inventory = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.code.toLowerCase().includes(filterText.toLowerCase()) ||
      row.description.toLowerCase().includes(filterText.toLowerCase())
    // row.axis.toLowerCase().includes(filterText.toLowerCase()) ||
    // row.height.includes(filterText) ||
    // row.amount.includes(filterText) ||
    // row.price.includes(filterText)
  );
  
  return (
    <div className="log">
      <Paper elevation={24} className="paperWidh">
        <div className="btnFilter">
          <div className="buttonBack">
            <Button variant="contained" onClick={goBack}>
              <ArrowBackIcon className="back" />
            </Button>
            <h1>
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
