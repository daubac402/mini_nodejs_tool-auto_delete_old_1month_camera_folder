//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '4C00968PAGAA968');

var deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
                console.log('Removed: ' + curPath);
            }
        });
        fs.rmdirSync(path);
        console.log('Removed: ' + path);
    }
};

// MAIN
//passsing directoryPath and callback function
fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    var last_month_date = new Date();
    last_month_date.setMonth(last_month_date.getMonth() - 1);
    var last_month_date_string = last_month_date.toISOString().split('T')[0];
    console.log(last_month_date_string);

    //listing all files using forEach
    files.forEach(function(file_name) {
    	var arr = ['DVRWorkDirectory','.tmp.drivedownload'];
    	if (arr.indexOf(file_name) >= 0) {
    		return;
    	}
        if (file_name <= last_month_date_string) {
        	deleteFolderRecursive(path.join(directoryPath, file_name));
        }
    });
});