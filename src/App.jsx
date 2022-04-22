// Importações
import './App.css';
import logo from './img/logo.png';
import recButton from './img/rec-button.png';
import folderButton from './img/playlist.png';
import { Button, Layout, Row, Col } from 'antd';
import timer from "./js/timer";
import ModalSair from './components/ModalSair';
import PararGravacao from './components/PararGravacao';
const { Content } = Layout;
const startTimer = timer.start;


function App() {
  // Chamadas de funções no processo Main
  const iniciarGravacao = () => {
    window.api.send("toMain", { funcao: "iniciarGravacao" });
  }
  
  return (
    <div className="App">
      <Layout>
        <Content>
          {/* Logo */}
          <header className="App-header WhiteBG">
            <img src={logo} className="App-logo" alt="logo" />
          </header>

        <div className="WhiteBG">
          <Row>
            <Col span={24}>
              {/* Tempo de gravação */}
              <h1>
              <span id="hour">00</span>:<span id="minute">00</span>:<span id="second">00</span>:<span id="millisecond">000</span>
              </h1>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col span={9}></Col>
            <Col span={2}>
              <Button type="text" onClick={() => {iniciarGravacao(); startTimer()}}>
                <img className="botaoFunc" src={recButton}></img>
              </Button>
            </Col>
            <Col span={2}>
              {/* <Button type="text" onClick={() => {pararGravacao(); stopTimer(); salvarArquivo()}}>
                <img className="botaoFunc" src={stopButton}></img>
              </Button> */}
              <PararGravacao />
            </Col><Col span={2}>
              <Button type="text">
                <img className="botaoFunc" src={folderButton}></img>
              </Button>
              
            
            </Col>
            <Col span={9}></Col>
          </Row>
          <br/>
          <br/>
          <br/>
          <Row>
            <Col span={24}>
              {/* Ativa modal com confirmação de saída */}
              <ModalSair />
            </Col>
          </Row>
        </div>
        </Content>
      </Layout>

      
    </div>
  );
}

export default App;
