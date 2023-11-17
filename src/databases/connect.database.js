import mongoose from 'mongoose';
import config from '../configs/database.config';
import logger from '../helpers/winston.helper';

const { HOST, PORT, USER, PASS, NAME } = config;

const url = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/${NAME}?authSource=admin`;

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      mongoose.connect(url, {
        maxPoolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      logger.info('Server is connection to MongoDB Database');
    } catch (err) {
      logger.error('Error connecting to database:', err);
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }
}

export default Database.getInstance();
