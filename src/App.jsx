import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import JournalPage from './pages/JournalPage';
import ShopPage from './pages/ShopPage';
import InfoPage from './pages/InfoPage';
const AboutPage = () => <div>About Page Content</div>;
const ContactPage = () => <div>Contact Page Content</div>;
const GalleryPage = () => <div>Gallery Page Content</div>;

// Placeholder for a specific body of work page
// const WorkBodyPage = () => {
//   const { workId } = useParams(); // Get workId from URL
//   return <div>Content for Body of Work: {workId}</div>;
// };

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="work/:workId" element={<WorkPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="info" element={<InfoPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;
