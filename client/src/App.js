import React, { Component } from 'react';
import './App.css';

import Card from './Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      heroes: [],
      page: 0,
      pages: 0
    };
  }

  componentDidMount() {
    this.fetchHeroes(1)
    .then(data => {
      this.setState(prev => ({
        loading: false,
        heroes: [...prev.heroes, ...data.heroes],
        page: data.page,
        pages: data.pages
      }))
    });
  }

  fetchHeroes(page) {
    return fetch(`/api/heroes?p=${page}`)
      .then(res => res.json())
      .catch(e => console.log(e));
  }

  render() {
    const heroes = this.state.heroes.map((hero, i) => (
      <Card
        key={i}
        portrait={hero.attributes.image_portrait}
        backgroundImage={hero.attributes.image_card_background}
        name={hero.attributes.name}
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique justo in dui elementum vestibulum. Vestibulum ante ipsum'
      />
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Overwatch Heroes</h1>
        </header>
        <div className="card-container">
          {heroes}
        </div>
        {this.state.loading && <p className='loading'>Loading...</p>}
      </div>
    );
  }
}

export default App;
