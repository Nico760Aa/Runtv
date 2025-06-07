import React from 'react';
import { Channel } from '../types/Channel';

interface ChannelGridProps {
  channels: Channel[];
  favorites: string[];
  isLoading: boolean;
  onChannelClick: (channel: Channel) => void;
  toggleFavorite: (channelId: string) => void;
}

const ChannelGrid: React.FC<ChannelGridProps> = ({
  channels,
  favorites,
  isLoading,
  onChannelClick,
  toggleFavorite
}) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Caricamento canali in corso...</p>
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="15" x2="16" y2="15"></line>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
        <h3>Nessun canale trovato</h3>
        <p>Prova a modificare i filtri o la ricerca</p>
      </div>
    );
  }

  return (
    <div className="channel-grid">
      {channels.map(channel => (
        <div key={channel.id} className="channel-card">
          <div 
            className="channel-thumbnail" 
            onClick={() => onChannelClick(channel)}
          >
            {channel.logo ? (
              <img src={channel.logo} alt={channel.title} />
            ) : (
              <div className="channel-placeholder">
                <span>{channel.title.charAt(0)}</span>
              </div>
            )}
            <div className="channel-play-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          <div className="channel-info">
            <h3 className="channel-title" onClick={() => onChannelClick(channel)}>
              {channel.title}
            </h3>
            <div className="channel-meta">
              <span className="channel-group">{channel.group}</span>
              <button 
                className={`favorite-button ${favorites.includes(channel.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(channel.id)}
                aria-label={favorites.includes(channel.id) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={favorites.includes(channel.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelGrid;
