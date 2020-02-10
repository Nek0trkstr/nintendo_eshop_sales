import React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Code from '@material-ui/icons/Code';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
  
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      paddingBottom: 25,
      color: "#FC2210"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: "#fff",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    search: {
        position: 'relative',
        top: 5,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(8),
        right: 155,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  }));

function Menu({handleSortChange, sortState, categoriesSet, categoryState, handleCategoryChange, handleSearchChange}){
    const classes = useStyles();
    let categoriesComponents = [];
    if (categoriesSet.size) {
        categoriesComponents = Array.from(categoriesSet).map((category) => {
            return <option value={category}>{category}</option>
        });
    }

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Code />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Nintendo eShop Sales
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                            <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchChange}
                            />
                    </div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Sort</InputLabel>
                        <Select
                            native
                            value={sortState}
                            onChange={handleSortChange}
                            inputProps={{
                                name: 'Category',
                                id: 'age-native-simple',
                            }}
                        >
                            <option value="none">Sort</option>
                            <option value="highToLow">Price high to low</option>
                            <option value="lowToHigh">Price low to high</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                        <Select
                            native
                            value={categoryState}
                            onChange={handleCategoryChange}
                            inputProps={{
                                name: 'Category',
                                id: 'age-native-simple',
                            }}
                        >
                            <option value="none">Category</option>
                            {categoriesComponents}
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </div>
        // <div>
        //     <select onChange={handleSortChange} name="Sort" value={sortState} id="sortMenu">
        //         <option value="none">Sort</option>
        //         <option value="highToLow">Price high to low</option>
        //         <option value="lowToHigh">Price low to high</option>
        //     </select>
        //     <select onChange={handleCategoryChange} name="Category" value={categoryState} id="categoryMenu">
        //         <option value="none">Category</option>
        //         {categoriesComponents}
        //     </select>
        // </div> 
    );
}

export default Menu;