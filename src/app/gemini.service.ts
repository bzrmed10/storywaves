import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private resultPrompt = new Subject<any>();

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.API_KEY);
  }

  async generateText(prompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Extract the text from the response
    const text = await response.text();

    console.log(text);
    this.resultPrompt.next(text);

    // Return the text as a string
    return text;
  }
}
