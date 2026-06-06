import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Overview from './pages/Overview.jsx';
import SpecSheet from './pages/SpecSheet.jsx';

const PAGES = {
  specsheet: SpecSheet,
  overview: Overview,
};

export default function App() {
  const [tab, setTab] = useState('specsheet');
  const Page = PAGES[tab];
  return (
    <>
      <Navbar active={tab} onTab={setTab} />
      <Page />
    </>
  );
}
