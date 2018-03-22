const express = require('express');
const aws = require('aws-sdk');

const app = express();



app.set('views', './views');
app.use(express.static('./public'));
app.engine('html', require('ejs').renderFile);
app.listen(process.env.PORT || 3001);

const S3_BUCKET = process.env.S3_BUCKET;


app.get('/account', (req, res) => res.render('account.html'));


app.get('/sign-s3', (req, res) => {
  aws.config.update({
    accessKeyId: "*******************************", //input your access key id
    secretAccessKey: "******************************", //input your secret access key
    "region": "ap-southeast-1"
  });

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Name = req.query['s3-name'];
  const s3Params = {
    Bucket: "sample-upload-testtt",
    Key: s3Name,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };


  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


/*
app.get('/sign-s3', (req, res) => {



  aws.config.update({
    accessKeyId: "AKIAJS2XRJ3R2BHYH4JA",
    secretAccessKey: "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",
    "region": "ap-southeast-1"
  });

  const s3 = new aws.S3();



  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: "sample-upload-testtt",
    Key: "fileName_" + Math.random(),
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
        signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    console.log("DATA FOR UPLOADING--> " + JSON.stringify(returnData))
    //res.send(JSON.stringify(returnData));
    //something(returnData, req, res);
    //res.end();
  });
});*/

app.post('/save-details', (req, res) => {
  // TODO: Read POSTed form data and do something useful
  //return res.send("AAAAA")
});
