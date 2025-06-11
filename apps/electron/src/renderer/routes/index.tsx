import { BrowserRouter } from 'react-router-dom';

import { Route, Routes } from 'react-router-dom';

import { TestPage } from '../pages/TestPage';
import { MyPage } from '@electron/renderer/pages/MyPage';
import { SessionPage } from '@electron/renderer/pages/SessionPage';
import { SearchRoomPage } from '@electron/renderer/pages/SearchRoomPage';
import { CreateRoomPage } from '@electron/renderer/pages/CreateRoomPage';
import { RoomDetailPage } from '@electron/renderer/pages/RoomDetailPage';
import { PlayRoomPage } from '@electron/renderer/pages/PlayRoomPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/" element={<MyPage />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/search-room" element={<SearchRoomPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/play-room/:roomId" element={<PlayRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};
