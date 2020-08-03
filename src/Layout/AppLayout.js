import React from "react";

import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Banking from '../Utils/Banking';
import RealEstate from '../Utils/RealEstate';
import RealEstateSingle from '../Utils/RealEstateSingle';
import RealEstateParent from '../Utils/RealEstateParent';

import Temperature from '../Utils/Temperature';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  
}));


export const AppLayout = () => {
  const classes = useStyles();

  return (
    <>

<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit"><Link to="/banking" style={{color:'white'}}>Banking</Link></Button>
          <Button color="inherit"> <Link to="/realEstateParent" style={{color:'white'}}>RealEstate</Link></Button>
          <Button color="inherit"> <Link to="/temperature" style={{color:'white'}}>Temperature</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
    

    <Switch>
                  <Route path="/banking">
                    <Banking />
                  </Route>
                  <Route path="/realEstateParent">
                    <RealEstateParent />
                  </Route>

                  <Route path="/realEstate">
                    <RealEstate />
                  </Route>

                  <Route path="/realEstateSingle">
                    <RealEstateSingle />
                  </Route>

                  <Route path="/temperature">
                    <Temperature />
                  </Route>
                  <Route path="/">
                  <Temperature />
                  </Route>
                </Switch>
                </>
  );
};




export default AppLayout;