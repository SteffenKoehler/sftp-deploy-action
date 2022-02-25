const Client = require("ssh2-sftp-client");
const core = require("@actions/core");

const sftpConfig = {
  host: core.getInput('host'),
  port: core.getInput('port') || "21",
  username: core.getInput('username'),
  password: core.getInput('password'),
};

const params = {
  remoteDir: core.getInput("remoteDir") || "./",
  localDir: core.getInput("localDir") || "dist",
  cleanup: core.getInput("cleanup").toLowerCase() === "true",
};

const client = new Client();

async function start() {
  try {
    await client.connect(sftpConfig);
    core.info("Connected");

    if (params.cleanup) {
      core.info("Cleanup start");

      const files = await client.list(params.remoteDir);

      for (const file of files) {
        if (file.type === "d") {
          await client.rmdir(file.name, true);
        } else {
          await client.delete(file.name);
        }
      }

      core.info("Cleanup end");
    }

    client.on("upload", (info) => {
      core.info(`Uploaded: ${info.source}`);
    });

    core.info("Upload start");
    await client.uploadDir(params.localDir, params.remoteDir);
    core.info("Upload end");
  } catch (error) {
    core.setFailed(error);
  }
}

start().finally(() => {
  core.info("Disconnected");
  client.end();
});
