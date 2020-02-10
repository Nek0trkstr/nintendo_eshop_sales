import React from 'react';
import Game from './Game';
import AppMenu from './Menu';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      gamesData: '',
      gamesToRender: '',
      sortState: 'none',
      categories: {},
      categoryState: 'none',
      searchState: '',
    };
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.sortStateToSortMethod = { 
      'none': () => {return 0},
      'highToLow': (a,b) => -1 * (a.price_discounted_f - b.price_discounted_f),
      'lowToHigh': (a,b) => a.price_discounted_f - b.price_discounted_f
    }
  }

  render(){
    const sortingMethod = this.sortStateToSortMethod[this.state.sortState]
    const gamesDataClone = [...this.state.gamesToRender]
    const sortedGames = gamesDataClone.sort(sortingMethod)
    const gameComponents = sortedGames.map(
      game => { 
        return <Game 
          key={game.fs_id} 
          title={game.title} 
          image_url={game.image_url}
          price_regular={game.price_regular_f}
          price_discounted={game.price_discounted_f}
          url={game.url}
          excerpt={game.excerpt}
        />
      }
    );
    return (
      <div>
        {!this.state.loaded && <LinearProgress style={{alignSelf: 'flex-end'}} variant="query" color="secondary" />}
        <AppMenu 
          handleSortChange={this.handleSortChange}
          sortValue={this.state.sortState}
          categoriesSet={this.state.categories}
          categoryState={this.state.categoryState}
          handleCategoryChange={this.handleCategoryChange}
          handleSearchChange={this.handleSearchChange}
        />
        <div id="gamesContainer">
          {gameComponents}
        </div>
      </div>
    );
  }

  handleSortChange(event){
    const sortValue = event.target.value;
    this.setState(() => {
      return {sortState: sortValue}
    })
  }

  handleSearchChange(event){
    const searchValue = event.target.value;
    const gamesDataClone = [...this.state.gamesData]
    const filterParams = {categoryState: this.state.categoryState, searchState: searchValue}
    let filteredGames = {};
    filteredGames = gamesDataClone.filter((game) => this.isGamePassesFilters(game, filterParams));
    this.setState(()=>{
      return {
        searchState: searchValue,
        gamesToRender: filteredGames,
      }
    });
  }

  handleCategoryChange(event){
    const categoryValue = event.target.value;
    const gamesDataClone = [...this.state.gamesData]
    const filterParams = {categoryState: categoryValue, searchState: this.state.searchState}
    let filteredGames = {};
    filteredGames = gamesDataClone.filter((game) => this.isGamePassesFilters(game, filterParams))
    this.setState(() => {
      return {
        categoryState: categoryValue,
        gamesToRender: filteredGames,
      }
    });
  }

  isGamePassesFilters(game, filterParams){
    const { categoryState, searchState} = filterParams;
    if (categoryState.toLowerCase() !== 'none') {
      if (!game.pretty_game_categories_txt.includes(categoryState)) {
        return false;
      }
    }
    if (searchState.toLowerCase() !== '') {
      if (!game.title.toLowerCase().includes(searchState)){
        return false;
      }
    }
    return true;
  }

  componentDidMount(){
    fetch('https://cors-anywhere.herokuapp.com/https://searching.nintendo-europe.com/en/select?q=*&fq=type%3AGAME%20AND%20((price_has_discount_b%3A%22true%22))%20AND%20sorting_title%3A*%20AND%20*%3A*&sort=score%20desc%2C%20date_from%20desc&start=0&rows=999&wt=json&bf=linear(ms(priority%2CNOW%2FHOUR)%2C1.1e-11%2C0)&bq=deprioritise_b%3Atrue%5E-1000&json.wrf=nindo.net.jsonp.jsonpCallback_946_7100000038045')
    .then(res => res.text())
    .then(dataStr => {
      let startIndex = dataStr.indexOf('(')
      let reponseData = dataStr.substr(startIndex + 1, dataStr.length - 50)
      return JSON.parse(reponseData).response.docs
    })
    .then((gamesJson) => {
      let categoriesSet = new Set();
      gamesJson.forEach(element => {
        element.pretty_game_categories_txt.forEach((category) => categoriesSet.add(category))
      })
      this.setState(() => {
        return {
          loaded: true,
          categories: categoriesSet,
          gamesData: gamesJson,
          gamesToRender: gamesJson
        }
      })
    })
  }
}

export default App;
