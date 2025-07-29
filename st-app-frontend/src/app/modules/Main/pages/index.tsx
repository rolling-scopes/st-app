"use client";
import { ContentLayout } from "@/app/components/Content";
import { FooterLayout } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { Layout, theme } from "antd";

const { Content } = Layout;

export function MainPage() {
  const { token } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout style={{ background: token.colorBgContainer }}>
        <Content style={{ margin: 16, marginBottom: 32 }}>
          <ContentLayout />
        </Content>
      </Layout>
      <FooterLayout />
    </Layout>
  );
}
