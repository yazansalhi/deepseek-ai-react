import axios from "axios";

export default class DeepSeek {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string, baseURL: string = "https://api.deepseek.com") {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, payload: any) {
    try {
      const response = await axios.post(`${this.baseURL}/${endpoint}`, payload, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || error.message);
    }
  }

  public async chatCompletion(messages: { role: string; content: string }[], model: string = "deepseek-chat") {
    return this.request("chat/completions", { messages, model });
  }

  public async edit(input: string, instruction: string) {
    return this.request("edit", { input, instruction });
  }

  public async search(query: string) {
    return this.request("search", { query });
  }
}
