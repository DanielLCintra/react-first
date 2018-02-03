import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import sampleSize from 'lodash/sampleSize';
import orderBy from 'lodash/orderBy';
import Formulario from './formulario';
import Tabela from './tabela';

export default class Livros extends Component {
  constructor() {
    super();
    this.state = {
      lista: [],
      autores: []
    };
  }
  componentDidMount() {
    const vThis = this;
    axios.get('http://cdc-react.herokuapp.com/api/livros').then((res) => {
      vThis.setState({ lista: sampleSize(orderBy(res.data, ['id'], ['desc']), 20) });
    }).catch((error) => {
      console.log(error);
    });

    axios.get('http://cdc-react.herokuapp.com/api/autores').then((res) => {
      vThis.setState({ autores: sampleSize(orderBy(res.data, ['id'], ['desc']), 20) });
    });

    PubSub.subscribe('atualiza-lista-livros', (topico, novaLista) => {
      this.setState({ lista: novaLista });
    });
  }
  render() {
    return (
      <div id="main">
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <Formulario autores={this.state.autores}/>
            <Tabela lista={this.state.lista} />
          </div>
        </div>
      </div>
    );
  }
}
