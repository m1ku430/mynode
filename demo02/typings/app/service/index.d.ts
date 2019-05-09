// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportLogin = require('../../../app/service/login');
import ExportLogout = require('../../../app/service/logout');
import ExportSignin = require('../../../app/service/signin');

declare module 'egg' {
  interface IService {
    login: ExportLogin;
    logout: ExportLogout;
    signin: ExportSignin;
  }
}
