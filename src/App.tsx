// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import DefaultLayout from '@/DefaultLayout';
import Form from '@/Form';
import NormalLayout from '@/NormalLayout';
import NotFound from '@/NotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Form />} />
        </Route>
        <Route element={<NormalLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* <Route path={ROUTES_PATH['/sign-out']} element={<SignOut />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
