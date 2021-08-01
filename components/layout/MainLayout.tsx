import {
  LineChartOutlined,
  QrcodeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
import Link from "next/link";
import React from "react";
import useAuth from "../../auth/AuthContext";
import { Art, Editor, Museum, ReferencePoint } from "../../icons/personalIcons";
import { LayoutOptions, LayoutProps } from "../../types/types";
import { Main } from "../Main";

const { Header, Content, Sider } = Layout;

const MainLayout = (props: LayoutProps) => {
  const { children, title, selectedKey } = props;
  const { logout } = useAuth();
  const layoutObj: LayoutOptions[] = [
    {
      path: "/bien_de_interes",
      title: "Bien de interés cultural",
      icon: <Museum />,
    },
    {
      path: "/punto_de_referencia",
      title: "Punto de referencia",
      icon: <Art />,
    },
    {
      path: "/punto_de_referencia_seccion",
      title: "Punto de referencia sección",
      icon: <ReferencePoint />,
    },
    {
      path: "/usuarios",
      title: "Usuarios",
      icon: <UserOutlined />,
    },
    {
      path: "/qr",
      title: "QR",
      icon: <QrcodeOutlined />,
    },
    {
      path: "/autores",
      title: "Autores",
      icon: <Editor />,
    },
    {
      path: "/visitas",
      title: "Visitas",
      icon: <LineChartOutlined />,
    },
  ];

  return (
    <Main title={title}>
      <Layout className="layoutContainer" style={{ minHeight: "100vh" }}>
        <Sider className="siderContainer">
          <div className="logo" />
          <Menu mode="inline" theme="dark" defaultSelectedKeys={selectedKey}>
            {layoutObj.map((e, i) => {
              return (
                <Menu.Item icon={e.icon} key={(i + 1).toString()}>
                  <Link href={e.path}>{e.title}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout className="siteLayout">
          <Header className="headerContainer">
            <Button type="primary" onClick={logout}>
              Salir
            </Button>
          </Header>
          <Content className="contentContainer" style={{ margin: "40px 16px" }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Main>
  );
};

export default React.memo(MainLayout);
