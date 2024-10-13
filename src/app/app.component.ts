import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GeminiService } from './gemini.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  /* prompt = `Create a short bedtime story for children aged 3-7. The story should be calming and imaginative, featuring gentle and positive themes. It should include:
  A main character who is kind and curious (e.g., an animal, a mythical creature, or a young child).
  A simple plot with a beginning, middle, and end.
  A magical or whimsical element that sparks the imagination.
  A positive message or moral.
  Soft, soothing descriptions that promote relaxation.
  The story should be no longer than 600 words and simple and clear`;*/
  title = 'storywaves';
  generatedText = '';
  selectedGenre: string = '';
  selectedLanguage: string = '';
  selectedStoryLength: number = 2000;
  prompt: string = '';
  storyObject: { title: string; story: string } = { title: '', story: '' };
  showStory: boolean = false;
  loading: boolean = false;
  ngOnInit(): void {}
  constructor(private geminiService: GeminiService) {}
  generate() {
    this.loading = true;
    this.generateText(this.prompt);
  }

  async generateText(prompt: string): Promise<void> {
    try {
      console.log('Loading....');
      this.generatedText = await this.geminiService.generateText(prompt);
      this.storyObject = this.transformStringToObject(this.generatedText);
      console.log('storyObject:', this.storyObject);
      console.log('title:', this.storyObject.title);
      console.log('story:', this.storyObject.story);
      this.showStory = true;
      this.loading = false;
    } catch (error) {
      console.error('Error generating text:', error);
    }
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.updatePrompt();
  }

  onLanguageChange(language: string): void {
    this.selectedLanguage = language;
    this.updatePrompt();
  }
  onStoryLengthChange(length: number): void {
    this.selectedStoryLength = length;
    this.updatePrompt();
  }

  updatePrompt(): void {
    this.prompt = `Craft a magical bedtime story for children aged 3-7 that transports them into the enchanting world of ${this.selectedGenre}. The story should follow this structure:
Title on the first line then the story on the second line
The story should feature:
A kind-hearted, curious main character (whether an adventurous child, a whimsical creature, or a talking animal) who embarks on a meaningful journey.
A simple yet captivating plot with a beginning, middle, and end, inspired by the ${this.selectedGenre}—where mysteries are uncovered, friendships are forged, or gentle challenges are faced.
A touch of magic or a whimsical twist that stirs the imagination and makes the world feel alive—be it shimmering stars, secret doors, or talking trees.
A heartfelt message or moral that leaves young readers with a sense of warmth, kindness, or courage.
Vivid yet soothing descriptions that invite relaxation, as the reader floats through a world of calm wonder.
The story should be at least ${this.selectedStoryLength} words, using simple and clear language that feels like a gentle lullaby of words. The language should be ${this.selectedLanguage}`;
  }

  transformStringToObject(input: string): { title: string; story: string } {
    const lines = input.split('\n');
    const title = lines[0].trim();
    const story = lines.slice(1).join('\n').trim();

    return {
      title: this.cleanTitle(title),
      story: story,
    };
  }
  newStory() {
    this.showStory = false;
    this.loading = false;
    this.selectedGenre = '';
    this.selectedLanguage = '';
    this.selectedStoryLength = 5000;
  }

  cleanTitle(title: string): string {
    return title.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
  }
}
