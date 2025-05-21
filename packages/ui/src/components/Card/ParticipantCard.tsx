import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Chip } from '../Chip/Chip';
import { useState } from 'react';

type ParticipantCardProps = {
  profileImageUrl?: string;
  name: string;
  role: string;
  gainNode?: GainNode;
  isMe?: boolean;
};

export const ParticipantCard = ({
  profileImageUrl,
  name,
  role,
  gainNode,
  isMe,
}: ParticipantCardProps) => {
  const theme = useTheme();
  const [gain, setGain] = useState(50);

  const handleGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setGain(value);
    if (gainNode) gainNode.gain.value = value;
  };

  return (
    <CardContainer highlight={isMe}>
      <ImageContainer>
        {profileImageUrl ? (
          <ProfileImage src={profileImageUrl} alt="profile" />
        ) : (
          <PlaceholderImage />
        )}
        <TagList>
          <Chip colorTheme="yellow">{role}</Chip>
        </TagList>
      </ImageContainer>
      <InfoArea>
        <Name>{name}</Name>
        {gainNode && (
          <VolumeSlider
            type="range"
            min={0}
            max={100}
            step={1}
            value={gain}
            onChange={handleGainChange}
            filledRatio={gain / 100}
          />
        )}
      </InfoArea>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 273px;
  height: 240px;
  padding: 18px;
  border-radius: 12px;
  background-color: ${({ highlight }) => (highlight ? '#fff9d6' : 'white')};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.gray200};
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  background-color: ${({ theme }) => theme.palette.gray100};
  border-radius: 10px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
`;

const TagList = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
`;

const InfoArea = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.div`
  ${({ theme }) => theme.typo.body1m};
  color: ${({ theme }) => theme.palette.yellow800};
`;

const VolumeSlider = styled.input<{ filledRatio: number }>`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  margin-top: 20px;
  outline: none;
  -webkit-appearance: none;

  background: ${({ theme, filledRatio }) =>
    `linear-gradient(to right, ${theme.palette.yellow500} ${filledRatio * 100}%, ${theme.palette.gray300} ${filledRatio * 100}%)`};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.yellow500};
    cursor: pointer;
    margin-top: -3px;
  }

  &::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 5px;
    background: transparent;
  }
`;
