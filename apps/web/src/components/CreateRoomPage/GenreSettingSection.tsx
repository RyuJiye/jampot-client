import styled from '@emotion/styled';
import { Dropdown } from '@repo/ui';

export const GenreSettingSection = () => {
  return (
    <>
      <GenreContainer>
        <p>장르 정하기</p>
        <Dropdown
          title={'Category'}
          contents={[]}
          selectedContents={[]}
          setSelectedContents={function (selected: string[]): void {
            throw new Error('Function not implemented.');
          }}
        />
      </GenreContainer>
    </>
  );
};

const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;
