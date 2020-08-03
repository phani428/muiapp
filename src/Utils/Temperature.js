import React, { useState } from "react";
import {  TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
}));

export const Temperature = (props) => {
  const classes = useStyles();

  const [fr, setFR] = useState();
  const [cl, setCL] = useState();

  const handleChange = (e) => {
    if(isNaN(e.target.value) || String(e.target.value).length!==String(e.target.value).trim().length){
      return;
    }
    if (e.target.value === "") {
      setFR("");
      setCL("");
      return;
    }
    if (e.target.name === "fr") {
      setFR(e.target.value);
      let cr = ((5 / 9) * (Number(e.target.value) - 32)).toFixed(2);
      setCL(cr);
    }
    if (e.target.name === "cl") {
      setCL(e.target.value);
      let fr = ((9 / 5) * Number(e.target.value) + 32).toFixed(2);
      setFR(fr);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={5}>
          <Grid item  ></Grid>
          <Grid item  ></Grid>
        </Grid>
        <Grid container spacing={5} >
          <Grid item ></Grid>
          <Grid item >
            <TextField
              id="cl"
              name="cl"
              label="celcius"
              placeholder="enter in celcius"
              value={cl}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item ></Grid>
          <Grid item  style={{marginLeft:40}}>
            <TextField
              id="fr"
              name="fr"
              label="fahrenheit"
              placeholder="enter in fahrenheit"
              value={fr}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </div>

      <div>
        <div></div>
      </div>
    </>
  );
};

export default Temperature;
