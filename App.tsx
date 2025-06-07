import { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChannelGrid from './components/ChannelGrid';
import VideoPlayer from './components/VideoPlayer';
import { Channel } from './types/Channel';
import { parseM3U } from './utils/m3uParser';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyWatched, setRecentlyWatched] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carica le liste M3U all'avvio
  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setIsLoading(true);
        
        // Carica la playlist internazionale
        const defaultPlaylistResponse = await fetch('/assets/default_playlist.m3u');
        const defaultPlaylistContent = await defaultPlaylistResponse.text();
        
        // Carica la playlist italiana
        const italianPlaylistResponse = await fetch('/assets/italian_playlist.m3u');
        const italianPlaylistContent = await italianPlaylistResponse.text();
        
        // Unisci e analizza le playlist
        const allChannels = [
          ...parseM3U(defaultPlaylistContent),
          ...parseM3U(italianPlaylistContent)
        ];
        
        setChannels(allChannels);
        setFilteredChannels(allChannels);
        
        // Carica preferiti dal localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        
        // Carica cronologia dal localStorage
        const savedHistory = localStorage.getItem('recentlyWatched');
        if (savedHistory) {
          setRecentlyWatched(JSON.parse(savedHistory));
        }
        
        // Carica preferenza tema dal localStorage
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
          setDarkMode(JSON.parse(savedTheme));
        }
      } catch (error) {
        console.error('Errore nel caricamento delle playlist:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPlaylists();
  }, []);

  // Filtra i canali in base alla ricerca e alla categoria
  useEffect(() => {
    let result = channels;
    
    // Filtra per categoria
    if (activeCategory !== 'all') {
      if (activeCategory === 'favorites') {
        result = channels.filter(channel => favorites.includes(channel.id));
      } else if (activeCategory === 'history') {
        result = recentlyWatched;
      } else {
        result = channels.filter(channel => 
          channel.group.toLowerCase().includes(activeCategory.toLowerCase())
        );
      }
    }
    
    // Filtra per ricerca
    if (searchQuery) {
      result = result.filter(channel => 
        channel.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredChannels(result);
  }, [channels, searchQuery, activeCategory, favorites, recentlyWatched]);

  // Gestisce il click su un canale
  const handleChannelClick = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsPlaying(true);
    
    // Aggiorna cronologia
    const updatedHistory = [
      channel,
      ...recentlyWatched.filter(item => item.id !== channel.id)
    ].slice(0, 20); // Mantieni solo gli ultimi 20
    
    setRecentlyWatched(updatedHistory);
    localStorage.setItem('recentlyWatched', JSON.stringify(updatedHistory));
  };

  // Gestisce l'aggiunta/rimozione dai preferiti
  const toggleFavorite = (channelId: string) => {
    let updatedFavorites;
    
    if (favorites.includes(channelId)) {
      updatedFavorites = favorites.filter(id => id !== channelId);
    } else {
      updatedFavorites = [...favorites, channelId];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Gestisce il cambio tema
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <ThemeProvider darkMode={darkMode}>
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="main-content">
          <Sidebar 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <div className="content-area">
            {isPlaying && selectedChannel ? (
              <VideoPlayer 
                channel={selectedChannel}
                onClose={() => setIsPlaying(false)}
                isFavorite={favorites.includes(selectedChannel.id)}
                toggleFavorite={() => toggleFavorite(selectedChannel.id)}
              />
            ) : (
              <ChannelGrid 
                channels={filteredChannels}
                favorites={favorites}
                isLoading={isLoading}
                onChannelClick={handleChannelClick}
                toggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
