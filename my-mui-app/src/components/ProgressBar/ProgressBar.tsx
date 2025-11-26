// src/components/ProgressBar.tsx

import React, { useMemo } from 'react';
import './ProgressBar.css';

// Define the shape for a message object
interface MessageThreshold {
  threshold: number;
  message: string;
}

// Define the props for our component
interface ProgressBarProps {
  /** The current progress value (0-100) */
  progress: number;

  /** An array of messages to display at different progress thresholds */
  messages: MessageThreshold[];

  /** An optional label to display above the progress bar */
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  messages,
  label,
}) => {
  // Clamp the progress value between 0 and 100 to prevent visual bugs
  const clampedProgress = Math.min(100, Math.max(0, progress));

  // Determine the current message to display based on the progress.
  // useMemo ensures this logic only re-runs when progress or messages change.
  const currentMessage = useMemo(() => {
    // Sort messages by threshold in descending order to find the correct one.
    // We create a new array with [...messages] to avoid mutating the original prop.
    const sortedMessages = [...messages].sort((a, b) => b.threshold - a.threshold);

    // Find the first message whose threshold is less than or equal to the current progress.
    const activeMessage = sortedMessages.find(msg => clampedProgress >= msg.threshold);

    return activeMessage ? activeMessage.message : '';
  }, [clampedProgress, messages]);

  return (
    <div className="progress-bar-wrapper">
      {label && <label className="progress-bar-label">{label}</label>}
      <div className="progress-bar-container">
        <div
          className="progress-bar-filler"
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label || 'Progress'}
        />
      </div>
      <div className="progress-bar-status">
        <span className="progress-bar-message" aria-live="polite">
          {currentMessage}
        </span>
        <span className="progress-bar-percentage">
          {`${Math.round(clampedProgress)}%`}
        </span>
      </div>
    </div>
  );
};