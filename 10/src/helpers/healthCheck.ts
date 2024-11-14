export function isConnected(res, connected: boolean) {
  if (connected) {
    return res.status(200).send('OK');
  } else {
    return res
      .status(500)
      .send('Error connecting to database');
  }
}