// Importações e declarações de variáveis
import './App.css';
import React, { useState } from 'react';
import logo from './img/logo_recker_new.png';
import recButton from './img/recording.png';
import { Button, Layout, Space, Tooltip } from 'antd';
import timer from "./js/timer.js";
import ModalSair from './components/ModalSair.jsx';
import ModalLeitor from './components/ModalLeitor.jsx';
import PararGravacao from './components/PararGravacao.jsx';
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
                <Tooltip title="Iniciar gravação" color={"#3978fa"}>
                  <Button type="text" onClick={() => {iniciarGravacao(); startTimer()}}>
                    <img className="botaoFunc" src={recButton}></img>
                  </Button>
                </Tooltip>
                <PararGravacao 
                  key="1" isInRecording={isInRecording} setIsInRecording={setIsInRecording}
                />
                <ModalLeitor 
                  key="1" isInRecording={isInRecording}
                />
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
