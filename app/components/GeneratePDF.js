import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { db } from '../lib/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

export const generatePDF = async (id, name) => {
    alert("Generating PDF...");

    const doc = new jsPDF();
    const titleText = 'ShareCare';
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    switch (id) {
        //Monthly Report
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

        //Monthly Report
        case 2:
            doc.text(`You are producing a monthly report of December 2023 which is document ${name}`, 10, 10);
            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        //Monthly Report
        case 3:
            doc.text(`You are producing a monthly report of November 2024 which is document ${name}`, 10, 10);
            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        //List of Registered Vendor
        case 4: {
            // Retrieve the document from Firestore
            getDocs(collection(db, "uservendor"))
                .then((querySnapshot) => {
                    const data = [];

                    // Iterate over each document and add it to the data array
                    querySnapshot.forEach((doc) => {
                        const { vendorname, businesstype, district, registrationdate } = doc.data();
                        data.push({ vendorname, businesstype, district, registrationdate });
                    });

                    // Set the font size and type
                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");

                    // Set the title text and position
                    const titleText = "ShareCare";
                    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
                    doc.text(titleText, titleX, 10);

                    // Set the name text and position
                    const nameText = "List of Registered Vendor";
                    const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const nameX = (doc.internal.pageSize.getWidth() - nameWidth) / 2;
                    doc.text(nameText, nameX, 15);

                    // Set the font size and type for the table content
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");

                    // Create the table headers
                    const headers = [["Name", "Business Type", "District", "Registration Date"]];

                    // Create the table body from the fetched data
                    const body = data.map(({ vendorname, businesstype, district, registrationdate }) => [
                        vendorname,
                        businesstype,
                        district || "",
                        registrationdate ? new Date(registrationdate.toDate()).toLocaleDateString() : ""
                    ]);

                    // Set the startY position for the table
                    const startY = 30;

                    // Draw the table using autoTable plugin
                    doc.autoTable({
                        head: headers,
                        body: body,
                        startY: startY,
                        headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
                    });

                    // Set the font size and type for the footer text
                    doc.setFont("helvetica", "italic");
                    doc.setFontSize(10);

                    // Add the generated date to the footer
                    doc.text("Generated on: " + new Date().toDateString(), doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: "right" });

                    // Save the PDF
                    doc.save(`${name}.pdf`);
                })
                .catch((error) => {
                    console.log("Error fetching data from Firestore:", error);
                });
            break;

            //List of Registered Volunteer
        } case 5: {
            getDocs(collection(db, "uservolunteer"))
                .then((querySnapshot) => {
                    const data = [];

                    // Iterate over each document and add it to the data array
                    querySnapshot.forEach((doc) => {
                        const { volunteername, association, district, registrationdate } = doc.data();
                        data.push({ volunteername, association, district, registrationdate });
                    });

                    // Set the font size and type
                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");

                    // Set the title text and position
                    const titleText = "ShareCare";
                    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
                    doc.text(titleText, titleX, 10);

                    // Set the name text and position
                    const nameText = "List of Registered Volunteer";
                    const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const nameX = (doc.internal.pageSize.getWidth() - nameWidth) / 2;
                    doc.text(nameText, nameX, 15);

                    // Set the font size and type for the table content
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");

                    // Create the table headers
                    const headers = [["Name", "Business Type", "District", "Registration Date"]];

                    // Create the table body from the fetched data
                    const body = data.map(({ volunteername, association, district, registrationdate }) => [
                        volunteername,
                        association,
                        district || "",
                        registrationdate ? new Date(registrationdate.toDate()).toLocaleDateString() : ""
                    ]);

                    // Set the startY position for the table
                    const startY = 30;

                    // Draw the table using autoTable plugin
                    doc.autoTable({
                        head: headers,
                        body: body,
                        startY: startY,
                        headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
                    });

                    // Set the font size and type for the footer text
                    doc.setFont("helvetica", "italic");
                    doc.setFontSize(10);

                    // Add the generated date to the footer
                    doc.text("Generated on: " + new Date().toDateString(), doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: "right" });

                    // Save the PDF
                    doc.save(`${name}.pdf`);
                })
                .catch((error) => {
                    console.log("Error fetching data from Firestore:", error);
                });
            break;

            //List of Registered Student
        } case 6: {
            getDocs(collection(db, "userstudent"))
                .then((querySnapshot) => {
                    const data = [];

                    querySnapshot.forEach((doc) => {
                        const { studentname, email, checkpoint } = doc.data();
                        data.push({ studentname, email, checkpoint });
                    });

                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");

                    const titleText = "ShareCare";
                    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
                    doc.text(titleText, titleX, 10);

                    const nameText = "List of Registered Student";
                    const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const nameX = (doc.internal.pageSize.getWidth() - nameWidth) / 2;
                    doc.text(nameText, nameX, 15);

                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");

                    const headers = [["Name", "Email", "Checkpoint"]];

                    const body = data.map(({ studentname, email, checkpoint }) => [
                        studentname,
                        email,
                        checkpoint || ""
                    ]);

                    const startY = 30;

                    doc.autoTable({
                        head: headers,
                        body: body,
                        startY: startY,
                        headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
                    });

                    doc.setFont("helvetica", "italic");
                    doc.setFontSize(10);

                    doc.text("Generated on: " + new Date().toDateString(), doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: "right" });

                    doc.save(`${name}.pdf`);
                })
                .catch((error) => {
                    console.log("Error fetching data from Firestore:", error);
                });
            break;
            //List of Association
        } case 7: {
            const associationCount = new Map();
            getDocs(collection(db, "uservolunteer"))
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const associationName = doc.data().association;
                        console.log(associationName);
                        if (associationCount.has(associationName)) {
                            associationCount.set(associationName, associationCount.get(associationName) + 1);
                        } else {
                            associationCount.set(associationName, 1);
                        }
                    });

                    const doc = new jsPDF();

                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");

                    const titleText = "ShareCare";
                    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
                    doc.text(titleText, titleX, 10);

                    const nameText = "List of Associations";
                    const nameWidth = doc.getStringUnitWidth(nameText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
                    const nameX = (doc.internal.pageSize.getWidth() - nameWidth) / 2;
                    doc.text(nameText, nameX, 15);

                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");

                    const headers = [["Association", "Total Volunteers"]];
                    const body = Array.from(associationCount.entries()).map(([association, count]) => [association, count]);

                    const startY = 30;

                    doc.autoTable({
                        head: headers,
                        body: body,
                        startY: startY,
                        headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] }
                    });

                    doc.setFont("helvetica", "italic");
                    doc.setFontSize(10);

                    doc.text("Generated on: " + new Date().toDateString(), doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10, { align: "right" });

                    doc.save(`${name}.pdf`);
                }).catch((error) => {
                    console.log("Error fetching data from Firestore:", error);
                });
            break;

        } default:
            break;
    }
};