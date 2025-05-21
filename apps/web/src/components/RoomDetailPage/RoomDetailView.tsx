import styled from '@emotion/styled';
import { PlayRoomDetail } from '@web/models/playroomDetail';
import { RoomInfo } from './RoomInfo';
import { Button, Icon } from '@repo/ui';

type Props = {
  data: PlayRoomDetail;
  onEnterPlayer: () => void;
  onEnterAudience: () => void;
};

export const RoomDetailView = ({
  data,
  onEnterAudience,
  onEnterPlayer,
}: Props) => {
  const { name, description, genreList, sessionInfoList, imageUrl } = data;

  return (
    <DetailPageContainer>
      <DetailContent>
        <Image src={imageUrl} alt="룸 이미지" />

        <InfoSection>
          <RoomInfo label="룸 이름:">{name}</RoomInfo>
          <RoomInfo label="룸 설명:">{description}</RoomInfo>
          <RoomInfo label="장르:">{genreList.join(', ')}</RoomInfo>
          <RoomInfo label="세션:">
            {sessionInfoList.map((s) => `${s.sessionName}`).join(', ')}
          </RoomInfo>

          <ButtonGroup>
            <Button
              colorTheme="yellow1"
              width="280px"
              height="48px"
              onClick={onEnterAudience}
            >
              관중 입장하기
            </Button>
            <Button
              colorTheme="yellow2"
              width="280px"
              height="48px"
              onClick={onEnterPlayer}
            >
              연주자 입장하기
            </Button>
          </ButtonGroup>
          <Icon name="month5" size={600} />
        </InfoSection>
      </DetailContent>
    </DetailPageContainer>
  );
};

const DetailPageContainer = styled.div`
  display: flex;
  padding: 140px;
  justify-content: center;
  width: 100%;
  min-height: 100vh;

  background: linear-gradient(
    to bottom,
    #ffffff 10%,
    #fff9e3 30%,
    #ffe58a 80%,
    #ffdd5c 100%
  );
`;
const DetailContent = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #f7f7f7;

  height: 600px;
  padding: 32px;
  gap: 32px;

  box-shadow: 0px 4px 16px #ffdd5c33;
`;
const Image = styled.img`
  width: 380px;
  height: 240px;
  object-fit: cover;
  border-radius: 16px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 32px;
`;
