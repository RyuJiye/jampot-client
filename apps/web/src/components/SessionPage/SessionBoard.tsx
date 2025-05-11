import { Tab } from '@repo/ui';
import { SavedSessionList } from '@web/components/SessionPage/SavedSessionList';
import { SessionSearchForm } from '@web/components/SessionPage/SessionSearchForm';
import { useState } from 'react';

export const SessionBoard = () => {
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'liked'>('search');
  return (
    <>
      <Tab<'search' | 'liked'>
        items={[
          { label: '세션 검색', value: 'search' },
          { label: '세션 찜 리스트 보기', value: 'liked' },
        ]}
        selected={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'search' && <SessionSearchForm />}
      {activeTab === 'liked' && <SavedSessionList />}
    </>
  );
};
