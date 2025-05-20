import styled from '@emotion/styled';

interface RoomFooterProps {
  onLeave: () => void;
}

export const RoomFooter = ({ onLeave }: RoomFooterProps) => (
  <FooterContainer>
    <BottomZone>
      <LeaveButton onClick={onLeave}>방 나가기</LeaveButton>
    </BottomZone>
  </FooterContainer>
);

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
  padding: 20px 42px;
  border-top: 1px solid ${({ theme }) => theme.palette.yellow100};
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
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
