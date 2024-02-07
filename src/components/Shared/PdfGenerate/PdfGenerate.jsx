import { Document, Text, View, Page, StyleSheet, Image  } from "@react-pdf/renderer";
import PropTypes from "prop-types";
import logoFactura from '../../../assets/Logos/LogoPdf.png';
import { columns, columnsName } from './PdfGenerate.data';
import { TablaComponents } from "../Table/TablaComponents";
import moment from 'moment';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    columns:{
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '1200px',
        gap: '10px'
    },
    rowCustom:{
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth:'2px',
        color:'red',
        margin:10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

export const PdfGenerate = ({ client, details }) => {
    const parseDate = (date) => {
        const parsedDate = moment(date);
        const formattedDate = parsedDate.format('DD/MM/YYYY');
        return formattedDate;
    };

    return (
        <Document className="pdfGenerate">
            <Page size={"A4"} >
                <View style={styles.section}>
                    {/* <Image src={logoFactura} /> */}
                    <Text>INVERSIONES INDUSTRIALES 2017,C.A</Text>
                    <Text>N° {String(details[0].IdSales).padStart(7, '0')}</Text>
                    <Text>Fecha {parseDate(details[0].DateSale)}</Text>
                    <Text>Fecha {parseDate(details[0].DateSale)}</Text>☻
                </View>
                <View>
                    <Text>VENDEDOR: {`${details[0].Name} ${details[0].Lastname}`}</Text>
                    <Text>CLIENTE: {`${client.Name} ${client.Lastname}`}</Text>
                    <Text>RIF: {client.Identify}</Text>
                    <Text>DOMICILIO: {client.Address}</Text>
                    <Text>TELEFONO: {client.Phone}</Text>
                </View>

                <View>
                    <Text style={styles.columns}>
                        {columns.map(col => (
                            <Text style={styles.rowCustom}>{col}</Text>
                        ))}
                    </Text>
                    {/* <TablaComponents columns={columns} columnsName={columnsName} rows={details} /> */}
                </View>

                <View>
                    <Text>Total {details[0].TotalFacture}$</Text>
                </View>
            </Page>
        </Document>
    )
}

PdfGenerate.propTypes = {
    client: PropTypes.any,
    details: PropTypes.array,
};