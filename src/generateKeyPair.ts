import * as pem from 'pem';

async function getPubKey(privKey: ByteString): Promise<ByteString> {
  return new Promise<ByteString>(
    (resolve, reject) => {
      pem.getPublicKey(privKey, (err, res) => {
        if (err) reject(res);
        else resolve(res.publicKey);
      });
    }
  );
}

async function genPrivKey(length: number): Promise<ByteString> {
  return new Promise<ByteString>(
    (resolve, reject) => {
      pem.createPrivateKey(length, (err, res) => {
        if (err) reject(err);
        else resolve(res.key);
      });
    }
  );
}

export async function generateKeyPair(length = 512) {
  let privKey = await genPrivKey(length);
  let pubKey = await getPubKey(privKey);
  if (!pubKey) {
    return null
  }
  return {
    private: privKey,
    public: pubKey,
  };
}
