import styled from '@emotion/styled';
import { Button } from '@repo/ui';
import { Header } from '@web/components/common/Header';
import { SearchRoomBoard } from '@web/components/SearchRoomPage/SearchRoomBoard';
import { useNavigate } from 'react-router-dom';

export const SearchRoomPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <BoardContainer>
        <SearchRoomBoard />
      </BoardContainer>
      <CreateRoomButtonContainer onClick={() => navigate('/create-room')}>
        <Button colorTheme="yellow2" width="376px" height="48px">
          합주방 만들기
        </Button>
      </CreateRoomButtonContainer>
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

const CreateRoomButtonContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 40px;
`;
