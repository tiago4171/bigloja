const API_URL = 'http://localhost:80/api/';
let config = {};
config.API_URL = API_URL;
config.RECORD_URL = API_URL + 'data/:id';
config.RECORD_DELETE = API_URL + 'data/delete/';
config.RECORD_ALL = API_URL + 'data/list-all';
config.UPLOAD_DATA = API_URL + 'data/save';
config.REGISTER_URL = API_URL + 'auth/signup/';
config.SIGNIN = API_URL + 'auth/signin';

const url = config;

export default url;