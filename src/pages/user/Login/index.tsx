import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { ProFormText, LoginForm, ProFormCaptcha } from '@ant-design/pro-form';
import { history } from 'umi';
import Footer from '@/components/Footer';
import { login, getPreLogin } from '@/services/ubt/login';
import { hex_md5 } from '@/utils/md5';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [crsfToken, setCrsfToken] = useState('');

  const getCrsfToken = async () => {
    try {
      const res = await getPreLogin();
      if (res.code === 0) setCrsfToken(res.crsfToken);
    } catch (error) {
      message.error('获取验证码失败，请刷新重试！');
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const { username, password, captcha } = values;
      // 登录
      const res = await login({
        userName: username,
        captcha,
        crsfToken,
        password: hex_md5(password),
      });
      if (res.code === 0) {
        message.success('登录成功！');
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('userId', res.userId);
        // sessionStorage.setItem('moduleId', 31); // 权限管理需要用到
        history.push('/welcome');
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      console.log('error: ', error);
      message.error('登录失败，请重试！');
    }
  };

  useEffect(() => {
    getCrsfToken();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="蝌蚪后台管理系统"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <h2 style={{ textAlign: 'center', margin: '40px 0 30px' }}>账号密码登录</h2>

          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'用户名: admin or user'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'密码: ant.design'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ProFormText
                name="captcha"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入验证码"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项',
                  },
                ]}
              />
              <img
                style={{ width: '140px', height: '40px', marginLeft: '20px', cursor: 'pointer' }}
                src={`${API_DOMAIN}/center-service/sys-service/captcha.jpg?crsfToken=${crsfToken}`}
                onClick={getCrsfToken}
              />
            </div>
          </>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
