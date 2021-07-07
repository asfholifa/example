import React from "react";
import { useAppSelector } from "@redux/hooks";
import { isAuthorizedSelector } from "@redux/slices/authSlice";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import Header from "@components/Layout/Header";
import SideBar from "@components/Layout/SideBar";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthorized = useAppSelector(isAuthorizedSelector);
  const { width } = useWindowDimensions();

  return (
    <div className={styles.wrapper}>
      {isAuthorized && width > 768 && <SideBar />}
      <div className={styles.content}>
        <Header />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
