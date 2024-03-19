import { useAuthVerify } from '!/auth/applications/verify';
import NeedAuth from '@/layer/NeedAuth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NeedAuthWrap = () => {
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const notAllowPath = useMemo(() => location.pathname.startsWith('/private'), [location]);
  const { error } = useAuthVerify();
  const handleClose = useCallback(() => {
    if (notAllowPath) return navigate(-1);
    setModal(false);
  }, [notAllowPath, setModal]);
  useEffect(() => {
    if (error) setModal(notAllowPath);
  }, [notAllowPath, error]);
  return <NeedAuth show={modal} onClose={handleClose} />;
};

export default NeedAuthWrap;
