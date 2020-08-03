import React from 'react';
import { Grid } from '@material-ui/core';
import {
    
    Link
  } from "react-router-dom";

export const RealEstateParent=(props)=>{


    return (
        <>
        <Grid container>
          <Grid item style={{marginLeft:40,marginTop:40}}>
          <Link to="/realEstate" >Navigate to Tabular format</Link>
        </Grid>
        </Grid>
        <Grid container>
          <Grid item style={{marginLeft:40,marginTop:40}}>
          <Link to="/realEstateSingle"  >Navigate to Single item format</Link>
        </Grid>
        </Grid>
        
        
        
        </>


    );
}

export default  RealEstateParent;