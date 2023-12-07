import React, { useEffect, useState } from 'react';
import HistoryData from '../../config/history.json';
import MoveBackComponent from '../../components/common/MoveBackComponent';
import axios from "axios";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="h-32 bg-white rounded-2xl flex flex-col p-4 justify-between">
        <div>신고 내역을 삭제하시겠습니까?</div>
            <div className = "flex justify-around px-2">
                <button onClick={onConfirm} className="w-20 rounded-xl border border-black">네</button>
                <button onClick={onClose} className="w-20 rounded-xl border border-black">아니요</button>
            </div>
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
          </li>
        ))}
      </ul>
    </nav>
  );
};

const HistoryPage = () => {
  const [reports, setReports] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(5);

  const getUserData = async() => {
    const memberId = localStorage.getItem('memberId');
    if (memberId) {
        await axios.get(`/report/list/${memberId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('GET 요청 성공:', response.data.reportListDtoList);
            setReports(response.data.reportListDtoList);

        })
        .catch(error => {
            console.error('GET 요청 실패:', error);
        });
    }
};


  useEffect(() => {

    getUserData();
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
    <>
    <MoveBackComponent/>
    <div className="p-4 bg-gray-50">
      <h1 className="w-full h-12 flex justify-center items-start font-semibold text-2xl">신고 내역 조회</h1>
      {reports.slice((currentPage - 1) * reportsPerPage, currentPage * reportsPerPage).map((report, index) => (
        <div key={index} className={`bg-white w-full h-50 rounded-xl mt-2 p-3 drop-shadow-md ... ${editIndex === index ? 'editing' : ''}`}>
          <div className="report-item-content">
            {/* Display details here */}
            <div>제목: {report.title}</div>
            <div>작물: {report.crop}</div>
            <div>병해: {report.disease}</div>
            {editIndex === index ? (
              <textarea
                className="edit-input"
                value={report.symptoms}
                onChange={(e) => handleSymptomsChange(e, index)}
              />
            ) : (
              <div>본문: {report.content}</div>
            )}
            <div>주소: 서울광진구</div>
            <div>날짜: {report.createDate}</div>
          </div>
          <div className="report-item-controls">
            {editIndex === index ? (
              <button onClick={() => saveEditedReport(index)} className="save-button">저장</button>
            ) : (
                <></>
            )}
            <button onClick={() => openDeleteModal(index)} className="w-full flex justify-end">
                <div class="bg-[#10b981] w-20 h-8 rounded-lg flex justify-center items-center">
                    <div class="font-semibold text-white">삭제하기</div>
                </div>
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
    </>
  );
};

export default HistoryPage;

