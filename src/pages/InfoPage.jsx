import React, { useState, useEffect } from 'react';
import EmailLink from '../components/EmailLink/EmailLink';

const InfoPage = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/info.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setInfo(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching info data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading information: {error}</div>;
  }

  if (!info) {
    return <div>No information available.</div>; // Should not happen if fetch succeeds
  }

  // Parse email for obfuscation component
  const [user, domain] = info.email ? info.email.split('@') : ['', ''];

  return (
    <div className="info-page">
      <h1>Info Page</h1>
      {/* Content rendering will go here */}
      <section className="info-section bio-section">
        <h2>Biography</h2>
        {/* Render HTML content safely */}
        <div dangerouslySetInnerHTML={{ __html: info.bio }} />
      </section>

      <section className="info-section cv-section">
        <h2>CV</h2>
        {/* Render HTML content safely */}
        <div dangerouslySetInnerHTML={{ __html: info.cv }} />
      </section>

      <section className="info-section contact-section">
        <h2>Contact</h2>
        <p>
          {user && domain ? (
            <EmailLink user={user} domain={domain} />
          ) : (
            <span>Email not available</span> // Fallback if email parsing fails
          )}
        </p>
      </section>
    </div>
  );
};

export default InfoPage; 