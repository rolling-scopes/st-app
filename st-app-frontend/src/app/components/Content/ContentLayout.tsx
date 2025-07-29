import { Layout } from "antd";
import React from "react";

class ContentLayout extends React.Component<any, any>{
  render() {
    return (
      <Layout>
        <p>Title</p>
        <ul>
          <li>First element</li>
          <li>Second element</li>
          <li>Third element</li>
          <li>Fourth element</li>
          <li>Fifth element</li>
        </ul>
      </Layout>
    );
  }
}

export { ContentLayout };
