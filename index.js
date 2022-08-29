const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate.js");

const serverConfig = {
  port: 8000,
  domain: "localhost",
};

const tempLoan = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(tempLoan);

const templateHtmlLoan = fs.readFileSync(
  `${__dirname}/templates/loanView.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const params = url.parse(req.url, true);

  try {
    const {
      query: { id },
      pathname,
    } = params;

    if (pathname === "/" || pathname.toLowerCase() === "/loans") {
      console.log("Got req on a valid path");

      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      const loan = dataObj[Number(id)];
      console.log({ loan });
      const loanHtml = replaceTemplate(templateHtmlLoan, loan);
      loan
        ? res.end(loanHtml)
        : res.end(`No resource with id ${id} on request path ${pathname}`);
    } else {
      res.writeHead(400, {
        "Content-Type": "text/html",
      });
      res.end("Resource not found as that is an invalid pathname");
    }
  } catch (error) {
    console.log(error);
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end("Bad request", error);
  }
});

server.listen(serverConfig.port, serverConfig.domain, () => {
  console.log(`Server listenin on port ${serverConfig.port}`);
});
