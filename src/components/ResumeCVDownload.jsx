import React from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { FaFilePdf } from 'react-icons/fa';

const ResumeCVDownload = () => {
    const handleDownload = async () => {
        try {
            const resumeUrl = '/assets/RaizaKurniawan_Resume2025.pdf';
            const cvUrl = '/assets/RaizaKurniawan_CV2025.pdf';

            // Download Resume
            const resumeResponse = await axios.get(resumeUrl, {
                responseType: 'blob',
            });
            fileDownload(resumeResponse.data, 'RaizaKurniawan_Resume2025.pdf');

            // Add a delay before downloading the CV
            await new Promise(resolve => setTimeout(resolve, 1500)); // 1-second delay

            // Download CV
            const cvResponse = await axios.get(cvUrl, {
                responseType: 'blob',
            });
            fileDownload(cvResponse.data, 'RaizaKurniawan_CV2025.pdf');
        } catch (error) {
            console.log('Error downloading files:', error);
        }
    };

    return (
        <FaFilePdf title="Download Raiza Resume & CV" size = "24" onClick={handleDownload}>
            
        </FaFilePdf> 
    );
}

export default ResumeCVDownload;