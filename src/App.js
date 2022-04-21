import './App.css';
import logo from './logo.png';
import recButton from './rec-button.png';
import stopButton from './stop-button.png';
import folderButton from './playlist.png';
import { Button, Layout, Row, Col } from 'antd';
import timer from "./timer";
const { Header, Content, Footer, Sider } = Layout;

const startTimer = timer.start;
const stopTimer = timer.reset;

function App() {
  const sair = () => {
    window.api.send("toMain", { funcao: "sair" });
  }

  const iniciarGravacao = () => {
    window.api.send("toMain", { funcao: "iniciarGravacao" });
  }
  const pararGravacao = () => {
    window.api.send("toMain", { funcao: "pararGravacao" });
  }

  return (
    <div className="App">
      <Layout>
        <Content>
          <header className="App-header WhiteBG">
            <img src={logo} className="App-logo" alt="logo" />
          </header>

        <div className="WhiteBG">
          <Row>
            <Col span={24}>
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
              <Button type="text" onClick={() => {pararGravacao(); stopTimer()}}>
                <img className="botaoFunc" src={stopButton}></img>
              </Button>
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
            <Button type="primary" shape="round" danger onClick={sair}>
              SAIR
            </Button>
            </Col>
          </Row>
        </div>
        </Content>
      </Layout>

      
    </div>
  );
}

export default App;
