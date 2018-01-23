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
      pages: 0,
      searchVal: '',
      filteredHeroes: []
    };
    this.queryTimeout = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    // Make sure large screens have the inital scroll bar
    this.fetchHeroes(1)    
    .then(() => {
      if (!this.state.loading && window.innerHeight > 600) {
        this.fetchHeroes(2);
      }
    })
    .then(() => {
      if (!this.state.loading && window.innerHeight > 900) {
        this.fetchHeroes(3);
      }
    })
    .then(() => {
      if (!this.state.loading && window.innerHeight > 1200) {
        this.fetchHeroes(4);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchHeroes(page) {
    return fetch(`/api/heroes?p=${page}`)
      .then(res => res.json())
      .then(data => {
        this.setState(prev => ({
          loading: false,
          heroes: [...prev.heroes, ...data.heroes],
          page: data.page,
          pages: data.pages
        }));
        if (!this.state.searchVal) {
          this.setState(prev => ({filteredHeroes: this.state.heroes}));
        };
      })
      .catch(e => console.log(e));
  }

  handleScroll = () => {
    // determine if we have scrolled to the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.state.page < this.state.pages && !this.state.loading) {
        this.setState({loading: true});
        this.fetchHeroes(this.state.page + 1);
      }
    } 
  }

  filterHeroes = event => {
    const {heroes, page, pages} = this.state;
    const searchVal = event.target.value.toLowerCase();
    this.setState({searchVal});
    if (page === pages) {
      const filteredHeroes = heroes.filter(hero => hero.attributes.slug.includes(searchVal));
      this.setState({filteredHeroes});
    } else {
      // backend search
      let to = this.queryTimeout;
      clearTimeout(to);
      this.queryTimeout = setTimeout(function() {
        this.setState({loading: true});
        this.heroSearch();
      }.bind(this), 500);
    }
  }

  heroSearch = () => {
    const query = this.state.searchVal;
    if (query) {
      return fetch(`/api/heroes/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
          this.setState({filteredHeroes: data, loading: false});
        })
        .catch(e => console.log(e));
    } else {
      this.setState({filteredHeroes: this.state.heroes, loading: false});
    }
  }

  render() {
    const filteredHeroes = this.state.filteredHeroes.map((hero, i) => (
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
          <div className="header-search">
            <input className="header-search-input" type="text" placeholder="Hero Search" onChange={this.filterHeroes}></input>
          </div>
        </header>
        <div className="card-container">
          {filteredHeroes}
        </div>
        {this.state.loading && <p className='loading'>Loading...</p>}
      </div>
    );
  }
}

export default App;
