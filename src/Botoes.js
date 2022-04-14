const {  Row, Col  } = 'antd';

function Botoes() {
  return (
    <div className="App">
        ReactDOM.render(
        <>
            <Row>
            <Col span={24}>col</Col>
            </Row>
            <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>col-12</Col>
            </Row>
            <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            </Row>
            <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            </Row>
        </>,
        mountNode,
        );
    </div>
  );
}

export default Botoes;
