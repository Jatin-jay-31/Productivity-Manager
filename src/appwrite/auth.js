import conf from '../conf/conf' 
import {Client,Account,ID} from 'appwrite'


class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
        .setEndpoint(conf.endpointUrl)
        .setProject(conf.projectId)
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userdata= await this.account.create(ID.unique(),email,password,name)
            if(userdata){
                return this.login({email,password})
            }
            else{
                alert('Account not created . Please try again later!')
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            const userData= await this.account.createEmailPasswordSession(email,password)
            if(!userData){
                alert('Please login again!')
            }
            return userData
        } catch (error) {
            throw new Error(error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log(error)
        }
        return null
    }
}
const authService = new AuthService();
export default authService