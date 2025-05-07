import React, { useState, useEffect } from 'react';
import { useWorkData } from '../context/WorkContext'; // Use the same context for now
import JournalEntry from '../components/JournalEntry';
import styles from './JournalPage.module.css'; // Import page styles

function JournalPage() {
  const { journalEntries, loading, error } = useWorkData();
  const [sortedEntries, setSortedEntries] = useState([]);

  useEffect(() => {
    if (journalEntries) {
      // Sort entries by date, newest first
      const sorted = [...journalEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
      setSortedEntries(sorted);
    }
  }, [journalEntries]); // Re-sort whenever journalEntries data changes

  if (loading) {
    return <div>Loading journal entries...</div>;
  }

  if (error) {
    return <div>Error loading journal entries: {error}</div>;
  }

  if (!sortedEntries || sortedEntries.length === 0) {
    return <div>No journal entries found.</div>;
  }

  return (
    <div className={styles.journalPage}> {/* Apply page style */}
      <h1>Journal</h1>
      {sortedEntries.map(entry => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default JournalPage; 