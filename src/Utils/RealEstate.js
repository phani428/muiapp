

import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import {  TextField } from "@material-ui/core";
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles((theme) =>({
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
  

export const RealEstate=(props)=>{
    const classes = useStyles();
   

    const [rows, setRows] = useState(getInitialState()
      ); 
 
  function createData(area, sqfeet, sqyard, cent, acre,price,pricetype) {
    setRows(rows.concat([{ key:rows.length+1,area: area, sqfeet: 0, sqyard: sqyard, cent: cent, acre: acre,price:0,pricetype:'sqfeet',totalprice:0 }]));

  }
  
useEffect(()=>{

  localStorage.setItem('realestatemulti',JSON.stringify(rows));

},[rows])


function getInitialState(){

  let lcl=JSON.parse(localStorage.getItem('realestatemulti'));

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
        pricetype:'sqfeet',
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

    let key=Number(e.target.id);
    let name=e.target.name;
    let value=Number(removeCommas(e.target.value));
    
    if((isNaN(value) && name!=='area') || String(value).length!==String(value).trim().length){
      return;
    }


    let rows_new=[...rows]
    rows_new.forEach(row=>{
      
      if(row.key===key){
        let sqfeet=row.sqfeet;
        let sqyard=row.sqyard;
        let cent=row.cent;
        let acre=row.acre;
        let price=row.price;
        let pricetype=row.pricetype;

        if(name==='area'){
          _.setWith(row,`${name}`,e.target.value,Object);
          
        }
        if(name==='price' ){
          if(pricetype==='sqfeet'){

          price=value;
          let sqfeetValue=sqfeet*price;
          //_.setWith(row,'sqfeet',sqfeetValue,Object)
          _.setWith(row,'sqyard',9*sqfeetValue,Object)
          _.setWith(row,'cent',48.4*9*sqfeetValue,Object)
          _.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
          _.setWith(row, "totalprice", sqfeetValue, Object);
          _.setWith(row,`${name}`,value,Object)
          
          }
          if(pricetype==='sqyard'){

            price=value;
            let sqfeetValue=(sqyard*price)/9;
            _.setWith(row,'sqfeet',sqfeetValue,Object)
            _.setWith(row,'cent',48.4*9*sqfeetValue,Object)
            _.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
            _.setWith(row, "totalprice", sqyard*price, Object);
            _.setWith(row,`${name}`,value,Object)
            
            }
            if(pricetype==='cent'){

              price=value;
              let sqfeetValue=(cent*price)/(9*48.4);
              _.setWith(row,'sqfeet',sqfeetValue,Object)
              _.setWith(row,'sqyard',9*sqfeetValue,Object)
              //_.setWith(row,'cent',48.4*9*sqfeetValue,Object)
              _.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
              _.setWith(row, "totalprice", cent*price, Object);
              _.setWith(row,`${name}`,value,Object)
              
              }
              if(pricetype==='acre'){

                price=value;
                let sqfeetValue=(acre*price)/(9*48.4*100);
                _.setWith(row,'sqfeet',sqfeetValue,Object)
                _.setWith(row,'sqyard',9*sqfeetValue,Object)
                _.setWith(row,'cent',48.4*9*sqfeetValue,Object)
                //_.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
                _.setWith(row, "totalprice", acre*price, Object);
                _.setWith(row,`${name}`,value,Object)
                
                }
        }

        if(name==='sqyard' ){
            let sqfeetValue=(value*price)/9;
            _.setWith(row,'sqfeet',sqfeetValue,Object)
            _.setWith(row,'cent',48.4*9*sqfeetValue,Object)
            _.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
            _.setWith(row, "totalprice", value*price, Object);
            _.setWith(row,`${name}`,value,Object)
        }
        if(name==='sqfeet' ){
          let sqfeetValue=value*price;
            _.setWith(row,'sqyard',9*sqfeetValue,Object)
            _.setWith(row,'cent',48.4*9*sqfeetValue,Object)
            _.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
            _.setWith(row, "totalprice", value*price, Object);
            _.setWith(row,`${name}`,value,Object)
      }
      if(name==='cent'){
        let sqfeetValue=(value*price)/(9*48.4);
        _.setWith(row,'sqfeet',sqfeetValue,Object)
        _.setWith(row,'sqyard',9*sqfeetValue,Object)
        _.setWith(row,'acre',100*48.4*9*sqfeetValue,Object)
        _.setWith(row, "totalprice", value*price, Object);
        _.setWith(row,`${name}`,value,Object)
        
        }
        if(name==='acre'){

          let sqfeetValue=(value*price)/(9*48.4*100);
          _.setWith(row,'sqfeet',sqfeetValue,Object)
          _.setWith(row,'sqyard',9*sqfeetValue,Object)
          _.setWith(row,'cent',48.4*9*sqfeetValue,Object)
          _.setWith(row, "totalprice", value*price, Object);
          _.setWith(row,`${name}`,value,Object)
          
          }


        //_.setWith(row,`${name}`,value,Object)
        
      }
      setRows(rows_new);

    })
    
  }


  function numberWithCommas(x) {
    
   return Number(String(x).replace(/[,]/g,'')).toLocaleString('en-IN');
}

function removeCommas(x) {
    
  return String(x).replace(/[,\s]/g,'');
}


const handleClick=(e)=>{
  createData('new area','','','','','','')
}

const handleClear=(keyId)=>{
  let key=Number(keyId);
  let rows_new=[...rows]
  rows_new.forEach(row=>{
    
    if(row.key===key){
      _.setWith(row,'area','',Object)
      _.setWith(row,'sqfeet',1,Object)
      _.setWith(row,'sqyard','',Object)
      _.setWith(row,'cent','',Object)
      _.setWith(row,'acre','',Object)
      _.setWith(row,'price','',Object)
      _.setWith(row,'pricetype','sqfeet',Object)
      _.setWith(row,'totalprice',0,Object)
      
    }
    setRows(rows_new);

  })
}



const handleChangePriceType = (e,keyId) => {

  let key=Number(keyId);
  let name='pricetype';
  let value=(e.target.value);


  let rows_new=[...rows]
  rows_new.forEach(row=>{
    
    if(row.key===key){
      _.setWith(row,'area','',Object)
      _.setWith(row,'sqfeet',value==='sqfeet'?1:0,Object)
      _.setWith(row,'sqyard',value==='sqyard'?1:0,Object)
      _.setWith(row,'cent',value==='cent'?1:0,Object)
      _.setWith(row,'acre',value==='acre'?1:0,Object)
      _.setWith(row,'price','',Object)
      _.setWith(row,`${name}`,value,Object)
      _.setWith(row,'totalprice',0,Object)
      
    }
    setRows(rows_new);

  })
  
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
  localStorage.removeItem('realestatemulti');
  setRows(getInitialState())
}

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
      <>
        <Grid container>
          <Grid item>
            <Button color="primary" onClick={handleClick}>
              Add new row
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="simple table"
            size={"small"}
          >
            <TableHead>
              <TableRow>
                <TableCell>Area</TableCell>
                <TableCell>Price Type</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>sq.Feet</TableCell>
                <TableCell>sq.Yard / Gajam</TableCell>
                <TableCell>Cent</TableCell>
                <TableCell>Acre</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0
                ? rows.map((row) => (
                    <TableRow key={row.key}>
                      <TableCell>
                        <TextField
                          id={String(row.key)}
                          name="area"
                          placeholder="enter area name"
                          value={row.area}
                          onChange={handleChange}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">
                            Price Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id={String(row.key)}
                            value={row.pricetype}
                            onChange={(e) =>
                              handleChangePriceType(e, String(row.key))
                            }
                          >
                            <MenuItem value={"sqfeet"}>sqfeet</MenuItem>
                            <MenuItem value={"sqyard"}>sqyard</MenuItem>
                            <MenuItem value={"cent"}>cent</MenuItem>
                            <MenuItem value={"acre"}>acre</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={String(row.key)}
                          name="price"
                          placeholder="enter price"
                          value={numberWithCommas(row.price)}
                          onChange={handleChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={String(row.key)}
                          name="sqfeet"
                          placeholder="enter sqfeet"
                          value={numberWithCommas(row.sqfeet)}
                          onChange={
                            row.pricetype === "sqfeet" ? handleChange : null
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={String(row.key)}
                          name="sqyard"
                          placeholder="enter sqyard"
                          value={numberWithCommas(row.sqyard)}
                          onChange={
                            row.pricetype === "sqyard" ? handleChange : null
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        <TextField
                          id={String(row.key)}
                          name="cent"
                          placeholder="enter cent"
                          value={numberWithCommas(row.cent)}
                          onChange={
                            row.pricetype === "cent" ? handleChange : null
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={String(row.key)}
                          name="acre"
                          placeholder="enter acre"
                          value={numberWithCommas(row.acre)}
                          onChange={
                            row.pricetype === "acre" ? handleChange : null
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id={String(row.key)}
                          name="totalprice"
                          placeholder="total price"
                          value={numberWithCommas(row.totalprice)}
                          onChange={null}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          id={String(row.key)}
                          name="clear"
                          color="primary"
                          onClick={() => handleClear(String(row.key))}
                        >
                          clear this row
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          id={"Dowload"}
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


      </>
    );
}

export default  RealEstate;