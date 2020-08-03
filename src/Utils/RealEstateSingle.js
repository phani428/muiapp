import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 1500,
    //marginTop:20,
    //marginLeft:20
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const RealEstateSingle = (props) => {
  const classes = useStyles();

  const [rows, setRows] = useState(
    getInitialState()
  );



useEffect(()=>{

  localStorage.setItem('realestatesingle',JSON.stringify(rows));

},[rows])


function getInitialState(){

  let lcl=JSON.parse(localStorage.getItem('realestatesingle'));

  if(_.isNil(lcl)){
    return ([
      {
        key: 0,
        area: "Village",
        sqfeet: 1,
        sqyard: 0,
        cent: 0,
        acre: 0,
        price: 0,
        pricetype: "sqfeet",
        totalprice:0
      },
  ]);

  }
  else{
    return lcl;
  }
}


  /* 
  
  1 acre= 100 cent
  1 cent = 48.4 sqyd
  1 sqyd= 9 sqft
  
  */
  const handleChange = (e) => {
    let key = Number(e.target.id);
    let name = e.target.name;
    let commaremovedValue=removeCommas(e.target.value);
    let value = Number(commaremovedValue);

      if (isNaN(value)) {
      return;
    }

    let rows_new = [...rows];
    rows_new.forEach((row) => {
      if (row.key === key) {
        let sqfeet = row.sqfeet;
        let sqyard = row.sqyard;
        let cent = row.cent;
        let acre = row.acre;
        let price = row.price;
        let pricetype = row.pricetype;

        if (name === "price") {
          if (pricetype === "sqfeet") {
            price = value;
            let sqfeetValue = sqfeet * price;
            //_.setWith(row,'sqfeet',sqfeetValue,Object)
            _.setWith(row, "sqyard", 9 * sqfeetValue, Object);
            _.setWith(row, "cent", 48.4 * 9 * sqfeetValue, Object);
            _.setWith(row, "acre", 100 * 48.4 * 9 * sqfeetValue, Object);
            _.setWith(row, "totalprice", sqfeetValue, Object);
            _.setWith(row, `${name}`, value, Object);
          }
          if (pricetype === "sqyard") {
            price = value;
            let sqfeetValue = (sqyard * price) / 9;
            _.setWith(row, "sqfeet", sqfeetValue, Object);
            _.setWith(row, "cent", 48.4 * 9 * sqfeetValue, Object);
            _.setWith(row, "acre", 100 * 48.4 * 9 * sqfeetValue, Object);
            _.setWith(row, "totalprice", sqyard*price, Object);
            _.setWith(row, `${name}`, value, Object);
          }
          if (pricetype === "cent") {
            price = value;
            let sqfeetValue = (cent * price) / (9 * 48.4);
            _.setWith(row, "sqfeet", sqfeetValue, Object);
            _.setWith(row, "sqyard", 9 * sqfeetValue, Object);
            //_.setWith(row,'cent',48.4*9*sqfeetValue,Object)
            _.setWith(row, "acre", 100 * 48.4 * 9 * sqfeetValue, Object);
            _.setWith(row, "totalprice", cent*price, Object);
            _.setWith(row, `${name}`, value, Object);
            
          }
          if (pricetype === "acre") {
            price = value;
            let sqfeetValue = (acre * price) / (9 * 48.4 * 100);
            _.setWith(row, "sqfeet", sqfeetValue, Object);
            _.setWith(row, "sqyard", 9 * sqfeetValue, Object);
            _.setWith(row, "cent", 48.4 * 9 * sqfeetValue, Object);
            //_.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
            _.setWith(row, "totalprice", acre*price, Object);
            _.setWith(row, `${name}`, value, Object);
          }
        }

        if (name === "sqyard") {
          let sqfeetValue = (value * price) / 9;
          _.setWith(row, "sqfeet", sqfeetValue, Object);
          _.setWith(row, "cent", 48.4 * 9 * sqfeetValue, Object);
          _.setWith(row, "acre", 100 * 48.4 * 9 * sqfeetValue, Object);
          _.setWith(row, "totalprice", value*price, Object);
          _.setWith(row, `${name}`, value, Object);
        }
        if (name === "sqfeet") {
          let sqfeetValue = value * price;
          _.setWith(row, "sqyard", 9 * sqfeetValue, Object);
          _.setWith(row, "cent", 48.4 * 9 * sqfeetValue, Object);
          _.setWith(row, "acre", 100 * 48.4 * 9 * sqfeetValue, Object);
          _.setWith(row, "totalprice", value*price, Object);
          _.setWith(row, `${name}`, value, Object);
        }
        if (name === "cent") {
          let sqfeetValue = (value * price) / (9 * 48.4);
          _.setWith(row, "sqfeet", sqfeetValue, Object);
          _.setWith(row, "sqyard", 9 * sqfeetValue, Object);
          _.setWith(row, "acre", 100 * 48.4 * 9 * sqfeetValue, Object);
          _.setWith(row, "totalprice", value*price, Object);
          _.setWith(row, `${name}`, value, Object);
        }
        if (name === "acre") {
          let sqfeetValue = (value * price) / (9 * 48.4 * 100);
          _.setWith(row, "sqfeet", sqfeetValue, Object);
          _.setWith(row, "sqyard", 9 * sqfeetValue, Object);
          _.setWith(row, "cent", 48.4 * 9 * sqfeetValue, Object);
          _.setWith(row, "totalprice", value*price, Object);
          _.setWith(row, `${name}`, value, Object);
        }

        //_.setWith(row,`${name}`,value,Object)
      }
      setRows(rows_new);
    });
  };

  function numberWithCommas(x) {
    return Number(String(x).replace(/[,]/g, "")).toLocaleString("en-IN");
  }

  function removeCommas(x) {
    return String(x).replace(/[,\s]/g, "");
  }
const handleDownload=(jsonData)=>{
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], {type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'filename.json';
  link.href = url;
  link.click();
}

const resetData=()=>{
  localStorage.removeItem('realestatesingle');
  setRows(getInitialState())
}


  const handleClear = (keyId) => {
    let key = Number(keyId);
    let rows_new = [...rows];

    rows_new.forEach((row) => {
      if (row.key === key) {
        _.setWith(row, "area", "", Object);
        _.setWith(row, "sqfeet", 1, Object);
        _.setWith(row, "sqyard", "", Object);
        _.setWith(row, "cent", "", Object);
        _.setWith(row, "acre", "", Object);
        _.setWith(row, "price", "", Object);
        _.setWith(row, "pricetype", "sqfeet", Object);
        _.setWith(row,'totalprice',0,Object)
      }
      setRows(rows_new);
    });
  };

  const handleChangePriceType = (e, keyId) => {
    let key = Number(keyId);
    let name = "pricetype";
    let value = e.target.value;

    let rows_new = [...rows];
    rows_new.forEach((row) => {
      if (row.key === key) {
        _.setWith(row, "area", "", Object);
        _.setWith(row, "sqfeet", value === "sqfeet" ? 1 : 0, Object);
        _.setWith(row, "sqyard", value === "sqyard" ? 1 : 0, Object);
        _.setWith(row, "cent", value === "cent" ? 1 : 0, Object);
        _.setWith(row, "acre", value === "acre" ? 1 : 0, Object);
        _.setWith(row, "price", "", Object);
        _.setWith(row, `${name}`, value, Object);
        _.setWith(row,'totalprice',0,Object)
      }
      setRows(rows_new);
    });
  };

  let fileReader;
  const handleFileRead=(e)=>{
      const content=fileReader.result;
      let finalData = content.replace(/\\/g, "");
      finalData=String(finalData).substring(1)
      finalData=String(finalData).substring(0,String(finalData).length-1)
      console.log(finalData);
      setRows(JSON.parse(finalData));
      

  }
  const handleChoosenFile=(file)=>{
    fileReader=new FileReader();
    fileReader.onloadend=handleFileRead;
    fileReader.readAsText(file);

  }

  return (
    <Grid container spacing={5}>
      <Grid item style={{ marginLeft: 40, marginTop: 40 }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={String(rows[0].key)}
            value={rows[0].pricetype}
            onChange={(e) => handleChangePriceType(e, String(rows[0].key))}
          >
            <MenuItem value={"sqfeet"}>sqfeet</MenuItem>
            <MenuItem value={"sqyard"}>sqyard</MenuItem>
            <MenuItem value={"cent"}>cent</MenuItem>
            <MenuItem value={"acre"}>acre</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id={String(rows[0].key)}
          name="price"
          label="price"
          placeholder="enter price"
          value={numberWithCommas(rows[0].price)}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id={String(rows[0].key)}
          name="sqfeet"
          label="sqfeet"
          placeholder="enter sqfeet"
          value={numberWithCommas(rows[0].sqfeet)}
          onChange={rows[0].pricetype === "sqfeet" ? handleChange : null}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id={String(rows[0].key)}
          name="sqyard"
          label="sqyard"
          placeholder="enter sqyard"
          value={numberWithCommas(rows[0].sqyard)}
          onChange={rows[0].pricetype === "sqyard" ? handleChange : null}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id={String(rows[0].key)}
          name="cent"
          label="cent"
          placeholder="enter cent"
          value={numberWithCommas(rows[0].cent)}
          onChange={rows[0].pricetype === "cent" ? handleChange : null}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id={String(rows[0].key)}
          name="acre"
          label="acre"
          placeholder="enter acre"
          value={numberWithCommas(rows[0].acre)}
          onChange={rows[0].pricetype === "acre" ? handleChange : null}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id={String(rows[0].key)}
          name="totalprice"
          label="total price"
          placeholder="totalprice"
          value={numberWithCommas(rows[0].totalprice)}
          onChange={null}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          id={String(rows[0].key)}
          name="clear"
          color="primary"
          onClick={() => handleClear(String(rows[0].key))}
        >
          Clear
        </Button>
        <Button
          id={String(rows[0].key)}
          name="Dowload"
          color="primary"
          onClick={() => handleDownload(JSON.stringify(getInitialState()))}
        >
          Download data
        </Button>

        <Button color="primary" /* variant="contained" */ component="label">
          Upload File
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => handleChoosenFile(e.target.files[0])}
          ></input>
        </Button>

        <Button
          id={"reset"}
          name="reset"
          color="primary"
          onClick={() => resetData()}
        >
          Reset Page
        </Button>
        
      </Grid>
    </Grid>
  );
};

export default RealEstateSingle;
