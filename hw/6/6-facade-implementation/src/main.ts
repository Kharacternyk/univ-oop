import {FileSystemFacade} from "./fileSystemFacade";

const fileSystem = new FileSystemFacade(["/tmp/a", "/tmp/b", "/tmp/c"]);

fileSystem.writeFile("test", "Test file content");

console.log('Press enter to read the file back.');
process.stdin.once('data', function () {
    console.log(fileSystem.readFile("test"));
    process.exit();
});
