import { CreateRoomForm } from '@electron/renderer/components/CreateRoomPage/CreateRoomForm';
import styled from '@emotion/styled';

export const CreateRoomPage = () => {
  return (
    <CreateRoomPageContainer>
      <CreateRoomForm />
    </CreateRoomPageContainer>
  );
};

const CreateRoomPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 59px 0;
  background-color: ${({ theme }) => theme.palette.yellow50};
`;
