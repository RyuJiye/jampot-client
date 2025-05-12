import styled from '@emotion/styled';
import { Header } from '@web/components/common/Header';

export const SearchRoomPage = () => {
  return (
    <>
      <Header />
      <BoardContainer></BoardContainer>
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
