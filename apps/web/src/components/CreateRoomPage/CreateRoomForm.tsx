import styled from '@emotion/styled';

import { GenreSettingSection } from '@web/components/CreateRoomPage/GenreSettingSection';
import { RoomBasicInfoSection } from '@web/components/CreateRoomPage/RoomBasicInfoSection';
import { SessionLimitSettingSection } from '@web/components/CreateRoomPage/SessionLimitSettingSection';

export const CreateRoomForm = () => {
  return (
    <>
      <CreateRooomContainer>
        <RoomBasicInfoSection />
        <GenreSettingSection />
        <SessionLimitSettingSection />
      </CreateRooomContainer>
    </>
  );
};

const CreateRooomContainer = styled.div`
  display: flex;
  padding: 60px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 20px;
`;
