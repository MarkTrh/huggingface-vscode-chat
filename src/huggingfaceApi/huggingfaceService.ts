import { getChatbotExtensionContext} from '../globals/extensionContext';
import {URL} from "url";
import { HfInference } from '@huggingface/inference'

export default async function askHuggingFace() {

    const context = getChatbotExtensionContext();
    const apiToken = await context?.secrets.get("apiToken");
    const endpoint = "asdasd";


    const inputs = "prompt";

    const data = {
        inputs,
        parameters: {
            temperature: 0.9,
            top_p: 0.95,
            repetition_penalty: 1.2,
            top_k: 50,
            truncate: 1000,
            max_new_tokens: 1024
          }
      };
    
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "",
    };
    
    if (apiToken) {
        headers.Authorization = `Bearer ${apiToken}`;
    }

    const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
}