import crypto from 'crypto';

export default function handler(req, res) 
{
   const now = new Date();
   const year = now.getUTCFullYear();
   const month = now.getUTCMonth() + 1;
   const day = now.getUTCDate();
 
   const seed = `${year}${month}${day}`;
   const hash = crypto.createHash('sha256').update(seed).digest('hex');
   const code = hash.slice(0, Math.min(64, parseInt(5))).replace(/[^0-9]/g, '');

  res.status(200).json({ code });
}