const functions = require('firebase-functions');
const axios = require('axios');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//exports.helloWorld = functions.https.onRequest(async(request, response) => {
//  try {
//    // 同じドメインのパスへリクエストを送るため、axiosのGETであればパスの指定だけで良い
//    const res = await axios.get("https://scrapbox.io/api/pages/marshmallow-rm/search/query?skip=0&sort=updated&limit=30&q=%E3%83%86");
//    console.log(res)
//    response.send(res);
//  } catch(e) {
//    throw e;
//  }
//});






exports.helloWorld = functions.https.onRequest((request, response) => {

      //return axios.get('https://api.ipify.org?format=json')
      if (request.query.pages == undefined || request.query.pages == null || request.query.pages == "") {
        //request.query.pages = "marshmallow-rm"
        return response.status(500).json({
          error: "set pages"
        })
      }
      if (request.query.searchword == undefined || request.query.searchword == null || request.query.searchword == "") {
        //request.query.pages = "marshmallow-rm"
        return response.status(500).json({
          error: "set searchword"
        })
      }
      return axios.get(`https://scrapbox.io/api/pages/${request.query.pages}/search/query`, {
          params: {
            skip: 0,
            sort: "updated",
            limit: 30,
            q: request.query.searchword
          },

        })
        .then(res => {
          console.log(res.data);
          return response.status(200).json({
            message: res.data
          })
        })
        .catch(err => {
          return response.status(500).json({
            error: err
          })
        })

      });