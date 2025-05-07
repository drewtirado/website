import React, { useState, useEffect } from 'react';

const ShopPage = () => {
  const [shopItems, setShopItems] = useState({
    openEdition: [],
    limitedEdition: []
  });

  useEffect(() => {
    fetch('/data/shopItems.json') // Fetch from the public directory
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Ensure data is an array before filtering
        if (!Array.isArray(data)) {
          console.error("Fetched data is not an array:", data);
          throw new Error('Fetched data is not an array.');
        }
        const openEdition = data.filter(item => item.edition === 'open');
        const limitedEdition = data.filter(item => item.edition === 'limited');
        setShopItems({ openEdition, limitedEdition });
      })
      .catch(error => {
        console.error("Error fetching shop items:", error);
        // Handle the error appropriately in the UI if needed
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Helper function to render a single print item
  const renderPrint = (print) => (
    <div key={print.id} className="shop-item">
      <img src={print.image} alt={print.title} className="shop-item-image" />
      <h3>{print.title}</h3>
      <p className="shop-item-description">{print.description}</p>
      <div className="shop-item-details">
        <p className="shop-item-edition">
          {print.edition === 'limited'
            ? `Limited Edition (${print.available}/${print.total})`
            : 'Open Edition'}
        </p>
        <p className="shop-item-price">${print.price.toFixed(2)}</p> {/* Format price */}
        <p className="shop-item-availability">
          {print.available > 0 ? 'Available' : 'Sold Out'}
        </p>
      </div>
      {/* Add to cart button or similar functionality can be added here */}
    </div>
  );

  return (
    <div className="shop-page">
      <section className="shop-section">
        <h2>Open Edition Prints</h2>
        {/* Grid for open edition items will go here */}
        <div className="shop-items-grid">
          {/* Placeholder for item mapping */}
          {shopItems.openEdition.length > 0 ? (
            shopItems.openEdition.map(renderPrint)
          ) : (
            <p>No open edition prints available at the moment.</p>
          )}
        </div>
      </section>

      <section className="shop-section">
        <h2>Limited Edition Prints</h2>
        {/* Grid for limited edition items will go here */}
        <div className="shop-items-grid">
          {/* Placeholder for item mapping */}
          {shopItems.limitedEdition.length > 0 ? (
            shopItems.limitedEdition.map(renderPrint)
          ) : (
            <p>No limited edition prints available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopPage; 