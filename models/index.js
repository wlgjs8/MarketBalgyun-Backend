const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== "projection") {
      mongoose.set("debug", true);
    }
    mongoose.connect(
      "mongodb://admin:admin@localhost:27017/admin",
      // "mongodb://heroku_53gm2dp9:ej1oca8fl2clq0b0pebj8jcb50@ds161960.mlab.com:61960/heroku_53gm2dp9",
      {
        dbName: "nodejs",
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
