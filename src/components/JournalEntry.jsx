import React from 'react';
import styles from './JournalEntry.module.css'; // Import entry styles

function JournalEntry({ entry }) {
  if (!entry) {
    return null; // Don't render if no entry data
  }

  // Simple date formatting (consider a library like date-fns for more complex needs)
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) { // eslint-disable-line no-unused-vars
      return dateString; // Fallback to original string on error
    }
  };

  const renderContent = () => {
    switch (entry.type) {
      case 'text':
        return (
          <div className={`${styles.journalContent} ${styles.textContent}`}>
            <p>{entry.textContent}</p>
          </div>
        );
      case 'image':
        return (
          <div className={`${styles.journalContent} ${styles.imageContent}`}>
            <img src={entry.image} alt={entry.title || 'Journal image'} className={styles.entryImage} />
            {entry.caption && <p className={styles.caption}>{entry.caption}</p>}
          </div>
        );
      case 'poem':
        return (
          <div className={`${styles.journalContent} ${styles.poemContent}`}>
            <p>{entry.textContent}</p>
          </div>
        );
      default:
        return <p>Unknown entry type: {entry.type}</p>;
    }
  };

  return (
    <article className={styles.journalEntry}> {/* Apply entry style */}
      <header className={styles.entryHeader}> {/* Apply header style */}
        <h2>{entry.title}</h2>
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
      </header>
      {renderContent()}
      {entry.tags && entry.tags.length > 0 && (
        <footer className={styles.entryTags}> {/* Apply tags footer style */}
          Tags: {entry.tags.map((tag, i) => (
            <span key={i} className={styles.tag}>{tag}</span> /* Apply tag style */
          ))}
        </footer>
      )}
    </article>
  );
}

export default JournalEntry; 