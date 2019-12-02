const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger/index.yaml");

module.exports = server => {
	server.use("/api-docs", swaggerUi.serve);
	server.get("/api-docs", swaggerUi.setup(swaggerDocument));
};
