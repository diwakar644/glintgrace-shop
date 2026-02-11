import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

// Styling
const AdminLayout = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
`;

const Main = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

export default function Admin() {
  return (
    <AdminLayout>
      <Sidebar />
      <ContentArea>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </ContentArea>
    </AdminLayout>
  );
}
