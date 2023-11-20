import { TablaComponents } from "../Shared/Table/TablaComponents";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import "./inventory.css";

export const Inventory = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  function createData(code, description, axis, aloj, height, amount, price) {
    return { code, description, axis, aloj, height, amount, price };
  }

  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const rows = [
    createData(
      "0-01135-BRGS V",
      "RENAULT CIGUEÑAL TRASERO -FIAT 131-IVECO",
      "70",
      "90",
      "10",
      "12",
      "6.21"
    ),
    createData(
      "0-01764",
      "FORD CORCEL 2002 RUEDA DELANTERA/CORCEL",
      "46.23",
      "65.53",
      "7.37",
      "244",
      "2.73"
    ),
    createData(
      "0-018",
      "SELLO COMPRESOR CUMMINS HOLSET MOD.NVO.",
      "18",
      "25.5",
      "3",
      "12",
      "1.69"
    ),
    createData(
      "0-02005",
      "FIAT CIGUEÑAL DELANTERO UNO /147/1.3",
      "40",
      "56",
      "7.6",
      "3",
      "2.22"
    ),
    createData(
      "0-020604R1",
      "AGRICOLA-PIÑON DE ATAQUE/APL359 MF680",
      "39",
      "60",
      "18",
      "6",
      "9.67"
    ),
  ];

  const columns = [
    "Codigo",
    "Descripción",
    "Eje",
    "Aloj",
    "Altura",
    "Cantidad",
    "Precio",
    "Editar",
  ];
  const columnsName = [
    {
      column: "code",
      type: "string",
    },
    {
      column: "description",
      type: "string",
    },
    {
      column: "axis",
      type: "mm",
    },
    {
      column: "aloj",
      type: "mm",
    },
    {
      column: "height",
      type: "mm",
    },
    {
      column: "amount",
      type: "string",
    },
    {
      column: "price",
      type: "price",
    },
  ];

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
