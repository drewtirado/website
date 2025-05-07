import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context
const WorkContext = createContext(null); // Initialize with null or appropriate default

// 2. Create the Provider Component
export function WorkProvider({ children }) {
  const [workBodies, setWorkBodies] = useState(null); // State to hold the data
  const [homeImages, setHomeImages] = useState(null); // Add state for home images
  const [journalEntries, setJournalEntries] = useState(null); // Add state for journal entries
  const [loading, setLoading] = useState(true); // Optional: Loading state
  const [error, setError] = useState(null); // Optional: Error state

  useEffect(() => {
    setLoading(true);
    setError(null); // Clear previous errors on new fetch attempt

    Promise.all([
      fetch('/data/workBodies.json').then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP error! status: ${res.status} for workBodies.json`))),
      fetch('/data/homeImages.json').then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP error! status: ${res.status} for homeImages.json`))),
      fetch('/data/journalEntries.json').then(res => res.ok ? res.json() : Promise.reject(new Error(`HTTP error! status: ${res.status} for journalEntries.json`))) // Fetch journal entries
    ])
    .then(([workData, homeData, journalData]) => { // Destructure all results
      console.log("Fetched work bodies:", workData);
      console.log("Fetched home images:", homeData);
      console.log("Fetched journal entries:", journalData);
      setWorkBodies(workData);
      setHomeImages(homeData);
      setJournalEntries(journalData); // Set journal entries state
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      setError(err.message || 'Failed to fetch data');
      setWorkBodies(null); // Clear data on error
      setHomeImages(null);
      setJournalEntries(null); // Clear journal state on error
    })
    .finally(() => {
      setLoading(false); // Set loading false whether success or error
    });

  }, []); // Empty dependency array runs once on mount

  // Value provided includes all data, loading, and error states
  const value = {
    workBodies,
    homeImages, // Include homeImages in context value
    journalEntries, // Include journal entries in context value
    loading,
    error
  };

  return (
    <WorkContext.Provider value={value}>
      {children}
    </WorkContext.Provider>
  );
}

// 3. Create a Custom Hook for easy consumption
export function useWorkData() {
  const context = useContext(WorkContext);
  if (context === undefined) {
    throw new Error('useWorkData must be used within a WorkProvider');
  }
  // If initialized context with null, check explicitly
  if (context === null) {
      // Could return loading/error state here too, or just the null context
      // Depending on how consumers should handle initial null state
  }
  return context;
} 