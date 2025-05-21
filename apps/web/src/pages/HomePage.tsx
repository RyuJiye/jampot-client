import styled from '@emotion/styled';
import { Header } from '@web/components/common/Header';
import { SessionBoard } from '@web/components/SessionPage/SessionBoard';

export const HomePage = () => {
  const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

  return (
    <div>
      <Header />
      <h1>Home Page</h1>

      {!isElectron && <div></div>}

      {isElectron && (
        <div>
          <button
            onClick={() => {
              window.location.href = 'https://localhost:5173/';
            }}
          >
            데스크탑 앱으로 이동하기 //추후 랜딩 느낌 페이지로 디자인
          </button>
        </div>
      )}
      <BoardContainer>
        <SessionBoard />
      </BoardContainer>
    </div>
  );
};

const BoardContainer = styled.div`
  display: flex;
  padding: 136px 64px 80px 64px;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;
  align-self: stretch;
  width: 100%;
`;
