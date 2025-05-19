import styled from '@emotion/styled';
import { TextField } from '@repo/ui';

type SessionLimitSettingSectionProps = {
  sessionMaxPairs: { session: string; maxParticipants: number }[];
  setSessionMaxPairs: (
    val: { session: string; maxParticipants: number }[]
  ) => void;
};

const SESSION_LIST = ['Vocal', 'Guitar', 'Bass', 'Drum', 'Keyboard'];

export const SessionLimitSettingSection = ({
  sessionMaxPairs,
  setSessionMaxPairs,
}: SessionLimitSettingSectionProps) => {
  const getParticipantCount = (session: string) => {
    return (
      sessionMaxPairs.find((s) => s.session === session)?.maxParticipants ?? 0
    );
  };

  const handleChange = (session: string, value: string) => {
    const num = parseInt(value, 10) || 0;

    const updated = sessionMaxPairs.some((s) => s.session === session)
      ? sessionMaxPairs.map((s) =>
          s.session === session ? { ...s, maxParticipants: num } : s
        )
      : [...sessionMaxPairs, { session, maxParticipants: num }];

    setSessionMaxPairs(updated);
  };

  return (
    <SessionLimitContainer>
      <div>세션별 최대 인원 수 정하기</div>
      {SESSION_LIST.map((session) => (
        <SessionContainer key={session}>
          <p>{session}</p>
          <TextField
            width="60px"
            value={getParticipantCount(session)}
            onChange={(e) => handleChange(session, e.target.value)}
          />
        </SessionContainer>
      ))}
    </SessionLimitContainer>
  );
};

const SessionLimitContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.typo.label1m};
  color: ${({ theme }) => theme.palette.gray700};
`;
