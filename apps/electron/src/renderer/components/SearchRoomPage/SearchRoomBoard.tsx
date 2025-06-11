import { SavedRoomList } from '@electron/renderer/components/SearchRoomPage/SavedRoomList';
import { SearchRoomForm } from '@electron/renderer/components/SearchRoomPage/SearchRoomForm';
import { Tab } from '@repo/ui';

import { useState } from 'react';

export const SearchRoomBoard = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'liked'>('search');

  return (
    <>
      <Tab<'search' | 'liked'>
        items={[
          { label: '합주실 검색', value: 'search' },
          { label: '합주실 찜 리스트 보기', value: 'liked' },
        ]}
        selected={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'search' && <SearchRoomForm />}
      {activeTab === 'liked' && <SavedRoomList />}
    </>
  );
};
