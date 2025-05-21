import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@repo/ui';

interface AudioSettingsModalProps {
  onClose: () => void;
  onSelectInput: (deviceId: string) => void;
  onSelectOutput: (deviceId: string) => void;
}

export const AudioSettingsModal = ({
  onClose,
  onSelectInput,
  onSelectOutput,
}: AudioSettingsModalProps) => {
  const [inputDevices, setInputDevices] = useState<MediaDeviceInfo[]>([]);
  const [outputDevices, setOutputDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setInputDevices(devices.filter((d) => d.kind === 'audioinput'));
      setOutputDevices(devices.filter((d) => d.kind === 'audiooutput'));
    });
  }, []);

  return (
    <Overlay>
      <Modal>
        <Section>
          <Label>입력 장치 (마이크)</Label>
          <select onChange={(e) => onSelectInput(e.target.value)}>
            {inputDevices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || '이름 없음'}
              </option>
            ))}
          </select>
        </Section>

        <Section>
          <Label>출력 장치 (스피커)</Label>
          <select onChange={(e) => onSelectOutput(e.target.value)}>
            {outputDevices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>
                {d.label || '이름 없음'}
              </option>
            ))}
          </select>
        </Section>

        <Button colorTheme="yellow2" onClick={onClose}>
          닫기
        </Button>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  max-width: 400px;
  margin: 80px auto;
  padding: 24px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const Label = styled.div`
  margin-bottom: 8px;
  ${({ theme }) => theme.typo.label1m};
`;
