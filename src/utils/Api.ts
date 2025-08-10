import axios, { AxiosResponse } from 'axios'
import { CallbackFunction, RequestDataWithBody } from '../typings/Request';

export default class Api {

    // Types of basic variables
    private ip: string;
    private port: string | number;
    private verPrefix: string;
    private fullIp: string;
    public uuid: string;

    constructor(uuid: string) {

        // Definition of basic variables
        this.ip = import.meta.env.VITE_BACKEND_IP!;
        this.port = import.meta.env.VITE_BACKEND_PORT!;
        this.verPrefix = import.meta.env.VITE_VERSIONING_PREFIX!;
        this.fullIp = `${this.ip}:${this.port}${this.verPrefix}`;
        this.uuid = uuid;
    }

    // Function to send requests to the backend
    async sendRequest(route: string, method: string = 'GET', body: object = {}, callback: CallbackFunction): Promise<AxiosResponse> {
        const reqData: RequestDataWithBody = {
            method,
            url: `${this.fullIp}${route}`
        }

        // Add body if it's a method that supports request body
        if (method === 'POST' || method === 'OPTIONS') reqData.data = body

        // Send request and return response in promise
        return (new Promise(resolve => {

            // Send request
            axios(reqData)

                // Handle response
                .then(async (res) => {

                    // Execute callback function with response
                    await callback(res, res.data);

                    // Return response in promise
                    resolve(res);
                })

                // Log error to console
                .catch((error) => {
                    console.log(`Error requesting ${reqData.url}: ${error}`)
                })
        }))
    }

    // Get product list from backend
    async getSubList(): Promise<AxiosResponse> {

        // Send request to /goods using sendRequest
        const res = await this.sendRequest('/goods?type=sub', 'GET', {}, async () => { });

        // Return result
        return res;
    }

    // Get script list from backend
    async getScriptList(): Promise<AxiosResponse> {

        // Send request to /goods using sendRequest
        const res = await this.sendRequest('/goods?type=script', 'GET', {}, async () => { });

        // Return result
        return res;
    }

    // Get product list from backend
    async getGoodList(): Promise<AxiosResponse> {

        // Send request to /goods using sendRequest
        const res = await this.sendRequest('/goods?type=all', 'GET', {}, async () => { });

        // Return result
        return res;
    }

    // Get product list by specific query
    async queryGoodList(type:string = 'all', q: string = '') {

        // Send request to /goods/find using sendRequest
        const res = await this.sendRequest(`/goods/find?type=${type}&q=${q}`, 'GET', {}, async () => { });

        // Return result
        return res;
    }

    async getArticle(name: string) {
        // Send request to /goods/find using sendRequest
        const res = await this.sendRequest(`/article/find?name=${name}`, 'GET', {}, async () => { });

        // Return result
        return res;
    }

    // Function for registration in backend
    async signUp(body: { username: string, password: string, recaptchaToken: string }) {

        // Send request to /signup using sendRequest, get response
        const res: AxiosResponse = await this.sendRequest('/signup', 'POST', {

            // Basic data 
            username: body.username,
            password: body.password,

            // Captcha token
            recaptchaToken: body.recaptchaToken,

            // Get unique user id that is always stored in local storage
            uuid: localStorage.getItem('uuid')
        }, async () => { })

        // Return response
        return res;
    }

    // Function for login in backend
    async login(body: { username: string, password: string, recaptchaToken: string }): Promise<AxiosResponse> {

        // Send request to /login using sendRequest, get response
        const res: AxiosResponse = await this.sendRequest('/login', 'POST', {

            // Basic data 
            username: body.username,
            password: body.password,

            // Captcha token
            recaptchaToken: body.recaptchaToken,
        }, async () => { })

        // If successful, set user id that is set for the user
        if (res.data.success) localStorage.setItem('uuid', res.data.uuid)

        // Return response
        return res;
    }
}