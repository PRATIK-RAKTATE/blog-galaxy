export default (err, req, res, next) => {
  console.error({
    requestId: req.id,
    message: err.message
  });

  res.status(500).json({ error: 'Internal Server Error' });
};
