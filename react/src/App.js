import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Typography } from '@mui/material';
import { useState } from 'react';


import './App.css';



console.log("APOLLO URL: "+process.env.REACT_APP_APOLLO_URL);

const rows = [
  {"name":"Hola","phone":"1234"}
]


function App() {
  const [filter, setFilter] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleChange = value => {
    console.log("EVENT "+JSON.stringify(value));


    console.log('old phone value: ', phone);
    console.log('old name value: ', name);

    setPhone(value.phone);
    setName(value.name);
  };

  const changeFilterHandle = e => {
    setFilter(e.target.value)
  }

  const changePhoneHandle = e => {
    setPhone(e.target.value)
  }

  const changeNameHandle = e => {
    setName(e.target.value)
  }
  //http://192.168.1.115:4000/

  const saveHandle = e => {
      console.log("Name: "+name);
      console.log("Phone: "+phone);

      axios.post(process.env.REACT_APP_APOLLO_URL,{'query':`mutation {upsert(name:"${name}",phone:"${phone}")}`}).then(res =>{

      return res.data.data.all;
    })
  }

  const deleteHandle = value => {
      axios.post(process.env.REACT_APP_APOLLO_URL,{'query':`mutation {  delete(name:"${value}")}`}).then(res =>{
      return res.data.data.all;
    })
  }



  let newName="";

  
    let { isLoading, error, data } = useQuery(['list',filter], () =>{
        return axios.post(process.env.REACT_APP_APOLLO_URL,{"query":`{filter(name:"${filter}"){phone name}}`}).then(res =>{
          let cdata =  JSON.stringify(res);

          return res.data.data.filter;
        })
      })

      if(!data) data=[];


      

   return (
    <div className="App">
      <Grid container spacing={2}  alignItems="center" justifyContent="center" >
        <h1>Contacts</h1>
      </Grid>
      <Grid container spacing={2}  alignItems="center" justifyContent="center" >
        <Grid item xs={9}>
          <TextField
          fullWidth
            margin="normal"
            id="phone"
            label="Filter"
            name="filter"
            autoFocus
            value={filter}
            onChange={changeFilterHandle}
         />
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={3} style={{ display:"flex", flexDirection:"row", alignItems:"center"}}>
        <Grid item xs={4}>
          <TextField
          fullWidth
            margin="normal"
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={changeNameHandle}
         />
        </Grid>
        <Grid item xs={4}>
          <TextField
          fullWidth
            margin="normal"
            id="phone"
            label="Phone"
            name="phone"
            value={phone}
            onChange={changePhoneHandle}
         />
        </Grid>
        <br/>
        <Grid item xs={4} mc={20} alignContent="start" >
          <Button 
            variant="contained" 
            onClick={saveHandle}>Save</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Phones</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                  <Typography variant="h5" component="h2">{row.name}</Typography> 
                  <Typography variant="h7" component="h4">{row.phone}</Typography>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Button variant="contained" color="info" onClick={e => handleChange(row)}><CreateIcon/></Button>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Button variant="contained" color="error" onClick={e => deleteHandle(row.name)}><DeleteIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
}

export default App;
