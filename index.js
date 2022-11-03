//inisialisasi
const express = require("express");
const cors = require("cors");
const db = require("./db");

//implementasi
const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))

//connect to database
db.connect(error =>{
    if(error) throw error
    console.log("mysql connected");
});

//endpoint
app.get("/", (req, res) => {
    res.send({
        message: "Berhasil menjalankan GET",
        data: {
            description: "berhasil menampilkan data"
        },
    });
});

app.use("/user", require("./Routes/user.route"));
app.use("/member", require("./Routes/member.route"));
app.use("/outlet", require("./Routes/outlet.route"));
app.use("/paket", require("./Routes/paket.route"));
app.use("/transaksi", require("./Routes/transaksi.route"));

const port = 6969;
app.listen(port, () => console.log(`App running at ${port}`));