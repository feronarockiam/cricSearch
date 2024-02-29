const  express=require('express')
const app= express()
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))
const path = require('path');
const cors = require('cors');
const axios = require('axios');
app.use(express.static(__dirname + "/views"));

app.use(cors({
    origin:true,
    optionsSuccessStatus: 200,
    credentials: true
}));

app.get('/',(req,res)=>{
    console.log(__dirname)
    res.sendFile(path.join(__dirname+'/views/index.html'))
})

app.post('/search', (req, res) => {
  console.log("in search");
  const streamId = 'st-efc754c6-434b-5baa-aba1-7164235a2191'; // Replace 'your_stream_id' with your actual stream ID
  const url = `https://searchassist.kore.ai/searchassistapi/external/stream/${streamId}/advancedSearch`;
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6ImNzLTViM2U1NDc5LTYzODAtNTkzMi05NDQyLWIyMmNjYWY0ZTRjYyJ9.vX47bkZhphQZQP3gYMnGCovySfEpX189qrotJkWQqZc'; // Replace 'your_jwt_token' with your actual JWT token
  
  const data = {
      query: req.body.query,
      // Add any additional parameters for advanced search as needed
  };

  const axiosConfig = {
      headers: {
          'auth': `${accessToken}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
  };

  axios.post(url, data, axiosConfig)
      .then(response => {
        console.log(response);
          console.log(response.data.template.graph_answer.payload.center_panel.data[0].snippet_content[0].answer_fragment);
          res.json(response.data); // Send the response data back to the client
      })
      .catch(error => {
          console.error('Axios error:', error.message);
          res.status(500).send('Internal Server Error');
      });
});




app.listen(process.env.PORT ||3232,()=>{
    console.log('server running ')
})