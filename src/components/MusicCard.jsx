import React, { useState } from 'react'

function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false)

  const playlists = [
    { name: 'Lo-fi Beats', artist: 'Chill Vibes' },
    { name: 'Deep Focus', artist: 'Study Mix' },
    { name: 'Ambient Sounds', artist: 'Peaceful' }
  ]

  return (
    <div className="card music-card">
      <h2 className="card-title">🎵 Music</h2>

      <div className="music-player">
        <button
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div className="music-info">
          <p className="music-title">Lo-fi Beats</p>
          <p className="music-artist">Chill Vibes</p>
        </div>
      </div>

      <div className="playlist">
        {playlists.map((playlist, idx) => (
          <div key={idx} className="playlist-item">
            <span className="playlist-name">{playlist.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicCard
