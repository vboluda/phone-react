import { FindCursor, MongoClient } from "mongodb";


export default class MongoHelper{
    public static db:string="test";
    public static collection:string="phone";
    mongo_url:string;
    mongo:MongoClient=null;

    constructor(mongo_url:string){
        this.mongo_url=mongo_url;
    }

    async connection():Promise<MongoClient>{
        if(this.mongo ){
            return this.mongo;
        }
        this.mongo= await MongoClient.connect(this.mongo_url);
        return this.mongo;
    };


    async getAll():Promise<Array<any>>{
        let conn=await this.connection();
        let cursor:FindCursor=conn.db(MongoHelper.db).collection(MongoHelper.collection).find();
        let entries:Array<any>=new Array<any>();
        await cursor.forEach((e) =>{
            entries.push(e);
        });
        return entries;
    }

    async getFiltered(name:string):Promise<Array<any>>{
        let conn=await this.connection();
        const regex:RegExp =  new RegExp(name,'i');
        let cursor:FindCursor=conn.db(MongoHelper.db).collection(MongoHelper.collection).find({name: {$regex: regex}});
        let entries:Array<any>=new Array<any>();
        await cursor.forEach((e) =>{
            entries.push(e);
        });
        return entries;
    }

    async insert(entry:any):Promise<any>{
        let conn=await this.connection();
        let result = conn.db(MongoHelper.db).collection(MongoHelper.collection).updateOne(
            {"name":entry.name},
            {$set:entry},
            {"upsert":true}
        );
        return result;
    }

    async delete(name):Promise<any>{
        let conn=await this.connection();
        let result = conn.db(MongoHelper.db).collection(MongoHelper.collection).deleteOne(
            {"name":name}
        );
        return result;
    }








}