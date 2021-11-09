import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const defaultMessage = 'UBT 蝌蚪后台管理系统';
  const currentYear = new Date().getFullYear();
  return <DefaultFooter copyright={`${currentYear} ${defaultMessage}`} links={[]} />;
};
