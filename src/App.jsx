/* eslint-disable jsx-a11y/alt-text */
// Importações
import './App.css';
import React, { useState } from 'react';
import logo from './img/logo_recker_new.png';
import recButton from './img/recording.png';
import folderButton from './img/openfolder.png';
import { Button, Layout, Row, Col, Space } from 'antd';
import timer from "./js/timer";
import ModalSair from './components/ModalSair';
import PararGravacao from './components/PararGravacao';
const { Content } = Layout;
const startTimer = timer.start;

const App = () => {
  const [isInRecording, setIsInRecording] = useState(false);

  // Chamadas de funções no processo Main
  const iniciarGravacao = () => {
    setIsInRecording(true);
    window.api.send("toMain", { funcao: "iniciarGravacao" });
  }
  
  return (
    <div className="App WhiteBG">
      <Layout>
        <Content>
          {/* Logo */}
          <header className="App-header WhiteBG">
            <img src={logo} className="App-logo" alt="logo" />
          </header>

          <div className="App WhiteBG">
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <h1>
                  <span id="hour">00</span>:<span id="minute">00</span>:<span id="second">00</span>:<span id="millisecond">000</span>
                </h1>
              <Space>
                <Button type="text" onClick={() => {iniciarGravacao(); startTimer()}}>
                  <img className="botaoFunc" src={recButton}></img>
                </Button>
                <PararGravacao 
                  key="1" isInRecording={isInRecording} setIsInRecording={setIsInRecording}
                />
                <Button type="text">
                  <img className="botaoFunc" src={folderButton}></img>
                </Button>
              </Space>
              <Space>
                <ModalSair />
              </Space>
            </Space>
          </div>
          <footer />
            
        </Content>
      </Layout>

      
    </div>
  );
}

export default App;
