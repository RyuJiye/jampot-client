import styled from '@emotion/styled';

export const RoomInfo = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Row>
    <Label>{label}</Label>
    <Value> {children}</Value>
  </Row>
);

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

const Label = styled.div`
  ${({ theme }) => theme.typo.body1m};
  color: ${({ theme }) => theme.palette.yellow800};
`;

const Value = styled.div`
  ${({ theme }) => theme.typo.body1m};
  color: ${({ theme }) => theme.palette.gray800};
`;
