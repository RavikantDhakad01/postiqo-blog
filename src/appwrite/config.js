import conf from "../confg/confg";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {

    client = new Client();
    storage;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log("Error in createPost:", error.message)
        }
    }

    async updatePost(slug,{ title,  content, featuredImage, status }) {

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            )
        } catch (error) {
            console.log("Error in updatePost:", error.message)
        }

    }

    async deletePost(slug) {

        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Error in deletePost:", error.message);
            return false
        }

    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("Error in getPost:", error.message);
 return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Error in getPosts", error.message);
 return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBuketid,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error in uploadFile:", error.message)
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBuketid,
                fileId
            )
            return true
        } catch (error) {
            console.log("Error in deleteFile:", error.message)
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFileView(
                conf.appwriteBuketid,
                fileId
            )
        } catch (error) {
            console.log("Error in filePreview:", error.message);

        }

    }
}

const service = new Service()

export default service