import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../css/App.css'; // Make sure this path is correct for your project

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>정말 신고 내역을 삭제하시겠습니까?</p>
        <button onClick={onConfirm} className="confirm-yes">네</button>
        <button onClick={onClose} className="confirm-no">아니요</button>
      </div>
    </div>
  );
};

const Pagination = ({ reportsPerPage, totalReports, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalReports / reportsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='#!' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ReportDetailpage = () => {
  const [reports, setReports] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(5);

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
    const updatedReports = reports.filter((_, idx) => idx !== deletingIndex);
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
    closeDeleteModal();
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

  const paginate = pageNumber => setCurrentPage(pageNumber);


 
  return (
    <div className="report-list">
      <h1 className="header">신고 내역 조회</h1>
      {reports.slice((currentPage - 1) * reportsPerPage, currentPage * reportsPerPage).map((report, index) => (
        <div key={index} className={`report-item ${editIndex === index ? 'editing' : ''}`}>
          <div className="report-item-content">
            {/* Display details here */}
            <div><strong>작물:</strong> {report.crop}</div>
            <div><strong>병해:</strong> {report.disease}</div>
            {editIndex === index ? (
              <textarea
                className="edit-input"
                value={report.symptoms}
                onChange={(e) => handleSymptomsChange(e, index)}
              />
            ) : (
              <div><strong>증상:</strong> {report.symptoms}</div>
            )}
            <div><strong>주소:</strong> {report.address}</div>
            <div><strong>날짜:</strong> {report.date}</div>
          </div>
          <div className="report-item-controls">
            {editIndex === index ? (
              <button onClick={() => saveEditedReport(index)} className="save-button">저장</button>
            ) : (
              <button onClick={() => setEditIndex(index)} className="edit-button">수정</button>
            )}
            <button onClick={() => openDeleteModal(index)} className="delete-button">
              <FaTimes />
            </button>
          </div>
        </div>
      ))}
      <Pagination 
        reportsPerPage={reportsPerPage}
        totalReports={reports.length}
        paginate={paginate}
      />
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => confirmDelete(deletingIndex)}
      />
    </div>
  );
};

export default ReportDetailpage;
