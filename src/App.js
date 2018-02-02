import React, { Component } from 'react';
import axios from 'axios';
import sampleSize from 'lodash/sampleSize'
import orderBy from 'lodash/orderBy'
import './css/pure-min.css';
import './css/side-menu.css';
import InputCustomizado from './components/inputCustomizado'

class App extends Component {
  constructor() {
    super();
    this.state = { 
      lista: [],
      nome: '',
      email: '',
      senha: ''
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount() {
    const vThis = this;
    axios
      .get('http://cdc-react.herokuapp.com/api/autores')
      .then(res => {
        vThis.setState({ lista: sampleSize(orderBy(res.data, ['id'],['desc']),20) });
      })
      .catch(error => {
        console.log(error)
      })
  }

  enviaForm (evento) {
    evento.preventDefault();
    axios
      .post('http://cdc-react.herokuapp.com/api/autores',{nome: this.state.nome, email: this.state.email, senha: this.state.senha})
      .then(res => {
        this.setState({lista: orderBy(res.data, ['id'],['desc'])})
        console.log('Salvo com sucesso')
      })
      .catch(error => {
        console.log(error)
      })
  }


  setNome(evento){
    this.setState({nome: evento.target.value})
  }
  setEmail(evento){
    this.setState({email: evento.target.value})
  }
  setSenha(evento){
    this.setState({senha: evento.target.value})
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span />
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="::javascript;"className="pure-menu-link">Home</a>
              </li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadatro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
                
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="E-mail"/>
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>

                <div className="pure-control-group">
                  <label />
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map(autor => (
                      <tr key={autor.id}>
                        <td>{autor.nome}</td>
                        <td>{autor.email}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
