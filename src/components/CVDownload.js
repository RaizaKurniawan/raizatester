import { React } from 'react';
import { jsPDF } from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';

const CVDownload = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('Poppins', 'normal');

    let yPos = 20;

    // Header  // Job Title
    doc.setFontSize(24);
    doc.text('Raiza Indra Kurniawan', 105, yPos, { align: 'center'});
    yPos += 8;
    doc.setFontSize(12);
    doc.text('Senior QA Software Tester', 105, yPos, { align: 'center'})
    yPos += 5;

    // Horizon Line
    doc.setLineWidth(0.1);
    doc.line(20, yPos, 190, yPos);
    yPos += 5;
    // address
    doc.setFontSize(12);
    doc.text('Jl. Bio Farma III No. 1C, Andir - Campaka, Bandung - Indonesia. \n Phone 081224221110. Website: https://raiza.my.id/', 105, yPos, {align: 'center'});
    yPos += 8;

    // Summary Me Section
    doc.setDrawColor(0, 0, 255);
    doc.setFillColor(230, 230, 255);
    doc.rect(20, yPos, 170, 10, 'F');
    yPos += 7;
    doc.setFontSize(14);
    doc.text('Summary', 105, yPos, { align: 'center' });
    yPos += 9;
    doc.setFontSize(12);
    doc.text("Hi! I'm Raiza Kurniawan, a passionate QA Engineer dedicated to building high-quality, scalable applications. With a background in software testing and automation, I focus on ensuring that applications run smoothly and meet user expectations.", 
        25, yPos, { maxWidth: 160, align: 'left' });
        yPos += 17;
    // Experiences Section
    doc.setFontSize(14);
    doc.setFillColor(230, 230, 255);
    doc.rect(20, yPos, 170, 10, 'F');
    yPos += 7;
    doc.text('Experience', 105, yPos, { align: 'center' });
    doc.setFontSize(12);
    yPos += 10;
    doc.text('1. Web3 Lead QA Engineer - Confiction Labs. (2022 - Current)', 25, yPos);
    yPos += 6;
    doc.text('   Responsible for ensuring Web3 products quality and functionality.', 27, yPos);
    yPos += 6;
    doc.text('   Key Tasks:', 27, yPos);
    yPos += 6;
    doc.text('     - Created Test Plan and Developed Test Scenario.', 30, yPos);
    yPos += 6;
    doc.text('     - Performed manual and automated testing: Smoke, API, Security, etc.', 30, yPos);
    yPos += 6;
    doc.text('     - Managed QA team and ensured Blockchain transaction accuracy.', 30, yPos);
    yPos += 6;
    doc.text('2. Senior Quality Assurance - Agate. (2022 - Current)', 25, yPos);
    yPos += 6;
    doc.text('   Developed standardized API testing practices.', 27, yPos);
    yPos += 6;
    doc.text('   Key Tasks:', 27, yPos);
    yPos += 6;
    doc.text('     - API Testing Standardization and Security Testing.', 30, yPos); yPos += 6;
    doc.text('     - Performed API performance and stress tests.', 30, yPos); yPos += 6;
    doc.text('     - Built automated API tests with specialized tools.', 30, yPos); 
    yPos += 6;
    doc.text('3. Associate QA Software - BenihBaik.com (2022 - 2023)', 25, yPos); yPos += 6;
    doc.text('   Ensured mobile and desktop platform quality.', 27, yPos); yPos += 6;
    doc.text('   Key Tasks:', 27, yPos); yPos += 6;
    doc.text('     - Designed test cases and conducted tests: Smoke, Regression.', 30, yPos); yPos += 6;
    doc.text('     - Built and executed automation test scenarios using Cypress.', 30, yPos); 
    yPos += 10;
     
    // Projects Section
    doc.setFontSize(14);
    doc.setFillColor(230, 230, 255);
    doc.rect(20, yPos, 170, 10, 'F'); yPos += 7;
    doc.text('QA Projects Related', 105, yPos, { align: 'center' }); yPos += 9;
    doc.setFontSize(12);
    doc.text('1. Lets Flip (Android and iOS app Tester) Project Based (3 Months)', 25, yPos); yPos += 6;
    doc.text('   - Tested apps for functionality, usability, and performance.', 27, yPos); yPos += 6;
    doc.text('2. Paron Indonesia (e-Commerce QA Tester) 2021 - 2022', 25, yPos); yPos += 6;
    doc.text('   - Focused on payment systems, product listings, and user experience.', 27, yPos);
    yPos += 11;

    if (yPos > 240) {
        doc.addPage();
        yPos = 20;
      }

    // Achievements Section
    doc.setFontSize(14);
    doc.setFillColor(230, 230, 255);
    doc.rect(20, yPos, 170, 10, 'F');yPos += 7;
    doc.text('Achievements', 105, yPos, { align: 'center' });yPos += 9;
    doc.setFontSize(12);
    doc.text('1. Database Destruction Discovery (2010)', 25, yPos);yPos += 6;
    doc.text('   - Uncovered a hospital\'s database destruction via network scanning (RS Mitra Kasih, Cimahi).', 27, yPos);yPos += 6;
    doc.text('2. The Best Employee (3 times, 2019)', 25, yPos);yPos += 6;
    doc.text('   - Awarded "The Best Employee" 3 times consecutively in one year (Integral, Jakarta).', 27, yPos);yPos += 6;
    doc.text('3. The Best Employee Performance (2022)', 25, yPos);yPos += 6;
    doc.text('   - Awarded "The Best Employee Performance" (Agate, Bandung).', 27, yPos);
    yPos += 17;

    // Tools Section
    doc.setFontSize(14);
    doc.setFillColor(230, 230, 255);
    doc.rect(20, yPos, 170, 10, 'F'); yPos += 7;
    doc.text('Tools I Use', 105, yPos, { align: 'center' }); yPos += 9;
    doc.setFontSize(12);
    doc.text('1. Selenium IDE - Automation testing for web applications.', 25, yPos); yPos += 6;
    doc.text('2. Postman - API testing and collaboration tool.', 25, yPos); yPos += 6;
    doc.text('3. JMeter - Performance and load testing tool.', 25, yPos); yPos += 6;
    doc.text('4. MochaJS - API automation testing.', 25, yPos); yPos += 6;
    doc.text('5. Cypress - End to End testing.', 25, yPos); yPos += 6;
    doc.text('6. Burp Suite - Basic Security Test.', 25, yPos); 
    yPos += 17;

    // Contact Section
    doc.setFontSize(14);
    doc.setFillColor(230, 230, 255); 
    doc.rect(20, yPos, 170, 10, 'F'); yPos += 7;
    doc.text('Contact', 105, yPos, { align: 'center' }); yPos += 9;
    doc.setFontSize(12);
    doc.text('Email: raizakurniawan@gmail.com', 25, yPos); yPos += 6;
    doc.text('LinkedIn: https://www.linkedin.com/in/raiza-kurniawan/', 25, yPos); yPos += 6;
    doc.text('GitHub: https://github.com/RaizaKurniawan', 25, yPos);

    // Save the PDF
    doc.save('Raiza_Kurniawan_CV.pdf');
  };

  return (
    
      <FaFilePdf title = "Download Raiza CV" size = "24" onClick={generatePDF}>

      </FaFilePdf>
    
  );
};

export default CVDownload;
