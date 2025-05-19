import styled from '@emotion/styled';
import { Dropdown } from '@repo/ui';

type GenreSettingSectionProps = {
  selectedContents: string[];
  setSelectedContents: (val: string[]) => void;
};

export const GenreSettingSection = ({
  selectedContents,
  setSelectedContents,
}: GenreSettingSectionProps) => {
  return (
    <GenreContainer>
      <p>장르 정하기</p>
      <Dropdown
        title="Category"
        contents={['ROCK', 'JAZZ', 'POP', 'JPOP']}
        selectedContents={selectedContents}
        setSelectedContents={setSelectedContents}
        width="100%"
      />
    </GenreContainer>
  );
};

const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  ${({ theme }) => theme.typo.label1m};
  color: ${({ theme }) => theme.palette.gray700};
`;
