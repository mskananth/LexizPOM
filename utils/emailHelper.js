const imaps = require("imap-simple");
const { simpleParser } = require("mailparser");

async function getOTP() {
  const config = {
    imap: {
      user: process.env.IMAP_USER,
      password: process.env.IMAP_PASSWORD,
      host: process.env.IMAP_HOST,
      port: Number(process.env.IMAP_PORT),
      tls: true,
      authTimeout: 10000,
      tlsOptions: {
        rejectUnauthorized: false,
      },
    },
  };

  const connection = await imaps.connect(config);
  await connection.openBox("INBOX");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const messages = await connection.search(["UNSEEN"], {
    bodies: [""],
    markSeen: true,
  });

  const latest = messages[messages.length - 1];
  const parsed = await simpleParser(latest.parts[0].body);

  connection.end();

  return parsed.text;
}

module.exports = { getOTP };
