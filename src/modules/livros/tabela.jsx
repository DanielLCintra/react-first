import React, { Component } from 'react';

export default class Tabela extends Component {
  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lista.map(livro => (
                <tr key={livro.id}>
                  <td>{livro.titulo}</td>
                  <td>{livro.preco}</td>
                  <td>{livro.autor.nome}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
