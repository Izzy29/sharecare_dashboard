import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = async (id, name) => {
    alert("Generating PDF...");

    const doc = new jsPDF();
    const titleText = 'ShareCare';
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    switch (id) {
        case 1:
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.text('Monthly Report', 105, 20, { align: 'center' });
            doc.text(name, 105, 30, { align: 'center' });

            doc.setFontSize(12);
            doc.text(`You are producing a monthly report of November 2023 which is document ${name}`, 20, 40, { align: 'left' });

            doc.setFontSize(12);
            doc.text('Report Content:', 20, 60, { underline: true });

            doc.setFontSize(12);
            doc.text('- Sales data', 40, 80, { indent: 20 });
            doc.text('- Marketing analysis', 40, 95, { indent: 20 });
            doc.text('- Financial summary', 40, 110, { indent: 20 });

            doc.setFontSize(12);
            doc.text('Please review the attached monthly report for more details.', 20, 130, { align: 'left' });

            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text('Generated on: ' + new Date().toDateString(), pdfWidth - 10, pdfHeight - 10, { align: 'right' });
            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        case 2:
            doc.text(`You are producing a monthly report of December 2023 which is document ${name}`, 10, 10);
            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        case 3:
            doc.text(`You are producing a monthly report of November 2024 which is document ${name}`, 10, 10);
            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        case 4: {
            const nameText = `${name}`;
            const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;

            const titleX = (pdfWidth - titleWidth) / 2;
            const nameX = (pdfWidth - nameWidth) / 2;

            const data = [
                { names: 'Mariott Hotel', businessType: 'Hotel', district: 'Putrajaya', registrationDate: '2024-01-01' },
                { names: 'ABC Restaurants', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2023-05-15' },
                { names: 'Green Gardens', businessType: 'Hotel', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Tesco Kajang', businessType: 'Supermarket', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'PKS Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Umai Cafe', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2022-11-20' },
                { names: 'Lucky Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
            ];
            const headers = [['Name', 'Business Type', 'District', 'Registration Date']];
            const body = data.map(({ names, businessType, district, registrationDate }) => [names, businessType, district || '', registrationDate || '']);

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(titleText, titleX, 10);
            doc.text(nameText, nameX, 15);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.autoTable({
                head: headers,
                body: body,
                startY: 30,
                headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set the fill color of the table header to black
            });
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text('Generated on: ' + new Date().toDateString(), pdfWidth - 10, pdfHeight - 10, { align: 'right' });
            doc.save(`${name}.pdf`);
            break;

        } case 5: {
            const nameText = `${name}`;
            const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;

            const titleX = (pdfWidth - titleWidth) / 2;
            const nameX = (pdfWidth - nameWidth) / 2;

            const data = [
                { names: 'Mariott Hotel', businessType: 'Hotel', district: 'Putrajaya', registrationDate: '2024-01-01' },
                { names: 'ABC Restaurants', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2023-05-15' },
                { names: 'Green Gardens', businessType: 'Hotel', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Tesco Kajang', businessType: 'Supermarket', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'PKS Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Umai Cafe', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2022-11-20' },
                { names: 'Lucky Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
            ];
            const headers = [['Name', 'Business Type', 'District', 'Registration Date']];
            const body = data.map(({ names, businessType, district, registrationDate }) => [names, businessType, district || '', registrationDate || '']);

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(titleText, titleX, 10);
            doc.text(nameText, nameX, 15);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.autoTable({
                head: headers,
                body: body,
                startY: 30,
                headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set the fill color of the table header to black
            });
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text('Generated on: ' + new Date().toDateString(), pdfWidth - 10, pdfHeight - 10, { align: 'right' });
            doc.save(`${name}.pdf`);
            break;

        } case 6: {
            const nameText = `${name}`;
            const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;

            const titleX = (pdfWidth - titleWidth) / 2;
            const nameX = (pdfWidth - nameWidth) / 2;

            const data = [
                { names: 'Mariott Hotel', businessType: 'Hotel', district: 'Putrajaya', registrationDate: '2024-01-01' },
                { names: 'ABC Restaurants', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2023-05-15' },
                { names: 'Green Gardens', businessType: 'Hotel', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Tesco Kajang', businessType: 'Supermarket', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'PKS Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Umai Cafe', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2022-11-20' },
                { names: 'Lucky Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
            ];
            const headers = [['Name', 'Business Type', 'District', 'Registration Date']];
            const body = data.map(({ names, businessType, district, registrationDate }) => [names, businessType, district || '', registrationDate || '']);

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(titleText, titleX, 10);
            doc.text(nameText, nameX, 15);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.autoTable({
                head: headers,
                body: body,
                startY: 30,
                headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set the fill color of the table header to black
            });
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text('Generated on: ' + new Date().toDateString(), pdfWidth - 10, pdfHeight - 10, { align: 'right' });
            doc.save(`${name}.pdf`);
            break;

        } case 7: {
            const nameText = `${name}`;
            const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;

            const titleX = (pdfWidth - titleWidth) / 2;
            const nameX = (pdfWidth - nameWidth) / 2;

            const data = [
                { names: 'Mariott Hotel', businessType: 'Hotel', district: 'Putrajaya', registrationDate: '2024-01-01' },
                { names: 'ABC Restaurants', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2023-05-15' },
                { names: 'Green Gardens', businessType: 'Hotel', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Tesco Kajang', businessType: 'Supermarket', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'PKS Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
                { names: 'Umai Cafe', businessType: 'Restaurant', district: 'Kuala Lumpur', registrationDate: '2022-11-20' },
                { names: 'Lucky Restaurant', businessType: 'Restaurant', district: 'Selangor', registrationDate: '2022-11-20' },
            ];
            const headers = [['Name', 'Business Type', 'District', 'Registration Date']];
            const body = data.map(({ names, businessType, district, registrationDate }) => [names, businessType, district || '', registrationDate || '']);

            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(titleText, titleX, 10);
            doc.text(nameText, nameX, 15);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.autoTable({
                head: headers,
                body: body,
                startY: 30,
                headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }, // Set the fill color of the table header to black
            });
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text('Generated on: ' + new Date().toDateString(), pdfWidth - 10, pdfHeight - 10, { align: 'right' });
            doc.save(`${name}.pdf`);
            break;

        } default:
            break;
    }
};