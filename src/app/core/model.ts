export class User {
    provider: string = null;
    photoURL: string = null;
    name: string = null;
    nuResgistration: string = null;
    genre: string = null;
    dtBirth: Date = null;
    type: string = "COMUM";
    mail: string = null;
    cellPhone: string = null;
    zipCode: string = null;
    stateCode: string = null;
    city: string = null;
    neighborhood: string = null;
    publicPlace: string = null;
    complement: string = null;
    nuPlace: string = null;
    isActive: boolean = false;
}

export class UserDTO {
    id: string = null;
    user = new User();
}

export class Publish {
    title: string = null;
    description: string;
    type: string = null;
    dt_publish = new Date();
    isActive: boolean = true;
    user: any = null;
}

export class PublishDTO {
    id: string = null;
    publish = new Publish();
}