import { Alert } from 'antd';

export const customAlert = (err) => {
  return (
    <div>
      <Alert message={err} type="warning" />
    </div>
  );
};
