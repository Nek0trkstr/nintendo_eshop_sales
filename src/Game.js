import React from 'react'

class Game extends React.Component{
    constructor(){
        super()
        this.state = {
            count: 0
        }
    }

    render(){
        return(
            <div>
                <img src={this.props.image_url} width="500" height="500"></img>
                <h2>{this.props.title}</h2>
                <p>Price: <del>{this.props.price_regular}</del> {this.props.price_discounted}</p>
                <form action={"https://nintendo.co.uk" + this.props.url}>
                    <input type="submit" value="Go to eShop" />
                </form>
            </div>
        )
    }
}

export default Game