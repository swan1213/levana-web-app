export const send = (amount: string, address: string, message: object) => ({
  send: {
    amount,
    contract: address,
    msg: Buffer.from(JSON.stringify(message)).toString("base64"),
  },
})
