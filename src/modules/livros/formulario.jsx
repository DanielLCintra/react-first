import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import TratadorErros from '../../general/TratadorErros';

import InputCustomizado from '../../components/inputCustomizado';

export default class Formulario extends Component {
  constructor() {
    super();
    this.state = { titulo: '', preco: '', autorId: '' };
    this.enviaForm = this.enviaForm.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault();
    axios
      .post('http://cdc-react.herokuapp.com/api/livros', { titulo: this.state.titulo, preco: this.state.preco })
      .then((res) => {
        PubSub.publish('limpa-erros', res.data);
        PubSub.publish('atualiza-lista-livros', res.data);
        this.setState({ titulo: '', preco: '', autorId: '' });
        console.log('Salvo com sucesso');
      })
      .catch((error) => {
        const res = { ...error.response.data };
        if (res.status === 400) {
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
        <InputCustomizado id="preco" type="number" name="preco" value={this.state.preco} onChange={this.salvaAlteracao.bind(this, 'preco')} label="Preço" />
        <div className="pure-control-group">
          <label htmlFor="autorId">Autor</label>
          <select value={this.state.autorId} name="autorId" onChange={this.salvaAlteracao.bind(this, 'autorId')}>
            <option value="">Selecione</option>
            {
              this.props.autores.map((autor) => {
                return <option key={ autor.id } value={ autor.id }>
                          { autor.nome }
                      </option>;
              })
            }
          </select>
        </div>

        <div className="pure-control-group">
          <label />
          <button type="submit" className="pure-button pure-button-primary">Gravar</button>
        </div>
      </form>
    );
  }
}

