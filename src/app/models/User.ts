import { PictureSizes } from './PictureSizes';
import { UserApi } from './UserApi';

export interface IUser{
    name: string;
    completeName: string;
    lastName: string;
    email: string;
    picture: PictureSizes;
}

export class User implements IUser {
    name: string;
    completeName: string;
    lastName: string;
    email: string;
    picture: PictureSizes;

    constructor(user: UserApi){
        this.name = this.getSingleName(user.fullName);
        this.lastName = this.getLastName(user.fullName);
        this.completeName = this.getCompleteName(user.fullName);
        this.email = user.email;
        this.picture = user.picture;
    }

    public getSingleName(fullname) {
        const matchUser = fullname.match(/[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g) || [];
        return matchUser.slice(0, 1).join(' ');
    }

    public getCompleteName(fullname) {
        const matchUser = fullname.match(/[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g) || [];
        return matchUser.slice(0, 2).join(' ');
    }

    public getLastName(fullname) {
        const matchUser = fullname.match(/[A-ZÁ-ÚÑÜ][a-zá-úñü]+|([aeodlsz]+\s+)+[A-ZÁ-ÚÑÜ][a-zá-úñü]+/g) || [];
        return matchUser.slice(2, 4).join(' ');
    }
}
