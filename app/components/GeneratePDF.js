import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { db } from '../lib/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const generatePDF = async (id, name) => {
    alert("Generating PDF...");

    const doc = new jsPDF();
    const titleText = 'ShareCare';
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    switch (id) {
        //Monthly Report
        case 1:
            doc.addImage("/reportfront.png", "PNG", 3, 3, 205, 292);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(70);
            doc.text('MONTHLY', 20, 110);
            doc.setTextColor(0, 102, 0);
            doc.text('REPORT', 20, 135);

            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(20);
            doc.text('1 - 30 November 2023', 20, 150);

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 102, 0);
            doc.text('Produced by:', 20, 230);

            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica');
            doc.setFontSize(16);
            doc.text('ShareCare: Food Distribution', 20, 240);
            doc.text('Management System', 20, 248);
            doc.text('Dashboard', 20, 256);

            doc.addPage("a4", "1");
            doc.addImage("/reportnovember2023.png", "PNG", 3, 3, 205, 292);

            doc.addPage("a4", "2");
            doc.addImage("/reportthankyou.png", "PNG", 3, 3, 205, 292);

            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        //Monthly Report
        case 2:
            doc.addImage("/reportfront.png", "PNG", 3, 3, 205, 292);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(70);
            doc.text('MONTHLY', 20, 110);
            doc.setTextColor(0, 102, 0);
            doc.text('REPORT', 20, 135);

            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(20);
            doc.text('1 - 31 Disember 2023', 20, 150);

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 102, 0);
            doc.text('Produced by:', 20, 230);

            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica');
            doc.setFontSize(16);
            doc.text('ShareCare: Food Distribution', 20, 240);
            doc.text('Management System', 20, 248);
            doc.text('Dashboard', 20, 256);

            doc.addPage("a4", "1");
            doc.addImage("/reportdecember2023.png", "PNG", 3, 3, 205, 292);

            doc.addPage("a4", "2");
            doc.addImage("/reportthankyou.png", "PNG", 3, 3, 205, 292);

            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        //Monthly Report
        case 3:
            doc.addImage("/reportfront.png", "PNG", 3, 3, 205, 292);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(70);
            doc.text('MONTHLY', 20, 110);
            doc.setTextColor(0, 102, 0);
            doc.text('REPORT', 20, 135);

            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(20);
            doc.text('1 - 31 January 2024', 20, 150);

            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 102, 0);
            doc.text('Produced by:', 20, 230);

            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica');
            doc.setFontSize(16);
            doc.text('ShareCare: Food Distribution', 20, 240);
            doc.text('Management System', 20, 248);
            doc.text('Dashboard', 20, 256);

            doc.addPage("a4", "1");
            doc.addImage("/reportnovember2023.png", "PNG", 3, 3, 205, 292);
            doc.addPage("a4", "2");
            doc.addImage("/reportthankyou.png", "PNG", 3, 3, 205, 292);

            doc.save(`MonthlyReport_${name}.pdf`);
            break;

        //List of Registered Vendor
        case 4: {
            // Retrieve the document from Firestore
            const q = query(collection(db, "users"), where("role", "==", "Vendor"));
            getDocs(q)
                .then((querySnapshot) => {
                    const data = [];

                    // Iterate over each document and add it to the data array
                    querySnapshot.forEach((doc) => {
                        console.log("Im here" + doc.data());
                        const { id, name, email, brn, address, phoneNumber } = doc.data();
                        data.push({ id, name, email, brn, address, phoneNumber });
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
                    const headers = [["Number", "ID", "Name", "Email", "Business Registration Number", "Address", "Phone Number"]];

                    // Create the table body from the fetched data
                    const body = data.map(({ id, name, email, brn, address, phoneNumber }, index) => [
                        index + 1,
                        id,
                        name,
                        email || "",
                        brn,
                        address,
                        phoneNumber
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
            const q = query(collection(db, "users"), where("role", "==", "Volunteer"));
            getDocs(q)
                .then((querySnapshot) => {
                    const data = [];

                    // Iterate over each document and add it to the data array
                    querySnapshot.forEach((doc) => {
                        const { id, name, email, phoneNumber, association } = doc.data();
                        data.push({ id, name, email, phoneNumber, association });
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
                    const headers = [["Number", "ID", "Name", "Email", "Phone Number", "Association"]];

                    // Create the table body from the fetched data
                    const body = data.map(({ id, name, email, phoneNumber, association }, index) => [
                        index + 1,
                        id,
                        name,
                        email,
                        phoneNumber,
                        association
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
            const q = query(collection(db, "users"), where("role", "==", "Student"));
            getDocs(q)
                .then((querySnapshot) => {
                    const data = [];

                    querySnapshot.forEach((doc) => {
                        const { id, name, email } = doc.data();
                        data.push({ id, name, email });
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

                    const headers = [["Number", "ID", "Name", "Email"]];

                    const body = data.map(({ id, name, email }, index) => [
                        index + 1,
                        id,
                        name,
                        email
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
            const q = query(collection(db, "users"), where("role", "==", "Volunteer"));
            getDocs(q)
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