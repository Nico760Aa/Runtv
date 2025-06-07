/**
 * Funzione per analizzare il contenuto di un file M3U e convertirlo in un array di canali
 * @param content - Il contenuto del file M3U come stringa
 * @returns Array di oggetti Channel
 */
import { Channel } from '../types/Channel';
import { v4 as uuidv4 } from 'uuid';

export const parseM3U = (content: string): Channel[] => {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  
  let currentTitle = '';
  let currentLogo = '';
  let currentGroup = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Salta le righe vuote
    if (!line) continue;
    
    // Salta la prima riga che dovrebbe essere #EXTM3U
    if (line === '#EXTM3U') continue;
    
    // Estrai le informazioni del canale
    if (line.startsWith('#EXTINF')) {
      // Estrai il titolo
      currentTitle = line.substring(line.lastIndexOf(',') + 1).trim();
      
      // Estrai il logo se presente
      if (line.includes('tvg-logo="')) {
        const logoStart = line.indexOf('tvg-logo="') + 10;
        const logoEnd = line.indexOf('"', logoStart);
        currentLogo = line.substring(logoStart, logoEnd);
      } else {
        currentLogo = '';
      }
      
      // Estrai il gruppo se presente
      if (line.includes('group-title="')) {
        const groupStart = line.indexOf('group-title="') + 13;
        const groupEnd = line.indexOf('"', groupStart);
        currentGroup = line.substring(groupStart, groupEnd);
      } else {
        currentGroup = 'Undefined';
      }
      
      // La riga successiva dovrebbe essere l'URL
      if (i + 1 < lines.length) {
        const url = lines[i + 1].trim();
        
        // Salta se la riga successiva è un commento o vuota
        if (url && !url.startsWith('#')) {
          channels.push({
            id: uuidv4(), // Genera un ID univoco
            title: currentTitle,
            url: url,
            logo: currentLogo,
            group: currentGroup
          });
          
          // Salta la riga dell'URL che abbiamo già processato
          i++;
        }
      }
    }
  }
  
  return channels;
};
