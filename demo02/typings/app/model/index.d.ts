// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSignin = require('../../../app/model/signin');

declare module 'egg' {
  interface IModel {
    Signin: ReturnType<typeof ExportSignin>;
  }
}
