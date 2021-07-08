import { PictureSizes } from './PictureSizes';

export interface User{
    email: string;
    fullName: string;
    avatar: string;
    gender: string;
    picture: PictureSizes;
}
