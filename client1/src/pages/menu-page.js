import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/month-page'); // 첫 로딩 시 month-page로 이동
  }, [navigate]);

  return (
    <div style={{ padding: '50px' }}>
      <h2>Menu Page</h2>
    </div>
  );
};

export default MenuPage;
