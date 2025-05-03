# Product Requirements Document (PRD)

## Overview

This document outlines the requirements for a photographer's portfolio website built with Vite React. The site is primarily static and informational, showcasing photography work, with a simple CMS for content management.

## Objectives

- Create a minimal, visually appealing platform to display the photographer’s portfolio.
- Enable easy content updates via a password-protected CMS.
- Provide interactive features for user engagement (e.g., image swapping, slide navigation).

## Features and Requirements

### 1. Home Page

- **Design**: Minimal, slightly off-white background (`#f2f2f2`), displaying two images.
- **Interaction**: Clicking an image replaces it with a random image from a pool (excluding currently displayed images).
- **Data**: Array of image paths (e.g., `["/images/home/image1.jpg", ...]`).

### 2. Work Page

- **Navigation**: "Work" button reveals nested links to bodies of work (no page navigation).
- **Body of Work**:
  - Sequence: First image, then description (text), then additional images.
  - Navigation via clicks (custom cursor on hover) or arrow keys.
- **Data**: Objects with `title`, `description`, and `images` array.

### 3. Journal Page

- **Purpose**: Informal posts (text, images, poems) in reverse chronological order.
- **Content Types**: Support "text", "image", "poem" with appropriate rendering.
- **Data**: Objects with `title`, `date`, `type`, `textContent`, `image`, `caption`, `tags`.

### 4. Shop Page

- **Categories**: Open Edition and Limited Edition prints.
- **Content**: Each print shows `title`, `image`, `description`, `edition`, `price`, `available`.
- **Display**: Separate sections for each edition type.

### 5. Info Page

- **Content**: Static bio, informal CV, email.
- **Data**: Single object with `bio`, `cv`, `email`.

### 6. Content Management System (CMS)

- **Access**: Password-protected via Netlify Identity or external auth.
- **Functionality**:
  - Manage Home images.
  - CRUD operations for Work bodies, Journal entries, Shop prints, and Info content.
- **GUI**: User-friendly forms matching data structures, storing data as JSON files.

## Technical Requirements

- **Frontend**: Vite React, generating a static site.
- **CMS**: Netlify CMS, integrated with Git for content storage.
- **Hosting**: Netlify with automatic rebuilds on CMS updates.
- **Data**: JSON files in the repository (e.g., folder collections for Work, Journal, Shop).

## User Interface and Experience

- **Design**: Clean, minimal, image-focused.
- **Navigation**: Intuitive, with interactive elements (e.g., nested Work links, clickable images).
- **Responsiveness**: Fully responsive across devices.

## Security

- **CMS**: Authentication to restrict access.
- **Data**: Secure handling of personal info (e.g., email).

## Performance

- **Optimization**: Lazy-loaded, responsive images.
- **Build**: Fast static site generation with Vite.

## Future Considerations

- Add filtering for Journal entries.
- Explore basic e-commerce for Shop (e.g., "Buy" links).
