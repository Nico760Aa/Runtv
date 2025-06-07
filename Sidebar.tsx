import React from 'react';

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'Tutti i canali', icon: 'grid' },
    { id: 'favorites', name: 'Preferiti', icon: 'star' },
    { id: 'history', name: 'Cronologia', icon: 'clock' },
    { id: 'film', name: 'Film', icon: 'film' },
    { id: 'series', name: 'Serie TV', icon: 'tv' },
    { id: 'anime-sub', name: 'Anime Sub ITA', icon: 'subtitles' },
    { id: 'anime-dub', name: 'Anime Dub ITA', icon: 'mic' },
    { id: 'sports', name: 'Sport', icon: 'activity' },
    { id: 'news', name: 'Notizie', icon: 'globe' },
    { id: 'music', name: 'Musica', icon: 'music' },
    { id: 'documentary', name: 'Documentari', icon: 'camera' },
    { id: 'kids', name: 'Bambini', icon: 'smile' }
  ];

  // Renderizza l'icona appropriata in base al tipo
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'grid':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        );
      case 'star':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      case 'film':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="7" y1="2" x2="7" y2="22"></line>
            <line x1="17" y1="2" x2="17" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="2" y1="7" x2="7" y2="7"></line>
            <line x1="2" y1="17" x2="7" y2="17"></line>
            <line x1="17" y1="17" x2="22" y2="17"></line>
            <line x1="17" y1="7" x2="22" y2="7"></line>
          </svg>
        );
      case 'tv':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
            <polyline points="17 2 12 7 7 2"></polyline>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        );
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Categorie</h2>
      </div>
      <ul className="sidebar-menu">
        {categories.map(category => (
          <li 
            key={category.id}
            className={`sidebar-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="sidebar-icon">
              {renderIcon(category.icon)}
            </span>
            <span className="sidebar-label">{category.name}</span>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <button className="upload-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Carica M3U
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
