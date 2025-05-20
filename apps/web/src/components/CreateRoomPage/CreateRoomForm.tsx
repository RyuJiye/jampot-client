import styled from '@emotion/styled';
import { Button } from '@repo/ui';

import { GenreSettingSection } from '@web/components/CreateRoomPage/GenreSettingSection';
import { RoomBasicInfoSection } from '@web/components/CreateRoomPage/RoomBasicInfoSection';
import { SessionLimitSettingSection } from '@web/components/CreateRoomPage/SessionLimitSettingSection';
import { useCreateRoomForm } from '@web/hooks/CreateRoom/useCreateRoomForm';
import { createRoom } from '@web/services/createRoom';
import { useNavigate } from 'react-router-dom';

export const CreateRoomForm = () => {
  const { form, updateField } = useCreateRoomForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await createRoom(form);
      const roomId = res.playRoomId;
      navigate(`/play-room/${roomId}`);
    } catch (e) {
      console.error(e);
      alert('합주실 생성에 실패했습니다');
    }
  };

  return (
    <>
      <CreateRoomContainer>
        <RoomBasicInfoSection
          roomName={form.name}
          setRoomName={(val) => updateField('name', val)}
          selfIntroduction={form.description}
          setSelfIntroduction={(val) => updateField('description', val)}
          profileImgUrl={form.imageUrl}
          setProfileImgUrl={(val) => updateField('imageUrl', val)}
          playerPW={form.playerPW}
          setPlayerPW={(val) => updateField('playerPW', val)}
          audiencePW={form.audiencePW}
          setAudiencePW={(val) => updateField('audiencePW', val)}
          isPlayerLocking={form.isPlayerLocking}
          setIsPlayerLocking={(val) => updateField('isPlayerLocking', val)}
          isAudienceLocking={form.isAudienceLocking}
          setIsAudienceLocking={(val) => updateField('isAudienceLocking', val)}
        />
        <GenreSettingSection
          selectedContents={form.genreList}
          setSelectedContents={(val) => updateField('genreList', val)}
        />
        <SessionLimitSettingSection
          sessionMaxPairs={form.sessionMaxPairs}
          setSessionMaxPairs={(val) => updateField('sessionMaxPairs', val)}
        />
        <Button
          colorTheme="yellow1"
          width="434px"
          height="48px"
          onClick={handleSubmit}
        >
          합주실 생성하기
        </Button>
      </CreateRoomContainer>
    </>
  );
};

const CreateRoomContainer = styled.div`
  display: flex;
  padding: 60px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 20px;
`;
