import cors from 'cors';


let corsOrigins = {
  origin: '*',
};

export default (req, res, next) => {
  cors(corsOrigins);
  next();
};