import React from 'react'

function Game({image_url, title, price_regular, price_discounted, url}) {
    return(
        <div>
            <img src={image_url} alt={title} width="500" height="500"></img>
            <h2>{title}</h2>
            <p>Price: <del>{price_regular}</del> {price_discounted}</p>
            <form action={`https://nintendo.co.uk${url}`}>
                <input type="submit" value="Go to eShop" />
            </form>
        </div>
    )
}

export default Game
