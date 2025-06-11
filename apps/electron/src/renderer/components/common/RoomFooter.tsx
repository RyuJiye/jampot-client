import { AudioSettingsModal } from '@electron/renderer/components/common/AudioSettingModal';
import styled from '@emotion/styled';

import { useState } from 'react';

interface RoomFooterProps {
  onLeave: () => void;
  onSelectInput: (deviceId: string) => void;
  onSelectOutput: (deviceId: string) => void;
}

export const RoomFooter = ({
  onLeave,
  onSelectInput,
  onSelectOutput,
}: RoomFooterProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <FooterContainer>
        <BottomZone>
          <LeaveButton onClick={() => setShowModal(true)}>
            오디오 설정
          </LeaveButton>
          <LeaveButton onClick={onLeave}>방 나가기</LeaveButton>
        </BottomZone>
      </FooterContainer>

      {showModal && (
        <AudioSettingsModal
          onClose={() => setShowModal(false)}
          onSelectInput={onSelectInput}
          onSelectOutput={onSelectOutput}
        />
      )}
    </>
  );
};

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
`;

const BottomZone = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 80px;
  border-top: 1px solid ${({ theme }) => theme.palette.yellow100};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  gap: 16px;
`;

const LeaveButton = styled.button`
  padding: 8px 24px;
  border-radius: 8px;

  ${({ theme }) => theme.typo.body2m};

  color: ${({ theme }) => theme.palette.white};
  background: ${({ theme }) => theme.palette.yellow600};

  &:hover {
    background: ${({ theme }) => theme.palette.yellow700};
  }
`;
