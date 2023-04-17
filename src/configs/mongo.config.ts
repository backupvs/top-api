import { TypegooseModuleOptions } from "@m8a/nestjs-typegoose";
import { ConfigService } from "@nestjs/config";

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions()
  };
};

const getMongoString = (configService: ConfigService) => {
  const isProd = process.env.NODE_ENV === 'production';

  const protocol = isProd ? 'mongodb+srv' : 'mongodb';
  const login = configService.get('MONGO_LOGIN');
  const password = configService.get('MONGO_PASSWORD');
  const host = configService.get('MONGO_HOST');
  const port = isProd ? '' : `:${configService.get('MONGO_PORT')}`;
  const authDatabase = configService.get('MONGO_AUTHDATABASE');

  return `${protocol}://${login}:${password}@${host}${port}/${authDatabase}`;
}

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true
})