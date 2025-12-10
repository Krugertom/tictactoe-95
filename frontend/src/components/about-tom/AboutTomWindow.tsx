// LLM NOTE: I had claude generate this for me, just for fun but used my exisiting components for the window
import { useState, useEffect } from 'react';
import { DesktopWindow } from '@/components/shared/DesktopWindow';
import { Button, GroupBox, ScrollView, Toolbar, WindowContent } from 'react95';
import styled from 'styled-components';
import { contentService, type AboutContent } from '@/services/content.service';

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
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await contentService.getAboutContent();
        setContent(data);
      } catch (error) {
        console.error('Failed to load about content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

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
            {loading ? (
              <ContentText>
                <p style={{ textAlign: 'center', padding: '32px' }}>Loading...</p>
              </ContentText>
            ) : content ? (
              <ContentText>
                <h1>{content.title}</h1>

                <p>{content.introduction}</p>

                <p>{content.background}</p>

                <h2>{content.experience.title}</h2>
                <ul>
                  {content.experience.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h2>{content.interests.title}</h2>
                <ul>
                  {content.interests.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <p style={{ marginTop: '16px', borderTop: '1px solid #000', paddingTop: '12px' }}>
                  <strong>Contact:</strong> {content.contact.email} | github.com/{content.contact.github}
                </p>
              </ContentText>
            ) : (
              <ContentText>
                <p style={{ textAlign: 'center', padding: '32px' }}>Failed to load content.</p>
              </ContentText>
            )}
          </StyledScrollView>
        </StyledGroupBox>
      </StyledWindowContent>
    </DesktopWindow>
  );
};
