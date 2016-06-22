var newDate = "4/30/2021";
var daysInMonth = [{1:31},{2:28},{3:31},{4:30},{5:31},{6:30},{7:31},{8:31},{9:30},{10:31},{11:30},{12:31}];

// returns true if passed in year is a leap year
var isLeapYear = function(year) {
    return (year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0));
};

var calcNextDay = function(date) {
  var digits = [];
  var parsedDate = [];
  
  //parse string and push dd, mm, and yyyy into an array
  for (var i = 0; i < date.length; i++) {
    if (!isNaN(date.charAt(i))) {
      digits.push(date.charAt(i));
    }
    if (isNaN(date.charAt(i)) || i === (date.length - 1)) {
      parsedDate.push(digits);
      digits = [];
    }
  }
  
  //convert dd, mm, and yyyy to int and calculate values for following day
  parsedDate.forEach(function(val, index){
    var joined = typeof val !== "number" ? parseInt(val.join("")) : val;
    
    // dealing with current day
    if(index === 0){
    	var currentDay = parseInt(parsedDate[1].join(""));
    	var currentMonth = joined;
      var currentYear = parseInt(parsedDate[2].join(""));
      var lastDayOfMonth = daysInMonth[currentMonth - 1][currentMonth];
      
      if(currentDay >= lastDayOfMonth){
      	if(currentMonth === 12){
        	parsedDate[0] = 1;
          parsedDate[2] = currentYear + 1;
        }else{
        	parsedDate[0] = currentMonth + 1;
        }
        
        if(currentMonth === 2 && isLeapYear(currentYear)){
        	
        	if(parsedDate[1].indexOf("9") > 0){
          	parsedDate[0] = 3;
            parsedDate[1] = 1;
            return;
          }
        	parsedDate[0] = 2;
        	parsedDate[1] = 29;
        }else{
        	parsedDate[1] = 1;
        }
      }
      
      parsedDate[index] = typeof parsedDate[index] !== "number" ? parsedDate[index].join("") : parsedDate[index];
    }
    
    // dealing with current month
    if(index === 1){
    	if(typeof joined === "number" && typeof parsedDate[1] !== "number" && !(joined === 29 && parsedDate[0] === 2)){
      		joined += 1;
		}
      parsedDate[index] = joined;
    }
    
    if(index === 2){
    	parsedDate[index] = joined;
    }
  });
  
  // convert mm, dd, and yyyy values back to a string before returning
  parsedDate = parsedDate.join("/");
  return parsedDate;
};

console.log(calcNextDay(newDate));