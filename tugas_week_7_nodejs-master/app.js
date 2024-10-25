const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// contoh script pembuatan folder
app.makeFolder = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    fs.mkdir(__dirname + `/${folderName}`, () => {
      console.log("success created new folder");
    });
    rl.close();
  });
};

app.makeFile = () => {
    rl.question("Masukan Nama Folder : ", (folderName) => {
        rl.question("Masukan Nama File : ", (fileName) => {
            rl.question("Masukan extension file : ", (ext) => {
                if(folderName === null){
                    fs.writeFile(__dirname + `/${fileName}.${ext}`, "", () => {
                        console.log("success created new file");
                    });
                } else if(folderName !== undefined && folderName !== null){
                    fs.mkdir(__dirname + `/${folderName}`, () => {       
                        fs.writeFile(__dirname + `/${folderName}/${fileName}.${ext}`, "", () => {
                            console.log("success created new folder and file");
                        });
                    })
                } else {
                    fs.writeFile(__dirname + `/${folderName}/${fileName}.${ext}`, "", () => {
                        console.log("success created new file");
                    });
                }
                rl.close();
            });
        });
    });
}

app.sorter = () => {
    const respon = fs.readdirSync("unorganize_folder");
    respon.forEach(file => {
        const ext = file.split('.').pop();
        if(["jpg", "jpeg", "png"].includes(ext)){
            fs.mkdir(__dirname + "/image", () => {
                fs.renameSync(__dirname + `/unorganize_folder/${file}`, __dirname + `/image/${file}`);
            });
        } else if (["txt", "md"].includes(ext)){
            fs.mkdir(__dirname + "/text", () => {
                fs.renameSync(__dirname + `/unorganize_folder/${file}`, __dirname + `/text/${file}`);
            });
        } else {
            fs.mkdir(__dirname + "/undefined_folder", () => {
                fs.renameSync(__dirname + `/unorganize_folder/${file}`, __dirname + `/undefined_folder/${file}`);
                console.log("Folder undefined created");
            })
        }
    });
    console.log("success sort");
    rl.close();
}

app.readFolder = () => {

}

app.readFile = () => {

}

// To Do : lanjutkan pembuatan logic disini

module.exports = app;
