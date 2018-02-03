import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import sampleSize from 'lodash/sampleSize';
import orderBy from 'lodash/orderBy';
import Formulario from './formulario';
import Tabela from './tabela';

export default class Autores extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
    };
  }
  componentDidMount() {
    const vThis = this;
    axios.get('http://cdc-react.herokuapp.com/api/autores').then((res) => {
      vThis.setState({ lista: sampleSize(orderBy(res.data, ['id'], ['desc']), 20) });
    }).catch((error) => {
      console.log(error);
    });

    PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
      this.setState({ lista: novaLista });
    });
  }
  render() {
    return (
      <div id="main">
        <div className="header">
          <h1>Cadatro de Autores</h1>
        </div>
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <Formulario />
            <Tabela lista={this.state.lista} />
          </div>
        </div>
      </div>
    );
  }
}
