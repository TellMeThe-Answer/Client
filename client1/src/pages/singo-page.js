import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SingoPage = () => {
  const [reports, setReports] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Index of the report being edited
  const navigate = useNavigate();

  useEffect(() => {
    const loadedReports = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(loadedReports);
  }, []);

  const deleteReport = (indexToDelete) => {
    const updatedReports = reports.filter((_, index) => index !== indexToDelete);
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const handleEditLocation = (index) => {
    const report = reports[index];
    navigate('/reportaddress-page', { state: { reportLat: report.lat, reportLng: report.lng } });
  };
  const handleSymptomsChange = (e, index) => {
    const updatedReports = [...reports];
    updatedReports[index].symptoms = e.target.value;
    setReports(updatedReports);
  };

  const saveEditedReport = () => {
    localStorage.setItem('reports', JSON.stringify(reports));
    setEditIndex(null); // Exit edit mode
  };

  if (reports.length === 0) {
    return <div>No reports found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Report List</h1>
      {reports.map((report, index) => (
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <button onClick={() => deleteReport(index)} style={{ float: 'right' }}>X</button>
          <h2>Report {index + 1}</h2>
          <div><strong>Crop:</strong> {report.crop}</div>
          <div><strong>Disease:</strong> {report.disease}</div>

          {editIndex === index ? (
            <input 
              type="text" 
              value={report.symptoms} 
              onChange={(e) => handleSymptomsChange(e, index)} 
            />
          ) : (
            <div><strong>Symptoms:</strong> {report.symptoms}</div>
          )}

          <div><strong>Address:</strong> {report.address}</div>
          <div><strong>Date:</strong> {report.date}</div>
          <button onClick={() => handleEditLocation(index)}>위치 수정하기</button>
          <button onClick={() => setEditIndex(index)}>증상 다시 작성하기</button>
          {editIndex === index && <button onClick={saveEditedReport}>저장하기</button>}
        </div>
      ))}
    </div>
  );
};

export default SingoPage;