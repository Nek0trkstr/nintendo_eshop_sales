import React from 'react';
import Game from './Game'
import Menu from './Menu'
import GamesData from './salesdemo'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gamesData: GamesData,
      sortState: 'none'
    };
    this.handleFilterChange = this.handleFilterChange.bind(this)

    this.sortStateToSortMethod = { 
      'none': () => {return 0},
      'highToLow': (a,b) => -1 * (a.price_discounted_f - b.price_discounted_f),
      'lowToHigh': (a,b) => a.price_discounted_f - b.price_discounted_f
    }
  }

  render(){
    let sortingMethod = this.sortStateToSortMethod[this.state.sortState]
    var gamesDataClone = [...this.state.gamesData]
    var sortedGames = gamesDataClone.sort(sortingMethod)
    var gameComponents = sortedGames.map(
      game => { 
        return <Game 
          key={game.fs_id} 
          title={game.title} 
          image_url={game.image_url}
          price_regular={game.price_regular_f}
          price_discounted={game.price_discounted_f}
          url={game.url}
        />
      }
    );
    return (
      <div>
        <Menu 
          handleFilterChange={this.handleFilterChange}
          sortValue={this.state.sortState}
        />
        <div id="gamesContainer">
          {gameComponents}
        </div>
      </div>
    );
  }

  handleFilterChange(event){
    let sortValue = event.target.value
    this.setState(() => {
      return {sortState: sortValue}
    })
  }
}

export default App;
