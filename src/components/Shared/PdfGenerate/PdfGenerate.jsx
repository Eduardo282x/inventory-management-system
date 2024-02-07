import { Document, Text, Page, StyleSheet, Image } from "@react-pdf/renderer";
import logoFactura from '../../../assets/Logos/LogoPdf.png'

export const PdfGenerate = ({}) => {
    return (
        <Document className="pdfGenerate">
            <Page>
                <Image src={logoFactura}/>
                <Text>Generar PDF</Text>
                <Text>Generar Another</Text>
            </Page>
        </Document>
    )
}
