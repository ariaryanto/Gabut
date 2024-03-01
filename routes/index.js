var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/* GET home page. */
router.get('/', function(req, res, next) {
      //query
      connection.query('SELECT * FROM posts ORDER BY id desc', function (err, rows) {
            //render ke view posts index
            res.render('dashboard', {
                data: rows // <-- data posts
            });
    });
});

router.get('/comment', function (req, res, next) {
  res.render('comment', {
      nama: '',
      comment: '',
      datetime: ''
  })
})

router.post('/store', function (req, res, next) {
    

  let nama   = req.body.nama;
  let comment = req.body.comment;
  let datetime = req.body.datetime;
  let errors  = false;

  if(nama.length === 0) {
      errors = true;

      // set flash message
      req.flash('error', "Silahkan Masukkan Nama");
      // render to add.ejs with flash message
      res.render('comment', {
        nama : nama,
        comment : comment,
        datetime : datetime 
      })
  }

  if(comment.length === 0) {
      errors = true;

      // set flash message
      req.flash('error', "Silahkan Masukkan Comment");
      // render to add.ejs with flash message
      res.render('comment', {
        nama : nama,
        comment : comment,
        datetime : datetime 
      })
  }

  if(datetime.length === 0) {
    errors = true;

    // set flash message
    req.flash('error', "Silahkan Masukkan Date & Time");
    // render to add.ejs with flash message
    res.render('comment', {
      nama : nama,
      comment : comment,
      datetime : datetime 
    })
}

  // if no error
  if(!errors) {

      let formData = {
        nama : nama,
        comment : comment,
        datetime : datetime    
      }
      
      // insert query
      connection.query('INSERT INTO posts SET ?', formData, function(err, result) {
          //if(err) throw err
          if (err) {
              req.flash('error', err)
               
              // render to add.ejs
              res.render('comment', {
                  nama: formData.nama,
                  comment: formData.comment,
                  datetime: formData.datetime                                       
              })
          } else {                
              req.flash('success', 'Data Berhasil Disimpan!');
              res.redirect('/');
          }
      })
  }

})

module.exports = router;
