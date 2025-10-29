command to create key pair

```sh
# create private key rs512 (pkcs8)
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096

# create public key rs512 (spki)
openssl pkey -in private_key.pem -pubout -out public_key.pem
```
