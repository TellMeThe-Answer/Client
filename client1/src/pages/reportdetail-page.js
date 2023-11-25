import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>정말 신고내역을 삭제하시겠습니까?</p>
        <button onClick={onConfirm}>네</button>
        <button onClick={onClose}>아니요</button>
      </div>
    </div>
  );
};

const ReportDetailpage = () => {
  const [reports, setReports] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedReports = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(loadedReports);
  }, []);

  const openDeleteModal = (index) => {
    setIsModalOpen(true);
    setDeletingIndex(index);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setDeletingIndex(null);
  };

  const confirmDelete = () => {
    deleteReport(deletingIndex);
    closeDeleteModal();
  };

  const deleteReport = (indexToDelete) => {
    const updatedReports = reports.filter((_, index) => index !== indexToDelete);
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const handleEditLocation = (index) => {
    const report = reports[index];
    navigate('/markerfix-page', { 
      state: { 
        reportIndex: index, 
        reportLat: report.lat, 
        reportLng: report.lng,
        cropType: report.crop 
      } 
    });
  };

  const handleSymptomsChange = (e, index) => {
    const updatedReports = [...reports];
    updatedReports[index].symptoms = e.target.value;
    setReports(updatedReports);
  };

  const saveEditedReport = () => {
    localStorage.setItem('reports', JSON.stringify(reports));
    setEditIndex(null);
  };

  if (reports.length === 0) {
    return <div>No reports found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Report List</h1>
      {reports.map((report, index) => (
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <button onClick={() => openDeleteModal(index)} style={{ float: 'right' }}>X</button>
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
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
};

export default ReportDetailpage;
