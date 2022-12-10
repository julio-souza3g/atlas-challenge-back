import 'dotenv/config';
import { MongoHelper } from "./database/mongodb/mongo-helper";

MongoHelper.connect(process.env.MONGO_ATLAS_URL).then(async () => {
  const app = (await import('./app')).default
  app.listen(process.env.PORT || 4000, () => {
    console.log('Server running on port', process.env.PORT || 4000);
  });
}).catch((error) => {
  console.error(error);
});