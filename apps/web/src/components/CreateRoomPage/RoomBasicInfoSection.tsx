import styled from '@emotion/styled';
import { fetcher } from '@repo/api';
import { Icon, TextField, Toggle } from '@repo/ui';
import { useState } from 'react';

type RoomNameFormProps = {
  roomName: string;
  setRoomName: (val: string) => void;
  selfIntroduction: string;
  setSelfIntroduction: (val: string) => void;
  profileImgUrl: string;
  setProfileImgUrl: (val: string) => void;
};

export const RoomBasicInfoSection = ({
  roomName,
  setRoomName,
  selfIntroduction,
  setSelfIntroduction,
  profileImgUrl,
  setProfileImgUrl,
}: RoomNameFormProps) => {
  const [imageVersion, setImageVersion] = useState(Date.now());
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetcher.post<{ profileImageUrl: string }>(
        '/users/upload-profile-img',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setProfileImgUrl(res.profileImageUrl);
      setImageVersion(Date.now());
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
      console.error(error);
    }
  };
  return (
    <>
      <FormContainer>
        <ImageUploadWrapper>
          <label htmlFor="profile-image-upload">
            {profileImgUrl ? (
              <ProfileImage
                src={`${profileImgUrl}?v=${imageVersion}`}
                alt="프로필 이미지"
              />
            ) : (
              <Icon name="person" size={100} fill="#ffe58a" />
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
          placeholder="닉네임"
          defaultValue={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <IntroduceInput
          placeholder="자기소개입력하기"
          defaultValue={selfIntroduction}
          onChange={(e) => setSelfIntroduction(e.target.value)}
        />
      </FormContainer>
      <AccessContainer>
        <AccessTopContainer>
          <p>관중 입장 허용</p>
          <Toggle
            checked={false}
            onChange={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </AccessTopContainer>
        <TextField />
      </AccessContainer>
      <AccessContainer>
        <AccessTopContainer>
          <p>연주자 비번 유무</p>
          <Toggle
            checked={false}
            onChange={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </AccessTopContainer>
        <TextField />
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
  margin-bottom: 24px;
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
`;
