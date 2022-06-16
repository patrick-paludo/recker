import { Avatar, List } from 'antd';

// Importações e declarações de variáveis
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const ListaGravacoes = (props) => {
    const data = props.arrayGravacoes;

    return ( 
        <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
        <List.Item>
            <List.Item.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<a href="https://ant.design">{item}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
        </List.Item>
    )}
    />
    );
};

export default ListaGravacoes;
