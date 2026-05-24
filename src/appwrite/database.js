
import conf from '../conf/conf'
import {Client,ID,TablesDB,Query} from 'appwrite'

class DbService{
    client=new Client()
    database;

    constructor(){
        this.client.setEndpoint(conf.endpointUrl)
        .setProject(conf.projectId)
        this.database= new TablesDB(this.client)
    }

    async createNote({title,content,userId,status="active",tags=[],isPinned=false}){
        try {
            return await this.database.createRow(conf.databaseId,conf.tableId,ID.unique(),
                {title,content,userId,status,tags,isPinned}
            )
        } catch (error) {
            throw error
        }
    }
    async updateNote(id,data){
        try {
            const updateData={}
            if(data.title !==undefined){
                updateData.title=data.title
            }
            if(data.content !==undefined){
                updateData.content=data.content
            }
            if(data.tags !==undefined){
                updateData.tags=data.tags
            }
            if(data.isPinned !==undefined){
                updateData.isPinned=data.isPinned
            }
            if(data.status !==undefined){
                updateData.status=data.status
            }
            return await this.database.updateRow(conf.databaseId,conf.tableId,id,
            updateData)
        } catch (error) {
            throw error
        }
    }

    async trashNote(id){
        try {
            return await this.database.updateRow(conf.databaseId,conf.tableId,id,{status:"trash"})
        } catch (error) {
            throw error
        }
    }

    async deleteNote(id){
        try {
            return await this.database.deleteRow(conf.databaseId,conf.tableId,id)
        } catch (error) {
            throw error
        }
    }

    async getNote(id){
        try {
            return await this.database.getRow(conf.databaseId,conf.tableId,id)
        } catch (error) {
            throw error
        }
    }

    
    async getPinnedNotes(userId){
        try {
            return await this.database.listRows(conf.databaseId,conf.tableId,[Query.equal("isPinned",true), Query.equal("userId",userId),Query.equal("status","active")])
        } catch (error) {
            throw error
        }
    }
    async getArchivedNotes(userId){
        try {
            return await this.database.listRows(conf.databaseId,conf.tableId,[Query.equal("status", "archived"), Query.equal("userId",userId)])
        } catch (error) {
            throw error
        }
    }
    async getTrashNotes(userId){
        try {
            return await this.database.listRows(conf.databaseId,conf.tableId, [Query.equal("status", "trash") , Query.equal("userId",userId)])
        } catch (error) {
            throw error
        }
    }
    async getNotes(userId){
        try {
            return await this.database.listRows(conf.databaseId,conf.tableId, [Query.equal("status", "active"), Query.equal("userId",userId)])
        } catch (error) {
            throw error
        }
    }
    async restoreNote(id){
        try {
            return await this.database.updateRow(conf.databaseId,conf.tableId,id,{status: "active"})
        } catch (error) {
            throw error
        }
    }
    async archiveNote(id){
        try {
            return await this.database.updateRow(conf.databaseId,conf.tableId,id,{status: "archived"})
        } catch (error) {
            throw error
        }
    }

    async pinNote(id,currentPinState){
        try {
            return await this.database.updateRow(conf.databaseId,conf.tableId,id,{isPinned: currentPinState})
        } catch (error) {
            throw error
        }
    }

}
const dbservice=new DbService()
export default dbservice