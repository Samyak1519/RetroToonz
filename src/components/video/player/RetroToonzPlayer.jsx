import { useState } from "react";

import { MediaPlayer, MediaProvider } from "@vidstack/react";

import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

import "./RetroToonzPlayer.css";

export default function RetroToonzPlayer({
  currentShow,
  startEpisode,
  goToNextEpisode,
}) {
  const [controlsVisible, setControlsVisible] = useState(true);

  if (!currentShow || !startEpisode) {
    return null;
  }

  const videoUrl = startEpisode.videoUrl;

  if (!videoUrl) {
    return (
      <div className="retrootonz-player retrootonz-player-error">
        <p>Video source not available.</p>
      </div>
    );
  }

  /*
   * Desktop poster first.
   * Falls back to mobile poster and then default poster.
   */
  const poster =
    currentShow.thumbnail ||
    currentShow.poster ||
    currentShow.thumbnailMobile ||
    currentShow.posterMobile ||
    "/media/posters-desktop/default-poster.jpg";

  const episodeTitle = startEpisode.title || "Episode";

  return (
    <MediaPlayer
      className="retrootonz-player"
      key={startEpisode.episodeId}
      title={`${currentShow.title} - ${episodeTitle}`}
      src={videoUrl}
      poster={poster}
      playsInline
      onControlsChange={(visible) => {
        setControlsVisible(visible);
      }}
      onEnded={() => {
        if (typeof goToNextEpisode === "function") {
          goToNextEpisode();
        }
      }}
    >
      <MediaProvider />

      {/* =========================================
          CUSTOM TOP-LEFT PLAYER TITLE
          ========================================= */}

      <div
        className={`retrootonz-player-title ${
          controlsVisible
            ? "retrootonz-player-title-visible"
            : "retrootonz-player-title-hidden"
        }`}
        aria-hidden="true"
      >
        <span className="retrootonz-player-title-show">
          {currentShow.title}
        </span>

        <span className="retrootonz-player-title-dot">
          •
        </span>

        <span className="retrootonz-player-title-episode">
          {episodeTitle}
        </span>
      </div>

      {/* =========================================
          VIDSTACK CONTROLS

          IMPORTANT:
          We remove Vidstack's own title slot.
          Otherwise it appears at the bottom.
          ========================================= */}

      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        smallLayout="never"
        slots={{
          title: null,
        }}
      />
    </MediaPlayer>
  );
}