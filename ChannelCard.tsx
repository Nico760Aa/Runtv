import React from 'react';
import { Channel } from '../types/Channel';

interface ChannelCardProps {
  channel: Channel;
  isFavorite: boolean;
  onChannelClick: (channel: Channel) => void;
  toggleFavorite: (channelId: string) => void;
  isDownloadable: boolean;
  onDownload: (channel: Channel) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  isFavorite,
  onChannelClick,
  toggleFavorite,
  isDownloadable,
  onDownload
}) => {
  return (
    <div className="channel-card">
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
          <div className="channel-actions">
            {isDownloadable && (
              <button 
                className="download-button-small"
                onClick={() => onDownload(channel)}
                title="Scarica MP4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            )}
            <button 
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(channel.id)}
              aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
