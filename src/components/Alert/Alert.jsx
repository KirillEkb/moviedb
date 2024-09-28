import { Alert } from 'antd';
import PropTypes from 'prop-types';

export const customAlert = (props) => {
  return (
    <div>
      <Alert message={props.message} type="warning" />
    </div>
  );
};

customAlert.propTypes = {
  err: PropTypes.string,
};
