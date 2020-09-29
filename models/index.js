const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "projection") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      //"mongodb://admin:admin@localhost:27017/admin",
      "mongodb+srv://market_admin:market_admin@marketcluster.kgeyg.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority",
      {
        //dbName: "nodejs",
        dbName: "market",
      },
      (error) => {
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  };
  connect();
  mongoose.connection.on("error", (error) => {
    console.error("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
  });
  require("./User");
  require("./Customer");
};
