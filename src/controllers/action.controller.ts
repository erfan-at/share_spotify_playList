import Service from '../service/index';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';

export default {
  likePost: (req: any, res: any) => {
    return responseBuilder.success(res, '', 'pong');
  },
  likePlayList: (req: any, res: any) => {
    return responseBuilder.success(res, '', 'pong');
  },
  commentPost: (req: any, res: any) => {
    return responseBuilder.success(res, '', 'pong');
  },
  commentPlayList: (req: any, res: any) => {
    return responseBuilder.success(res, '', 'pong');
  },
  savePost: (req: any, res: any) => {
    return responseBuilder.success(res, '', 'pong');
  },
  savePlayList: (req: any, res: any) => {
    return responseBuilder.success(res, '', 'pong');
  },
};
