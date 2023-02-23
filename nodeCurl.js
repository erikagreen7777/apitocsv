const querystring = require("querystring");
const { Curl } = require("node-libcurl");
const fs = require("fs");

const curlTest = new Curl();
const terminate = curlTest.close.bind(curlTest);

curlTest.setOpt(Curl.option.URL, "https://reqres.in/api/users");
curlTest.setOpt(Curl.option.POST, true);
curlTest.setOpt(
	Curl.option.POSTFIELDS,
	querystring.stringify({
		name: "section",
		job: "webdev",
	})
);

curlTest.on("end", function (statusCode, data, headers) {
	// console.info("Status code " + statusCode);
	// console.info("***");
	// console.info("Our response: " + data);
	// console.info("***");
	// console.info("Length: " + data.length);
	// console.info("***");
	// console.info("Total time taken: " + this.getInfo("TOTAL_TIME"))
console.log(data)
console.log(Object.keys(data))

	// fs.writeFile("data.csv", csv, "utf-8", (err) => {
	// 	if (err) console.log(err);
	// 	else console.log("Data saved");
	//   });
	this.close();
});

curlTest.on("error", terminate);

curlTest.perform();


