import styled from "styled-components";
import { useLocation } from "react-router-dom";

const HeaderContainer = styled.header`
  height: 3.5rem;
  padding: 12px 20px;
  border-bottom: 1px solid #dee2e6;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 1.2rem;
    font-weight: 500;
    color: #212529;
    text-transform: capitalize;
  }
`;

export default function Header() {
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const pageTitle = path || "Dashboard";

  return (
    <HeaderContainer>
      <span>{pageTitle}</span>
    </HeaderContainer>
  );
}
