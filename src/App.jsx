import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Formworks from './pages/Formworks.jsx';
import Properties from './pages/Properties.jsx';
import PropertiesEnquiry from './pages/PropertiesEnquiry.jsx';
import Travels from './pages/Travels.jsx';
import TravelsEnquiry from './pages/TravelsEnquiry.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="formworks" element={<Formworks />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/enquiry" element={<PropertiesEnquiry />} />
        <Route path="travels" element={<Travels />} />
        <Route path="travels/enquiry" element={<TravelsEnquiry />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
