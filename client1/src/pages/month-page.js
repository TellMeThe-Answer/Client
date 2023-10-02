import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BigTitle, BottomNavbar } from "../components/components";

function MonthPage() {
  return(
    <div>
    <div style={{ padding: "40px" }}>
      <BigTitle ttl="이달의 병해정보" />      
    </div>
    <BottomNavbar />
    </div>
  )
}

export default MonthPage;