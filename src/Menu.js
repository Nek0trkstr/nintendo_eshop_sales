import React from 'react'

class Menu extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <select onChange={this.props.handleFilterChange} name="Sort" value={this.props.sortValue} id="sortMenu">
                    <option value="none">--Please choose an option--</option>
                    <option value="highToLow">Price high to low</option>
                    <option value="lowToHigh">Price low to high</option>
                </select>
                {/* <select name="Filter" value="" */}
            </div> 
        );
    }
}

export default Menu;