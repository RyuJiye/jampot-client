import { ParticipantCard } from '@repo/ui';
import styled from '@emotion/styled';

interface Peer {
  id: string;
  name: string;
  role: string;
  profileImageUrl?: string;
}

interface Props {
  peers: Peer[];
  myId: string;
  gainNodes: Record<string, GainNode>;
}

export const ParticipantList = ({ peers, myId, gainNodes }: Props) => {
  return (
    <Grid>
      {peers.map((peer) => (
        <ParticipantCard
          key={`${peer.name}-${peer.role}`}
          profileImageUrl={peer.profileImageUrl}
          name={peer.name}
          role={peer.role}
          gainNode={gainNodes[peer.id]}
          isMe={peer.id === myId}
        />
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
  padding: 24px;
`;
