import crypto from 'crypto';

export default function handler(req, res) {
   const now = new Date();
   const hash = crypto.createHash('sha256').update(`${now.getUTCFullYear()}${now.getUTCMonth() + 1}${now.getUTCDate()}`).digest();
   const code = (hash.readUInt32BE(0) % 100000).toString().padStart(5, '0');

   res.status(200).json({ code });
}