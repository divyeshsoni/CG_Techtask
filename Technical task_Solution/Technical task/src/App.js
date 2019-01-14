import React, { Component } from 'react';
import './App.css';

class PosterCard extends Component {
  render() {
    return (
      <section className="poster-card">
        <figure>
          <img src={this.props.poster.image_src} alt={this.props.poster.title}></img>
          <article>
            <ul>
              <li className="movieTitle">{this.props.poster.title}</li>
              <li>{this.props.poster.genre}</li>
              <li>{this.props.poster.music}</li>
            </ul>
          </article>
        </figure>
      </section>
    );
  }
}

class Poster extends Component {
  render() {
    // Create movie cards/posters from given JSON object
    var cards = [];
    this.props.posters.forEach(function (poster) {

      if (poster.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }

      cards.push(<PosterCard poster={poster} key={poster.id}/>);
    }.bind(this));

    return (<div>{cards}</div>);
  }
}

class Sort extends Component {
  sortPoster(field) {
    this.props.sortPosterStateBy(field, this.props.posters, this.props.direction);
  }
  render() {
    return (
      <div className="sort-section">
        <div>Sort by
        <div className="pill" onClick={this.sortPoster.bind(this, 'title')} >Title</div></div>
      </div>
    )
  }
}

class SearchBox extends Component {
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value
    );
  }
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search by title"
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange.bind(this)}
        />
      </form>
    );
  }
}

class App extends Component {

  state = {
    'posters': this.props.posters, // default state
    'direction': -1,
    'filterText':''
  };
  sortPosterStateBy = (field, posters, direction) => {
    // Sorting ...
    posters.sort((a, b) => { if (a[field] > b[field]) { return -direction; } if (a[field] < b[field]) { return direction; } return 0; })
    // Change state
    this.setState({ 'posters': posters, 'direction': -direction });
  };

  handleUserInput= (filterText) => {
    this.setState({
      'filterText': filterText
    });
  };

  render() {
    return (
      <div>
        <SearchBox
          filterText={this.state.filterText} onUserInput={this.handleUserInput} />
        <Sort direction={this.state.direction} posters={this.props.posters} sortPosterStateBy={this.sortPosterStateBy} />
        <Poster posters={this.state.posters}   filterText={this.state.filterText} />

        <hr></hr>
      </div>

    );
  }
}

export default App;
