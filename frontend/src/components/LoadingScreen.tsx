import { useEffect, useState } from 'react';
import { Monitor, ProgressBar } from 'react95';
import styled from 'styled-components';

type LoadingScreenProps = {
  onLoadComplete: () => void;
};

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 120px;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.desktopBackground};
`;

// FYI: Scaling the library's monitor component
const StyledMonitor = styled(Monitor)`
  transform: scale(2);
`;

const MonitorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url('/startup.jpg');
  background-size: 100%;
  background-position: center;
`;

const ProgressBarContainer = styled.div`
  width: 50vw;
`;

export const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // LLM NOTE: Had ChatGPTy write me this timing function.
    const timer = setInterval(() => {
      setPercent((previousPercent) => {
        if (previousPercent >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 200);
          return 100;
        }
        const diff = Math.random() * 25 + 25;
        return Math.min(previousPercent + diff, 100);
      });
    }, 400);

    return () => {
      clearInterval(timer);
    };
  }, [onLoadComplete]);

  return (
    <LoadingContainer>
      <StyledMonitor>
        <MonitorContent />
      </StyledMonitor>
      <ProgressBarContainer>
        <ProgressBar variant="tile" value={Math.floor(percent)} hideValue />
      </ProgressBarContainer>
    </LoadingContainer>
  );
};
