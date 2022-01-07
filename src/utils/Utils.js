const formatWithCurrencySymbol =(amount,currency)=>{
  // Create GH Cedi currency symbol.
var formatter = new Intl.NumberFormat('en-GH', {
    style: 'currency', 
    currency: currency, //   currency: 'GHS',
  });
  return formatter.format(amount)
}

/* function toDate(date) {
    if (date === void 0) {
      return new Date(0);
    }
    if (isDate(date)) {
      return date;
    } else {
      return new Date(parseFloat(date.toString()));
    }
  }
   //TEST
  //var ms = '1519073776000';
  //var dateFormat = "Y-m-d H:i:s.v";
 // var formatted = FormatDate(ms, dateFormat);

  function isDate(date) {
    return (date instanceof Date);
  }
  
   export  function FormatDate(date, format) {
    var d = toDate(date);
    return format
      .replace(/Y/gm, d.getFullYear().toString())
      .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
      .replace(/d/gm, ('0' + (d.getDate() + 1)).substr(-2))
      .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
      .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
      .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
      .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
  } */
 
 module.exports.formatWithCurrencySymbol = formatWithCurrencySymbol