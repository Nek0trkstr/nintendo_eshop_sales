import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      width: 345,
       marginBottom: 25,
    },
    regularPrice: {
        color: "#ff0000",
        textDecoration: "line-through",
    },
    media: {
      height: 100,
      paddingTop: '56.25%', // 16:9
    },
  }));  

function Game({image_url, title, price_regular, price_discounted, url, excerpt}) {
    const classes = useStyles();
    return (
        <Card className={classes.root} onClick={()=> window.open(`https://nintendo.co.uk${url}`, "_blank")}>
          <CardMedia
            className={classes.media}
            image={image_url}
            title={title}
          />
          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {excerpt}
              <br/>
                Price: {price_discounted}&#163; <span className={classes.regularPrice}>{price_regular}&#163;</span>
            </Typography>
          </CardContent>
        </Card>
      );
}

export default Game
