// LLM NOTE! I had claude generate this for me, just for fun but used my exisiting components for the window
import { DesktopWindow } from '@/components/shared/DesktopWindow';
import { Button, GroupBox, ScrollView, Toolbar, WindowContent } from 'react95';
import styled from 'styled-components';

type AboutTomWindowProps = {
  windowState: {
    position: { x: number; y: number };
    isMaximized: boolean;
  };
  onPositionChange: (position: { x: number; y: number }) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
};

const StyledToolbar = styled(Toolbar)`
  position: relative;
`;

const StyledWindowContent = styled(WindowContent)<{ $isMaximized: boolean }>`
  padding: 8px;
  height: ${({ $isMaximized }) => ($isMaximized ? 'calc(100vh - 150px)' : '450px')};
`;

const StyledGroupBox = styled(GroupBox)`
  padding: 4px;
  margin: 0;
  border-width: 1px;
  height: 100%;
`;

const StyledScrollView = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background: white;
  border: none;
`;

const ContentText = styled.div`
  padding: 16px;
  font-family: 'ms_sans_serif', sans-serif;
  font-size: 13px;
  line-height: 1.6;
  text-align: left;

  h1 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
    text-align: center;
    border-bottom: 2px solid #000;
    padding-bottom: 8px;
  }

  h2 {
    font-size: 14px;
    font-weight: bold;
    margin-top: 16px;
    margin-bottom: 8px;
    text-decoration: underline;
  }

  p {
    margin-bottom: 12px;
  }

  ul {
    margin: 8px 0;
    padding-left: 0;
    list-style: none;
  }

  li {
    margin-bottom: 8px;
    padding-left: 20px;
    text-indent: -20px;
  }

  li:before {
    content: '- ';
    padding-right: 8px;
  }
`;

export const AboutTomWindow = ({
  windowState,
  onPositionChange,
  onMinimize,
  onMaximize,
  onClose,
}: AboutTomWindowProps) => {
  return (
    <DesktopWindow
      title="About_Tom.txt"
      iconSrc="/icons/file_1.ico"
      windowState={windowState}
      onPositionChange={onPositionChange}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      width={550}
      height={550}
    >
      <StyledToolbar>
        <Button variant="menu" size="sm">
          File
        </Button>
        <Button variant="menu" size="sm">
          Edit
        </Button>
        <Button variant="menu" size="sm">
          View
        </Button>
        <Button variant="menu" size="sm">
          Help
        </Button>
      </StyledToolbar>

      <StyledWindowContent $isMaximized={windowState.isMaximized}>
        <StyledGroupBox variant="flat">
          <StyledScrollView>
            <ContentText>
              <h1>Hi, I'm Tom Kruger!</h1>

              <p>
                I'm an experienced software engineer with global and cross-industry experience,
                building scalable products across diverse tech stacks. Currently at Trinnex, I
                develop secure, high-performance data platforms and lead microservice architecture
                for municipal infrastructure solutions.
              </p>

              <p>
                Throughout my career, I've delivered solutions for enterprise clients including
                HSBC, Disney, Polestar, TD Ameritrade, Charles Schwab, DeBeers, Cisco, L'Oreal,
                United Airlines, and Mandarin Oriental.
              </p>

              <h2>EXPERIENCE</h2>
              <ul>
                <li>Full-stack development with Next.js, React, C#, Node.js, TypeScript, and Python</li>
                <li>Data platforms including PostgreSQL, MongoDB, Google BigQuery, and Snowflake</li>
                <li>Cloud infrastructure on GCP with Docker and microservices</li>
                <li>Enterprise Salesforce integrations and AI/ML model deployment</li>
                <li>8+ years international experience in China (Shanghai, Guangzhou)</li>
                <li>MS Computer Science from Northeastern University</li>
                <li>Former Managing Director at Chatly (acquired by Salesforce)</li>
              </ul>

              <h2>INTERESTS & HOBBIES</h2>
              <ul>
                <li>Woodworking and craftsmanship</li>
                <li>Cycling adventures</li>
                <li>Language learning</li>
                <li>NLP and digitizing ancient texts (especially 1st-2nd century)</li>
                <li>AmeriCorps alum</li>
                <li>Zelda: Breath of the Wild enthusiast</li>
              </ul>

              <p style={{ marginTop: '16px', borderTop: '1px solid #000', paddingTop: '12px' }}>
                <strong>Contact:</strong> krugertom@outlook.com | github.com/krugertom
              </p>
            </ContentText>
          </StyledScrollView>
        </StyledGroupBox>
      </StyledWindowContent>
    </DesktopWindow>
  );
};
