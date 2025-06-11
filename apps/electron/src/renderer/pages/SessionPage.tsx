import { Header } from '@electron/renderer/components/common/Header';
import { SessionBoard } from '@electron/renderer/components/SessionPage/SessionBoard';
import styled from '@emotion/styled';

export const SessionPage = () => {
  return (
    <>
      <Header />
      <BoardContainer>
        <SessionBoard />
      </BoardContainer>
    </>
  );
};

const BoardContainer = styled.div`
  display: flex;
  padding: 136px 64px 80px 64px;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
  align-self: stretch;
  width: 100%;
`;
