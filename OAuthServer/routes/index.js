var express = require('express');
var axios=require('axios');
var router = express.Router();

router.get('/', function() {
  console.log('test')
})

router.post('/getAccessToken', function (req, res) {
  // let state=req.headers['x-xsrf-token'];
  axios({
    url: 'https://github.com/login/oauth/access_token?client_id=1e8c2087b97fc2955053&client_secret=c51c9025577bafe70b287e020e2377024a3bf33c&code=' + req.body.code,
    method: 'POST',
    headers: { 'Accept': 'application/json' }
  })
    .then(function (resp) {
      console.log(resp.data.access_token)
      // if (resp.data.access_token) {
      //   req.session.token = resp.data.access_token;
      // }
      res.send(resp.data);
    })
    .catch(function (err) {
      res.send(err);
    })
})

module.exports = router;
