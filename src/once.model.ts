import * as dotenv from 'dotenv'
import fetch from 'node-fetch'

const env = dotenv.config({ path: './.env' });

export class OnceModel {
  private endpoint = 'https://api.1nce.com/management-api/';
  private readonly authentication: string;
  private token?: string;
  private tokenExpiration?: Date;
  
  constructor(
    private readonly username?: string,
    private readonly password?: string,
  ) {
    const _username = username || env.parsed?.USERNAME || ''
    const _password = password || env.parsed?.PASSWORD || ''
    this.authentication = 'Basic ' + Buffer.from(`${_username}:${_password}`.trim()).toString('base64');
  }

  async getToken() {
    const url = this.endpoint + 'oauth/token';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: this.authentication,
      },
      body: JSON.stringify({grant_type: 'client_credentials'})
    };
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.status_code !== 200) {
      this.token = undefined;
      this.tokenExpiration = undefined;
      throw new Error('Failed to get token');
    }
    this.token = json.access_token;
    this.tokenExpiration = new Date(Date.now() + json.expires_in * 1000);
  }
  
  async checkToken() {
    if (!this.token || !this.tokenExpiration || this.tokenExpiration < new Date()) {
      await this.getToken();
    }
  }
  
  async getSimDataQuota(iccid: string) {
    await this.checkToken();
    const url = this.endpoint + `v1/sims/${iccid}/quota/data`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + this.token,
      },
    };
    const response = await fetch(url, options);
    return await response.json();
  }

  async getSimUsage(iccid: string, start_dt?: string, end_dt?: string) {
    await this.checkToken();
    const url = this.endpoint + `v1/sims/${iccid}/usage${start_dt ? `?start_dt=${start_dt}` : ''}${end_dt ? `&end_dt=${end_dt}` : ''}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + this.token,
      },
    };
    const response = await fetch(url, options);
    return await response.json();
  }
}