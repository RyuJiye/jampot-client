import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getOrCreateUserId } from '@web/utils/userInfo';
import { Icon } from '@repo/ui';

import styled from '@emotion/styled';
import { useWebRTC } from '@web/hooks/PlayRoom/useWebRTC';
import { ParticipantList } from '@web/components/PlayRoomPage/ParticipantList';
import { RoomFooter } from '@web/components/common/RoomFooter';

interface LocationState {
  name: string;
  role: string;
  profileImageUrl: string;
}

export const PlayRoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { state } = useLocation();
  const { name, role, profileImageUrl } = state as LocationState;

  const id = useMemo(() => getOrCreateUserId(), []);
  const userInfo = useMemo(
    () => ({ id, name, role, profileImageUrl }),
    [id, name, role, profileImageUrl]
  );

  const {
    isConnected,
    peerList,
    handleInputSelect,
    handleOutputSelect,
    handleLeave,
    gainNodesRef,
  } = useWebRTC({
    roomId: roomId!,
    userInfo,
    onLeaveSuccess: () => navigate(-1),
  });

  return (
    <TopSection>
      <RoomContainer>
        <Icon name="chatroom" height={700} width="auto" />
        <ParticipantList
          peers={peerList}
          myId={userInfo.id}
          gainNodes={gainNodesRef.current}
        />
      </RoomContainer>
      <RoomFooter
        onLeave={handleLeave}
        onSelectInput={handleInputSelect}
        onSelectOutput={handleOutputSelect}
      />
    </TopSection>
  );
};

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.yellow100};
`;

const RoomContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  align-items: flex-start;
`;
