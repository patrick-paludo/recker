import React, { useState, useEffect } from "react";
import { Button, Card, Progress, Space } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import './AudioPlayer.css';
// const som = require('../temp-recordings/gravacao-temporaria.wav');

const useAudio = () => {
  const [audio] = useState(new Audio('../temp-recordings/gravacao-temporaria.wav'));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      {/* <Space>
        <div>
          <Button type="text" onClick={toggle}>
            {playing ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </Button>
        </div>
        <div className="progresso">
          <Progress size="small" percent={50} showInfo={false} />
        </div>
      </Space> */}

      <Card size="small" title="Prévia:" disabled style={{ width: 300 }}>
        <p style={{ 'color': 'grey' }}>FUNÇÃO INDISPONÍVEL</p>
      </Card>

    </div>
  );
};

export default Player;