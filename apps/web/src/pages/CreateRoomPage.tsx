import styled from '@emotion/styled';
import { CreateRoomForm } from '@web/components/CreateRoomPage/CreateRoomForm';

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
