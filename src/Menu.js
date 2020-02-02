import React from 'react'

function Menu({handleSortChange, sortState, categoriesSet, categoryState, handleCategoryChange}){
    let categoriesComponents = [];
    if (categoriesSet.size) {
        categoriesComponents = Array.from(categoriesSet).map((category) => {
            return <option value={category}>{category}</option>
        });
    }
    
    return(
        <div>
            <select onChange={handleSortChange} name="Sort" value={sortState} id="sortMenu">
                <option value="none">Sort</option>
                <option value="highToLow">Price high to low</option>
                <option value="lowToHigh">Price low to high</option>
            </select>
            <select onChange={handleCategoryChange} name="Category" value={categoryState} id="categoryMenu">
                <option value="none">Category</option>
                {categoriesComponents}
            </select>
        </div> 
    );
}

export default Menu;