var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
let mydb, cloudant;
var vendor; // Because the MongoDB and Cloudant use different API commands, we
            // have to check which command should be used based on the databas          // vendor.
var dbName = 'mydb';
//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));
console.log(" Philips pune running ");
console.log("philips working");
var prevFloor = -1;
var firstFlag = 0;
var standing ;
var moving ;
var change = false;
var currentFloorChange = true;
var tempFloor = -1;
var tempCurrentFloor = -1;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
var xhr = new XMLHttpRequest();
var lightState = false;
var count = 0;


/*
function f1(followCurr){
	setTimeout(function(){
	console.log("setfalse called at " + followCurr);
	updateDoc("false",(followCurr-1)/2);
	}, 25000);
}
*/

/*
var jsonobj = {
    "access_token":"n5z3SwxofHQmNSS3nQpDDNuNxzZT",
    "access_token_expires_in":"604799",
    "refresh_token":"fQApkYiiZzG9jNNprpgaSJlOghmK3td8",
    "refresh_token_expires_in":"9676799",
    "token_type":"BearerToken"
}
console.log(jsonobj);
*/

var rawdata = fs.readFileSync('tokenvalues.json');
var fileread = JSON.parse(rawdata);
console.log("at from file : " + fileread.access_token);
console.log("rt from file : " + fileread.refresh_token);
var access_token = fileread.access_token;
var refresh_token = fileread.refresh_token;




console.log("access token is : " + access_token + "\n refresh token is :  " + refresh_token);





var followCurr = -1;
var followTemp = -1;
var followNext = -1;
function updateDoc(state,lightNum){
//var url2="https://api.meethue.com/bridge/TlgKMK1ymQANBGIhCNgO7E8sK7UU0clQrqop8cXH/lights/"+lightNum+"/state";
                                         //5srtQ3j3RV-0IxxpJ7gnuj4se0dKvC4W6P0XaVqS
//var url2="https://api.meethue.com/bridge/5srtQ3j3RV-0IxxpJ7gnuj4se0dKvC4W6P0XaVqS/lights/"+lightNum+"/state";
var url2="https://api.meethue.com/bridge/5srtQ3j3RV-0IxxpJ7gnuj4se0dKvC4W6P0XaVqS/lights/1/state";
console.log("url light number : " + url2);
var JSONout;
if(state === false){
 JSONout = "{"+"\""  +"on" +"\""+":"+ state+ "}" ;

}
else{
	 JSONout = "{"+"\""  +"on" +"\""+":"+ state + ","+
	             "\"" + "bri" + "\""+":" + 254 +
	"}";

}


console.log("JSONout:"+JSONout);
var json = JSON.stringify(JSONout);
/*

  "access_token": "xA5xYQ51mYsLCj9CSn3gM3cx69YO",
    "access_token_expires_in": "604799",
    "refresh_token": "jT3JQwA0e9kRD8gFT3PGVBCyC6ho0qEy"
*/
//var Bearer = "xA5xYQ51mYsLCj9CSn3gM3cx69YO";
var str = "Bearer "+access_token;
console.log("Bearer(acces token) is:"+str);
var xhr = new XMLHttpRequest();
xhr.open("PUT", url2, true);
//xhr.setRequestHeader("Authorization", "Bearer xA5xYQ51mYsLCj9CSn3gM3cx69YO");
xhr.setRequestHeader("Authorization", str);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');

xhr.onload = function () {
	var users = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
	console.log( " response from bulb" +xhr.responseText);
	} else {
		console.error("no response from bulb");
	}
}
xhr.send(JSONout);
}



function GetFloorUpdate(){
	count++;
  console.log(count);
		if(count == 60){
		/////// update bearer
		  console.log("refreshing tokens");

				var data = "refresh_token="+refresh_token;
				console.log("data url-WWW is :"+refresh_token);
					var xhr = new XMLHttpRequest();
						xhr.withCredentials = true;

							xhr.addEventListener("readystatechange", function () {
		  					if (this.readyState === 4) {
		    				console.log(this.responseText);
                fs.writeFileSync ("tokenvalues.json", this.responseText, function(err) {
                    if (err) throw err;
                      console.log(' write complete');
                  });


								var obj = JSON.parse(this.responseText);
							//	console.log(obj);
						//		console.log(this.responseText);
								access_token = obj.access_token;
								refresh_token = obj.refresh_token;
								console.log("note below very important");
								console.log("New access_token is :" + access_token);
								console.log("New refresh_token is :" + refresh_token);

		  				}else {
								console.error("token not refreshed");
							}
							});

								xhr.open("POST", "https://api.meethue.com/oauth2/refresh?grant_type=refresh_token");
									xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
											xhr.setRequestHeader("Authorization", "Basic OHpzR0Y1OWs2dm5BN05mUDBjZXZaR0h4TDdTUWlnVEc6VllYOW02M0NFbkdwMnB5dA==");
													xhr.send(data);
													count = 0;
												}

  var url2="https://api.kone.com/api/building/iksqRtGk7Z/lift/1/2/car/0";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url2, true);
  xhr.setRequestHeader('x-ibm-client-id','50542a6f-bcd7-4af9-9609-e58009f674b9');
  xhr.setRequestHeader('x-ibm-client-secret','sM6sR2hM1qV2cF5rG1tX6hQ1iA2rN8yV1bT7oP5uD2gM7bL7mV');
  xhr.setRequestHeader('accept','application/vnd.collection+json');
  xhr.onload = function () {
  	var reader = JSON.parse(xhr.responseText);
  	if (xhr.readyState == 4 && xhr.status == "200") {

		 			var liftState = reader.collection.items;
		 			data = liftState[0].data;
		 			realliftState = data[2].value;


			    var x = reader.collection.items;
					links = x[0].links;
					currentFloor = links[1].href;
					nextFloor = links[2].href;

					cf = parseInt(currentFloor[60]);
          nf = parseInt(nextFloor[60]);


					if(cf == 6 || nf == 6){
						console.log(lightState+" "+ cf);
						if(lightState == false){
						console.log(" i am here in floor 6");
						updateDoc("true", 1);
						lightState =true;
				  	}
					}
				else if(cf != 6){
					console.log(lightState+" " + cf);
					if(lightState == true){
						console.log(" I am Not  in foor 6 , i am in floor " + cf);
						setTimeout(function(){
								updateDoc("false",1);
							}, 8000);
							lightState = false;
						}
					}
////////////////////////
/*
					if(change == false){
					tempFloor = nf;
					change = true;
						}

				  if(tempFloor != nf){

						change = false;
					}


					if(followCurr!=cf){

						console.log("folloecurr 	" +followCurr);
						console.log("follownext  " +followNext);
						console.log("followtemp  " +followTemp);

    					if(cf == nf || tempFloor == cf){
									currentFloorChange = false;
									updateDoc("true", (cf-1)/2);
              		followCurr = cf;
									followNext = nf;
									followTemp = tempFloor;

									f1(followCurr);
										}

						}
*/
						///////////////////////////
  	}
  }
  xhr.send(null);
}

function setfalse(cf){

	 setTimeout(function(){
	     updateDoc("false",cf);
		   }, 15000);

}

function StartInterval() {
 setInterval(GetFloorUpdate, 2100);
}


StartInterval();


//////////
var port = process.env.PORT || 3000
app.listen(port, function() {
  //  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
