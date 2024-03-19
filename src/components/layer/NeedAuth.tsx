import { Link } from 'react-router-dom';
import withLayer from './withLayer';
const NeedAuth = () => {
  return (
    <div>
      로그인이 필요합니다.
      <Link to="/auth/login">로그인 하러가기</Link>
    </div>
  );
};

export default withLayer(NeedAuth);
