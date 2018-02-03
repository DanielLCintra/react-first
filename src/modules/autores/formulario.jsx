import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import TratadorErros from '../../general/TratadorErros';

import InputCustomizado from '../../components/inputCustomizado';

export default class Formulario extends Component {
  constructor() {
    super();
    this.state = { nome: '', email: '', senha: '' };
    this.enviaForm = this.enviaForm.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault();
    axios
      .post('http://cdc-react.herokuapp.com/api/autores', { nome: this.state.nome, email: this.state.email, senha: this.state.senha })
      .then((res) => {
        PubSub.publish('limpa-erros', res.data);
        PubSub.publish('atualiza-lista-autores', res.data);
        this.setState({ nome: '', email: '', senha: '' });
        console.log('Salvo com sucesso');
      })
      .catch((error) => {
        const res = { ...error.response.data };    
        if(res.status === 400) {
          new TratadorErros().publicaErros(res);
        }
      });
  }

  salvaAlteracao(nomeInput, evento) {
    const campoSendoAlterado = {};
    campoSendoAlterado[nomeInput] = evento.target.value;
    this.setState(campoSendoAlterado);
  }

  render() {
    return (
      <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

        <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} label="Nome" />
        <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="E-mail" />
        <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} label="Senha" />

        <div className="pure-control-group">
          <label />
          <button type="submit" className="pure-button pure-button-primary">Gravar</button>
        </div>
      </form>
    );
  }
}

