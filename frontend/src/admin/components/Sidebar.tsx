import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import {
  House,
  Truck,
  Package,
  Users,
  Settings,
  ShieldUser,
} from "lucide-react";

const SidebarContainer = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: rgb(241, 245, 249);
  border-right: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 992px) {
    display: none;
  }
`;

const HeaderContainer = styled.header`
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #dee2e6;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    gap: 10px;
  }

  span {
    font-size: 1.2rem;
    font-weight: 500;
    color: #212529;
  }
`;

const NavList = styled.nav`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
`;

const NavItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 15px;
  color: #495057;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
    color: #000;
  }

  &.active {
    background-color: #e0e7ff;
    color: #4338ca;
  }

  &.active:hover {
    background-color: #c7d2fe;
  }
`;

const StyledSeparator = styled(SeparatorPrimitive.Root)`
  background-color: #dee2e6;
  height: 1px;
  width: 100%;
  margin: 8px 0;
`;

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
}

const SidebarItem = ({ icon: Icon, label, to }: SidebarItemProps) => (
  <NavItemLink to={to}>
    <Icon size={20} />
    <span>{label}</span>
  </NavItemLink>
);

export default function Sidebar() {
  return (
    <SidebarContainer>
      <HeaderContainer>
        <a href="/admin/dashboard">
          <div
            style={{
              width: 32,
              height: 32,
              background: "4338ca",
              borderRadius: 4,
            }}
          />
          <span>Admin</span>
        </a>
      </HeaderContainer>

      <NavList>
        <SidebarItem icon={House} label="Dashboard" to="/admin/dashboard" />
        <SidebarItem icon={Truck} label="All orders" to="/admin/orders" />
        <SidebarItem icon={Package} label="Products" to="/admin/products" />
        {/* <SidebarItem
          icon={FileSpreadsheet}
          label="Invoices"
          to="/admin/invoices"
        />
        <SidebarItem
          icon={CircleDollarSign}
          label="Finance"
          to="/admin/finance"
        /> */}
        <SidebarItem icon={Users} label="Customers" to="/admin/customers" />
        {/* <SidebarItem icon={Tag} label="Discounts" to="/admin/discounts" />
        <SidebarItem
          icon={ChartColumnBig}
          label="Reports"
          to="/admin/reports"
        /> */}

        <StyledSeparator />

        <SidebarItem icon={Settings} label="Settings" to="/admin/settings" />
      </NavList>
    </SidebarContainer>
  );
}
