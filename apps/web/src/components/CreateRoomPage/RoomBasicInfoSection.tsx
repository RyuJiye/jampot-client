import styled from '@emotion/styled';
import { Icon, TextField, Toggle } from '@repo/ui';
import { useState } from 'react';

type RoomBasicInfoSectionProps = {
  roomName: string;
  setRoomName: (val: string) => void;
  selfIntroduction: string;
  setSelfIntroduction: (val: string) => void;
  profileImgUrl: string;
  setProfileImgUrl: (val: string) => void;
  playerPW: string;
  setPlayerPW: (val: string) => void;
  audiencePW: string;
  setAudiencePW: (val: string) => void;
  isPlayerLocking: boolean;
  setIsPlayerLocking: (val: boolean) => void;
  isAudienceLocking: boolean;
  setIsAudienceLocking: (val: boolean) => void;
};

export const RoomBasicInfoSection = ({
  roomName,
  setRoomName,
  selfIntroduction,
  setSelfIntroduction,
  profileImgUrl,
  setProfileImgUrl,
  playerPW,
  setPlayerPW,
  audiencePW,
  setAudiencePW,
  isPlayerLocking,
  setIsPlayerLocking,
  isAudienceLocking,
  setIsAudienceLocking,
}: RoomBasicInfoSectionProps) => {
  const [imageVersion, setImageVersion] = useState(Date.now());

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);
    setProfileImgUrl(localPreviewUrl);
    setImageVersion(Date.now());
  };

  return (
    <>
      <FormContainer>
        <ImageUploadWrapper>
          <label htmlFor="profile-image-upload">
            {profileImgUrl ? (
              <ProfileImage src={profileImgUrl} />
            ) : (
              <Icon name="upload" size={100} />
            )}
          </label>
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </ImageUploadWrapper>

        <RoomNameInput
          type="text"
          placeholder="합주실 이름을 입력해주세요"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <IntroduceInput
          placeholder="합주실 소개 입력"
          value={selfIntroduction}
          onChange={(e) => setSelfIntroduction(e.target.value)}
        />
      </FormContainer>

      <AccessContainer>
        <AccessTopContainer>
          <p>관중 입장 비밀번호 설정</p>
          <Toggle
            checked={isAudienceLocking}
            onChange={() => setIsAudienceLocking(!isAudienceLocking)}
          />
        </AccessTopContainer>
        <TextField
          value={audiencePW}
          width="100%"
          onChange={(e) => setAudiencePW(e.target.value)}
          placeholder="관중 비밀번호"
          disabled={!isAudienceLocking}
        />
      </AccessContainer>

      <AccessContainer>
        <AccessTopContainer>
          <p>연주자 입장 비밀번호 설정</p>
          <Toggle
            checked={isPlayerLocking}
            onChange={() => setIsPlayerLocking(!isPlayerLocking)}
          />
        </AccessTopContainer>
        <TextField
          value={playerPW}
          width="100%"
          onChange={(e) => setPlayerPW(e.target.value)}
          placeholder="연주자 비밀번호"
          disabled={!isPlayerLocking}
        />
      </AccessContainer>
    </>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: ${({ theme }) => theme.palette.white};
  justify-content: center;
  align-items: center;
`;

const ImageUploadWrapper = styled.div`
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const RoomNameInput = styled.input`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  color: ${({ theme }) => theme.palette.gray700};
  ${({ theme }) => theme.typo.body1m};
  text-align: center;
`;

const IntroduceInput = styled.textarea`
  width: 100%;
  margin-top: 6px;
  margin-bottom: 12px;
  padding: 10px;
  color: ${({ theme }) => theme.palette.gray700};
  ${({ theme }) => theme.typo.label1r};
  border: 1px solid ${({ theme }) => theme.palette.yellow200};
  border-radius: 8px;
  resize: vertical;
  min-height: 100px;
  line-height: 1.5;
`;

const AccessContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 10px;
  width: 100%;
`;

const AccessTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  ${({ theme }) => theme.typo.label1m};
  color: ${({ theme }) => theme.palette.gray700};
`;
