const querystring = require("querystring");
const { Curl } = require("node-libcurl");
const fs = require("fs");

const curlTest = new Curl();
const terminate = curlTest.close.bind(curlTest);
const dataHash = new Map();

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
// console.log("data " + data)
	const json = JSON.parse(data)

	const columns = Object.keys(json)
	const rows = Object.values(json)

	const csvData = columns + "\n" + rows


	// Object.keys(json).map((key) => {
	// 	if (!dataHash.get(key)) {
	// 		dataHash.set(key, key)
	// 	}
	// })
	// for (let [key, value] of dataHash) {
	// 	console.log(`${key} = ${value}`);
	//   }

	fs.writeFile("data.csv", csvData, "utf-8", (err) => {
		if (err) console.log(err);
		else console.log("Data saved");
	  });
	this.close();
});

curlTest.on("error", terminate);

curlTest.perform();


