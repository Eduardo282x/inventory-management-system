function createData(code, description, axis, aloj, height, amount, price) {
    return { code, description, axis, aloj, height, amount, price };
}
export const rows = [
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

export const columns = [
    "Codigo",
    "Descripción",
    "Eje",
    "Aloj",
    "Altura",
    "Cantidad",
    "Precio",
    "Editar",
];
export const columnsName = [
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