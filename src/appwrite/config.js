import conf from "../conf/conf";
import { Client,Account,ID,Databases,Storage,Query } from "appwrite";

export class Service{
client =new Client();
databases;
bucket;

constructor(){
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

    this.account= new Account(this.client);
    this.databases=new Databases(this.client)
    this.bucket=new Storage(this.client)
}

async createPost({title,slug,content,featuredImage,status,userId}){
try {
    return await this.databases.createDocument(
        conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{ title,content,featuredImage,status,userId }
    )
} catch (error) {
    console.log("Appwrite servive::createPost::error",error);
}
}
//here slug is used as documentId
async updatePost(slug,{title,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status})
    } catch (error) {
        console.log("Appwrite servive::createPost::error",error);
    }
}

async deletePost(slug){
    try {
// return await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);

await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
return true; 
    } catch (error) {
        console.log("Appwrite servive::deletePost::error",error);
        return false
    }
}

async getPost(slug){
    try {
        return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
    } catch (error) {
        console.log("Appwrite servive::getPost::error",error);
        return false
    }
}

//here we have used status as indexes in database so it is used for query
async getActivePosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
        
    } catch (error) {
        console.log("Appwrite servive::getActivePost::error",error);
        return false
    }
}

//file upload service
async uploadFile(file){
    try {
return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
        
    } catch (error) {
        console.log("Appwrite servive::fileUplaod::error",error);
        return false
    }
}

async deleteFile(fileId){
try {
    await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
    return true
    
} catch (error) {
    console.log("Appwrite servive::fileDelete::error",error);
    return false
}
}

getFilePreview(fileId){
 const preview=   this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
console.log(`preview is ${preview}`)
return preview
}

}

const service= new Service()
export default service