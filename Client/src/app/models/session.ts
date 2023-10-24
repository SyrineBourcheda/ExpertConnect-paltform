export class Session {
    id?: number;
    title = "";
    objectives = "";
    requirements = "";
    ownerExpert?  :string | null;
    date? : Date;
    duration =0;
    imagePath? : string | ArrayBuffer | null;

}