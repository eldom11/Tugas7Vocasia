const { ifError } = require("node:assert");
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
      try {
        console.log("Berhasil membuat folder baru");
      } catch (error) {
        console.log("gagal membuat folder", error);
        rl.close();
      }
    });
    rl.close();
  });
};

app.makeFile = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    rl.question("Masukan Nama File : ", (fileName) => {
      rl.question("Masukan extension file : ", (ext) => {
        try {
          if (folderName === null) {
            fs.writeFile(__dirname + `/${fileName}.${ext}`, "", () => {
              console.log("Berhasil membuat file baru");
            });
          } else if (folderName !== undefined && folderName !== null) {
            fs.mkdir(__dirname + `/${folderName}`, () => {
              fs.writeFile(__dirname + `/${folderName}/${fileName}.${ext}`, "", () => {
                  console.log("Berhasil membuat file didalam folder baru");
                }
              );
            });
          } else {
            fs.writeFile( __dirname + `/${folderName}/${fileName}.${ext}`, "", () => {
                console.log("Berhasil membuat file baru");
            }
            );
          }
        } catch (error) {
          console.log("gagal membuat file", error);
          rl.close();
        }
        rl.close();
      });
    });
  });
};

app.sorter = () => {
  const respon = fs.readdirSync("unorganize_folder");
  try {
    respon.forEach((file) => {
      const ext = file.split(".").pop();
      if (["jpg", "jpeg", "png"].includes(ext)) {
        fs.mkdir(__dirname + "/image", () => {
          fs.renameSync(
            __dirname + `/unorganize_folder/${file}`,
            __dirname + `/image/${file}`
          );
        });
      } else if (["txt", "md"].includes(ext)) {
        fs.mkdir(__dirname + "/text", () => {
          fs.renameSync(
            __dirname + `/unorganize_folder/${file}`,
            __dirname + `/text/${file}`
          );
        });
      } else {
        fs.mkdir(__dirname + "/undefined_folder", () => {
          fs.renameSync(
            __dirname + `/unorganize_folder/${file}`,
            __dirname + `/undefined_folder/${file}`
          );
          console.log("Folder undefined created");
        });
      }
    });
    console.log("Berhasil men-sortir file kedalam folder");
    rl.close();
  } catch (error) {
    console.log("gagal membaca folder", error);
    rl.close();
  }
};

app.readFolder = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    fs.readdir(__dirname + `/${folderName}`, { withFileTypes: true }, (err, folder) => {
        try {
          const read = [];
          folder.forEach((file) => {
            let jenis = "";
            const fileData = fs.statSync(__dirname + `/${folderName}/${file.name}`);
            const ext = file.name.split(".").pop();

            if (["jpg", "jpeg", "png"].includes(ext)) {
              jenis = "image";
            } else if (["txt", "md", "pdf", "doc", "docx", "js", "html", "json", "css"].includes(ext)) {
              jenis = "text";
            } else {
              jenis = "undefined";
            }

            read.push({
              nameFile: file.name,
              extensi: ext,
              jenisFile: jenis,
              tanggalDibuat: fileData.birthtime.toISOString().split("T")[0],
              ukuranFile: `${(fileData.size / 1024).toFixed(2)}kb`,
            });
          });

          console.log(read);
          rl.close();
        } catch (error) {
          console.log("Gagal membaca folder", err);
          rl.close();
        }
      }
    );
  });
};

app.readFile = () => {
  rl.question("Masukkan Nama File: ", (namaFile) => {
    const cariFile = (folder) => {
      try {
        const items = fs.readdirSync(folder);
        const ext = namaFile.split(".").pop();
        for (const fileOrFolder of items) {
            const fullPath = `${folder}/${fileOrFolder}`;
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory()) {
                const ketemu = cariFile(fullPath);
                if (ketemu) {
                    return ketemu;
                }
            } else if (fileOrFolder === namaFile) {
              if(["jpg", "jpeg", "png"].includes(ext)) {
                console.log("\nFile berupa Gambar")
                console.log(`\nFile ditemukan di: ${fullPath}`);
                return fullPath;
              }
              console.log(`\nIsi dari file ${namaFile}:\n\n`,fs.readFileSync(fullPath).toString());
              console.log(`\n\nFile ditemukan di: ${fullPath}`);
                return fullPath;
            }
        }
      } catch (err) {
        console.error("Terjadi kesalahan saat membaca folder:", err);
      }
      return null;
    };

    const lokasiDitemukan = cariFile(__dirname); // Memulai pencarian dari __dirname
    if (!lokasiDitemukan) {
      console.log("File tidak ditemukan.");
    }
    rl.close();
  });
};

// To Do : lanjutkan pembuatan logic disini

module.exports = app;
