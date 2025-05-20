import styled from '@emotion/styled';
import { PlayRoomDetail } from '@web/models/playroomDetail';
import { RoomInfo } from './RoomInfo';
import { Button } from '@repo/ui';

type Props = {
  data: PlayRoomDetail;
};

export const RoomDetailView = ({ data }: Props) => {
  const { name, description, genreList, sessionInfoList, imageUrl } = data;

  return (
    <DetailPageContainer>
      <Image src={imageUrl} alt="룸 이미지" />
      <InfoSection>
        <RoomInfo label="룸 이름:">{name}</RoomInfo>
        <RoomInfo label="룸 설명:">{description}</RoomInfo>
        <RoomInfo label="장르:">{genreList.join(', ')}</RoomInfo>
        <RoomInfo label="세션:">
          {sessionInfoList.map((s) => `${s.sessionName}`).join(', ')}
        </RoomInfo>

        <ButtonGroup>
          <Button colorTheme="yellow1" width="280px" height="48px">
            관중 입장하기
          </Button>
          <Button colorTheme="yellow2" width="280px" height="48px">
            연주자 입장하기
          </Button>
        </ButtonGroup>
      </InfoSection>
    </DetailPageContainer>
  );
};

const DetailPageContainer = styled.div`
  display: flex;
  padding: 120px;
  justify-content: center;
  gap: 32px;
`;

const Image = styled.img`
  width: 270px;
  object-fit: cover;
  border-radius: 16px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 32px;
`;
