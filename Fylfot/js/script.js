
var fetchNewQuoteLocal = function(callback) {
  $.getJSON('./assets/quotes.json', function(data) {
    var r = Math.round(Math.random()*(data.length-1));
    var author = data[r][0];
    var quote = data[r][1];
    callback(quote, author);
  });
};

var fetchNewQuoteOnline = function(callback) {
  var data = {method: 'getQuote', format: 'json', lang: 'en'};
  $.post('http://api.forismatic.com/api/1.0/', data)
  .done(function(res, status) {
    if (status === 'success') {
      callback(res.quoteText, res.quoteAuthor);
    } else {
      fetchNewQuoteLocal(callback);
    }
  })
  .fail(function(xhr, status, error) {
    console.log(error);
    fetchNewQuoteLocal(callback);
  });
}

var changeQuote = function() {
  callback = function(quote, author) {
    $("p#quote, cite#author").fadeOut(function() {
      $("p#quote").text(quote).fadeIn(function() {
        $("cite#author").text(author).fadeIn();
      });
    });
  };
  fetchNewQuoteOnline(callback);
};
function setTime(){
  t = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });
  document.getElementById("show_time").innerHTML = t;
  // call itself for each 0.5Sec
  var k = setTimeout(setTime, 500);
}

$(window).load(function() {
  setTime();
  changeQuote();
  setInterval(changeQuote, 50000);
});


// set current time

