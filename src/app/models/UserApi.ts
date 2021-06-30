import { PictureSizes } from './PictureSizes';

export interface UserApi{
    email: string;
    fullName: string;
    avatar: string;
    gender: string;
    picture: PictureSizes;
}
