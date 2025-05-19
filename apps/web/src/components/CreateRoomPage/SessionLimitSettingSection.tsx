import styled from '@emotion/styled';
import { TextField } from '@repo/ui';

export const SessionLimitSettingSection = () => {
  return (
    <SessionLimitContainer>
      <div>세션별 최대 인원 수 정하기</div>

      <SessionContianer>
        <p>세션 1</p>
        <TextField width="60px" />
      </SessionContianer>
      <SessionContianer>
        <p>세션 2</p>
        <TextField width="60px" />
      </SessionContianer>
      <SessionContianer>
        <p>세션 3</p>
        <TextField width="60px" />
      </SessionContianer>
      <SessionContianer>
        <p>세션 4</p>
        <TextField width="60px" />
      </SessionContianer>
      <SessionContianer>
        <p>세션 5</p>
        <TextField width="60px" />
      </SessionContianer>
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

const SessionContianer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
