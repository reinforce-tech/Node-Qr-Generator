import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
	.prompt([
		{
			// Pass your questions in here
			message: "Type your URL",
			name: "URL",
		},
	])
	.then((answers) => {
		// Use user feedback
		const url = answers.URL;
		let generated_Picture = qr.image(url);
		generated_Picture.pipe(fs.createWriteStream("generated_QR.png"));

		fs.writeFile("URL.txt", url, (err) => {
			if (err) throw err;
			console.log("succesfully written");
		});
	})
	.catch((error) => {
		if (error.isTtyError) {
			// Prompt couldn't be rendered in the current environment
		} else {
			// Something else went wrong
			console.log("page 404");
		}
	});
