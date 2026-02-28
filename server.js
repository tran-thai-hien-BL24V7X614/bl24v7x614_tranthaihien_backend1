const app = require("./app");
const config = require("./app/config"); // kiểm tra đúng đường dẫn

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});