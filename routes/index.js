var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  calculate("*", "X", "X");
  res.render('index');
});

// api for mathematical calculations
router.post('/calculate', function(req, res){
  console.log('/calculate api called', req.body);
  res.json({
    code: 200,
    data: calculate(req.body.method, req.body.val1, req.body.val2)
  })
})

// convert roman string to integers
function fromRoman(str) {
  var result = 0;
  // the result is now a number, not a string
  var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
  for (var i = 0;i<=decimal.length;i++) {
    while (str.indexOf(roman[i]) === 0){
      result += decimal[i];
      str = str.replace(roman[i],'');
    }
  }
  return result;
}

// perform mathematical operation on roman numbers
function calculate( method, val1, val2) {
  var result;
  if(method == "+" || method == "-" || method == "*" || method == "/"){
    result = eval(fromRoman(val1) + method + fromRoman(val2));
    console.log('result:- ', toRoman(result));
    return toRoman(result)
  } else {
    console.log('unexpected case');
    return "Wrong Input or some error Occurred!"
  }
}

// convert integer to roman string
function toRoman(num) {
  var result = '';
  // result is now a string
  var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
  for (var i = 0;i<=decimal.length;i++) {
    while (num%decimal[i] < num) {
      result += roman[i];
      num -= decimal[i];
    }
  }
  return result;
}

module.exports = router;
