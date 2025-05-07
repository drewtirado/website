import React, { useState, useEffect } from 'react';

const EmailLink = ({ user, domain }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Construct email on client-side to avoid it being in the initial HTML source
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) {
    // Optional: Show placeholder or nothing while email is being constructed
    return <span>Loading email...</span>; 
  }

  return <a href={`mailto:${email}`}>{email}</a>;
};

export default EmailLink; 