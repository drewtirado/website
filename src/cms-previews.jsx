import CMS from 'decap-cms-app';
import React from 'react';

// Preview template for the Home collection
const HomePreview = ({ entry, getAsset }) => {
  const images = entry.getIn(['data', 'images']);
  return (
    <div>
      <h3>Home Page Images</h3>
      {images && images.map((image, index) => {
        const imageUrl = getAsset(image.get('image')).toString();
        return <img key={index} src={imageUrl} alt={`Home image ${index + 1}`} style={{ maxWidth: '200px', margin: '10px' }} />;
      })}
    </div>
  );
};
CMS.registerPreviewTemplate('home', HomePreview);

// Preview template for the Work collection
const WorkPreview = ({ entry, getAsset }) => {
  const title = entry.getIn(['data', 'title']);
  const description = entry.getIn(['data', 'description']);
  const images = entry.getIn(['data', 'images']);
  return (
    <div>
      <h3>Work Preview: {title}</h3>
      <p>{description}</p>
      {images && images.map((image, index) => {
        const imageUrl = getAsset(image.get('image')).toString();
        return <img key={index} src={imageUrl} alt={`${title} - image ${index + 1}`} style={{ maxWidth: '150px', margin: '5px' }} />;
      })}
    </div>
  );
};
CMS.registerPreviewTemplate('work', WorkPreview);

// Preview template for the Journal collection
const JournalPreview = ({ entry, getAsset }) => {
  const title = entry.getIn(['data', 'title']);
  const date = entry.getIn(['data', 'date']);
  const type = entry.getIn(['data', 'type']);
  const textContent = entry.getIn(['data', 'textContent']);
  const image = entry.getIn(['data', 'image']);
  const caption = entry.getIn(['data', 'caption']);

  return (
    <div>
      <h3>Journal Preview: {title}</h3>
      <p><strong>Date:</strong> {date ? new Date(date).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Type:</strong> {type}</p>
      {type === 'text' && <div dangerouslySetInnerHTML={{ __html: CMS.widgetFor('markdown').previewFor(textContent) }} />}      
      {type === 'image' && image && (
        <div>
          <img src={getAsset(image).toString()} alt={caption || title} style={{ maxWidth: '300px', margin: '10px 0' }} />
          {caption && <p><em>{caption}</em></p>}
        </div>
      )}
      {type === 'poem' && <pre>{textContent}</pre>} 
    </div>
  );
};
CMS.registerPreviewTemplate('journal', JournalPreview);

// Preview template for the Shop collection
const ShopPreview = ({ entry, getAsset }) => {
  const title = entry.getIn(['data', 'title']);
  const image = entry.getIn(['data', 'image']);
  const description = entry.getIn(['data', 'description']);
  const edition = entry.getIn(['data', 'edition']);
  const total = entry.getIn(['data', 'total']);
  const available = entry.getIn(['data', 'available']);
  const price = entry.getIn(['data', 'price']);

  return (
    <div>
      <h3>Shop Preview: {title}</h3>
      {image && <img src={getAsset(image).toString()} alt={title} style={{ maxWidth: '200px', margin: '10px 0' }} />}
      <p>{description}</p>
      <p><strong>Edition:</strong> {edition}</p>
      {edition === 'limited' && <p><strong>Total Prints:</strong> {total}</p>}
      <p><strong>Available:</strong> {available}</p>
      <p><strong>Price:</strong> ${price ? price.toFixed(2) : 'N/A'}</p>
    </div>
  );
};
CMS.registerPreviewTemplate('shop', ShopPreview);

// Preview template for the Info collection
const InfoPreview = ({ entry }) => {
  const bio = entry.getIn(['data', 'bio']);
  const cv = entry.getIn(['data', 'cv']);
  const email = entry.getIn(['data', 'email']);

  // Helper to render markdown content
  const renderMarkdown = (markdownContent) => {
    if (!markdownContent) return null;
    // Decap CMS provides a utility to render markdown previews, 
    // or you can use a library like 'marked' or 'react-markdown' if preferred and available.
    // For simplicity, using a basic representation here.
    // In a real setup, you might use CMS.widgetFor('markdown').previewFor(markdownContent) if it works for file collections
    // or a dedicated markdown rendering component.
    return <div dangerouslySetInnerHTML={{ __html: markdownContent.replace(/\n/g, '<br />') }} />;
  };

  return (
    <div>
      <h3>Info Page Preview</h3>
      <h4>Bio</h4>
      {renderMarkdown(bio)}
      <h4>CV</h4>
      {renderMarkdown(cv)}
      <h4>Email</h4>
      <p>{email}</p>
    </div>
  );
};
CMS.registerPreviewTemplate('info', InfoPreview);

// Placeholder components (to be implemented in subsequent tasks) 