import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card
        style={{
          height: '420px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
        }}
      >
        <h1>欢迎来到蝌蚪后台管理系统</h1>
      </Card>
    </PageContainer>
  );
};
