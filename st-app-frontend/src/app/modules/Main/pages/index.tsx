'use client';
import { FooterLayout } from '@/app/components/Footer';
import { Layout, theme } from "antd";

export function MainPage() {
      const { token } = theme.useToken();
      return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ background: token.colorBgContainer }}>
      </Layout>
      <FooterLayout />
    </Layout>
  );
}