// import React, { useState, useRef } from 'react';
// import Sidebar from './Sidebar';
// import Retail from './Retail';
// import './Dashboard.css';
// import cors from 'cors';
// import { FiUpload, FiMessageCircle, FiDownload } from 'react-icons/fi';

// const Dashboard = () => {
//   const [customerId, setCustomerId] = useState('');
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [activeItem, setActiveItem] = useState('Home');
//   const fileInputRef = useRef(null);

//   const kpiData = [
//     { value: '1500', label: 'Total Customers' },
//     { value: '4500', label: 'Total Transactions' },
//     { value: '750', label: 'Total Retails' },
//     { value: '340', label: 'Total Trades' }
//   ];

//   const handleUploadClick = () => fileInputRef.current.click();
//   const handleFileChange = async (event) => {
//   const files = event.target.files;
//   if (!files || files.length === 0) return;

//   setUploadStatus('Uploading...');

//   try {
//     const formData = new FormData();
//     // Append all selected files
//     for (let i = 0; i < files.length; i++) {
//       formData.append('file', files[i]);
//     }

//     const response = await fetch('http://127.0.0.1:5001/preprocess/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       // Assuming API returns { job_id, status_url }
//       setUploadStatus(
//         `✅ Uploaded successfully! Job ID: ${data.job_id}, Status URL: ${data.status_url}`
//       );
//     } else {
//       const errText = await response.text();
//       setUploadStatus(`❌ Upload failed: ${errText}`);
//     }
//   } catch (error) {
//     console.error(error);
//     setUploadStatus('❌ Upload failed. Please try again.');
//   }
// };


//   const handleDownloadReport = () => {
//     if (!customerId) return alert('Please enter a Customer ID first');

//     const reportData = {
//       customerId,
//       generatedAt: new Date().toISOString(),
//       reportType: 'Customer Report'
//     };

//     const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `customer-report-${customerId}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const renderContent = () => {
//     switch (activeItem) {
//       case 'RETAIL':
//         return <Retail />;
//       default:
//         return (
//           <>
//             <h1 className="dashboard-title">📊 {activeItem} Dashboard</h1>

//             <div className="dashboard-header">
//               <div className="upload-section">
//                 <button className="upload-button" onClick={handleUploadClick}>
//                   <FiUpload className="upload-icon enlarged-icon" />
//                   Upload
//                 </button>
//                <input
//   type="file"
//   ref={fileInputRef}
//   onChange={handleFileChange}
//   accept="*/*"
//   multiple
//   style={{ display: 'none' }}
// />

//                 {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
//               </div>
//             </div>

//             <div className="upload-note">
//               <p>📋 <b>Tip:</b> Upload the Master DB file before proceeding.</p>
//             </div>

//             <div className="kpi-section">
//               <div className="kpi-grid">
//                 {kpiData.map((kpi, index) => (
//                   <div key={index} className="kpi-card">
//                     <div className="kpi-value">{kpi.value}</div>
//                     <div className="kpi-label">{kpi.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="input-section">
//               <div className="input-card">
//                 <div className="input-row">
//                   <input
//                     type="text"
//                     placeholder="Enter Customer ID"
//                     value={customerId}
//                     onChange={(e) => setCustomerId(e.target.value)}
//                     className="customer-input"
//                   />
//                   <button className="download-button" onClick={handleDownloadReport}>
//                     <FiDownload className="download-icon enlarged-icon" />
//                     Download Report
//                   </button>
//                 </div>
//                 <button className="chatbot-button">
//                   <FiMessageCircle className="chatbot-icon enlarged-icon" />
//                   Chatbot
//                 </button>
//               </div>
//             </div>
//           </>
//         );
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
//       <main className="dashboard">{renderContent()}</main>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import Retail from './Retail';
import './Dashboard.css';
import { FiUpload, FiMessageCircle, FiDownload } from 'react-icons/fi';

const Dashboard = () => {
  const [customerId, setCustomerId] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [activeItem, setActiveItem] = useState('Home');
  const fileInputRef = useRef(null);

  const kpiData = [
    { value: '1500', label: 'Total Customers' },
    { value: '4500', label: 'Total Transactions' },
    { value: '750', label: 'Total Retails' },
    { value: '340', label: 'Total Trades' }
  ];

  // Trigger file input
  const handleUploadClick = () => fileInputRef.current.click();

  // Handle file uploads
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }

      const response = await fetch('http://127.0.0.1:5001/preprocess/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // API returns { job_id, status_url }
        setUploadStatus(`✅ Uploaded successfully! Job ID: ${data.job_id}, Status URL: ${data.status_url}`);
      } else {
        const errText = await response.text();
        setUploadStatus(`❌ Upload failed: ${errText}`);
      }
    } catch (error) {
      console.error(error);
      setUploadStatus('❌ Upload failed. Please try again.');
    }
  };

  // Download customer report
  const handleDownloadReport = () => {
    if (!customerId) return alert('Please enter a Customer ID first');

    const reportData = {
      customerId,
      generatedAt: new Date().toISOString(),
      reportType: 'Customer Report'
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customer-report-${customerId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render main content based on active sidebar item
  const renderContent = () => {
    if (activeItem === 'RETAIL') return <Retail />;

    return (
      <>
        <h1 className="dashboard-title">📊 {activeItem} Dashboard</h1>

        <div className="dashboard-header">
          <div className="upload-section">
            <button className="upload-button" onClick={handleUploadClick}>
              <FiUpload className="upload-icon enlarged-icon" /> Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="*/*"
              multiple
              style={{ display: 'none' }}
            />
            {uploadStatus && <div className="upload-status">{uploadStatus}</div>}
          </div>
        </div>

        <div className="upload-note">
          <p>📋 <b>Tip:</b> Upload the Master DB file before proceeding.</p>
        </div>

        <div className="kpi-section">
          <div className="kpi-grid">
            {kpiData.map((kpi, index) => (
              <div key={index} className="kpi-card">
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="input-section">
          <div className="input-card">
            <div className="input-row">
              <input
                type="text"
                placeholder="Enter Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="customer-input"
              />
              <button className="download-button" onClick={handleDownloadReport}>
                <FiDownload className="download-icon enlarged-icon" /> Download Report
              </button>
            </div>
            <button className="chatbot-button">
              <FiMessageCircle className="chatbot-icon enlarged-icon" /> Chatbot
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <main className="dashboard">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
