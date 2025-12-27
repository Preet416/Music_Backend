import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayer } from "../../context/PlayerContext";

const WaveformBar = () => {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const { isPlaying } = usePlayer();

  useEffect(() => {
    const container = containerRef.current;
    const audioEl = document.getElementById("global-audio-element");
    if (!container || !audioEl) return;

    // destroy old instance
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }

    const ws = WaveSurfer.create({
      container,
      media: audioEl, // IMPORTANT: use existing audio element
      waveColor: "#334155",
      progressColor: "#22c55e",
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 40,
      responsive: true,
      cursorWidth: 0,
    });

    wavesurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, []); // once on mount

  // play/pause sync (optional extra)
  useEffect(() => {
    const ws = wavesurferRef.current;
    if (!ws) return;

    if (isPlaying) {
      ws.play();
    } else {
      ws.pause();
    }
  }, [isPlaying]);

  return <div ref={containerRef} className="w-full h-10" />;
};

export default WaveformBar;
