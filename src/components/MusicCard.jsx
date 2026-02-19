import React, { useState, useRef, useEffect } from 'react'

const TRACKS = [
  { name: 'Lofi Chill Music', artist: 'Chill Vibes',    url: '/fassounds-good-night-lofi-cozy-chill-music-160166.mp3' },
  { name: 'Ambient Sounds',   artist: 'Autumn Ambient', url: '/soundreality-autumn-ambient-420193.mp3' },
]

function MusicCard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const audioRef = useRef(null)

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
  }

  const playTrack = (track) => {
    const audio = new Audio(track.url)
    audio.loop = true
    audio.play().catch(() => {})
    audioRef.current = audio
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      stopAll()
      setIsPlaying(false)
    } else {
      playTrack(TRACKS[currentTrackIndex])
      setIsPlaying(true)
    }
  }

  const handleNext = () => {
    const wasPlaying = isPlaying
    stopAll()
    const next = (currentTrackIndex + 1) % TRACKS.length
    setCurrentTrackIndex(next)
    if (wasPlaying) {
      playTrack(TRACKS[next])
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const handleSelectTrack = (idx) => {
    if (idx === currentTrackIndex) return
    const wasPlaying = isPlaying
    stopAll()
    setCurrentTrackIndex(idx)
    if (wasPlaying) {
      playTrack(TRACKS[idx])
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }


  useEffect(() => {
    return () => { stopAll() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const currentTrack = TRACKS[currentTrackIndex]

  return (
    <div className="card music-card">
      <h2 className="card-title">🎵 Music</h2>

      <div className="music-player">
        <button
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={handlePlayPause}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div className="music-info">
          <p className="music-title">{currentTrack.name}</p>
          <p className="music-artist">{currentTrack.artist}</p>
        </div>
        <button className="music-next-btn" onClick={handleNext}>⏭</button>
      </div>

      <div className="playlist">
        {TRACKS.map((track, idx) => (
          <div
            key={idx}
            className={`playlist-item ${idx === currentTrackIndex ? 'active' : ''}`}
            onClick={() => handleSelectTrack(idx)}
          >
            <span className="playlist-name">{track.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicCard
