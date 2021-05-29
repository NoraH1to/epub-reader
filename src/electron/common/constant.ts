import Joi from 'joi';

const responseBody: ResponseBody = {
  msg: '成功',
  data: null,
};

const joiSchema = {
  webDAV: {
    login: Joi.object({
      host: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
    getDirectoryContents: Joi.object({
      path: Joi.string().required(),
      deep: Joi.boolean(),
    }),
    getFileDownloadLink: Joi.object({
      fileName: Joi.string().required(),
    }),
  },
};

export default {
  responseBody,
  joiSchema,
};
