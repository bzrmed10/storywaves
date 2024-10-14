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
  selectedLanguage: { name: string; code: string } = { name: '', code: '' };
  selectedStoryLength: number = 2000;
  prompt: string = '';
  storyObject: { title: string; story: string } = { title: '', story: '' };
  showStory: boolean = false;
  loading: boolean = false;
  uttr: SpeechSynthesisUtterance;
  errorAi: boolean = false;
  notif: string = '';
  msgErr: string = '';
  languages: { name: string; code: string }[] = [
    { name: 'English', code: 'en-US' },
    { name: 'French', code: 'fr-FR' },
    { name: 'Spanish', code: 'es-ES' },
    { name: 'Russian', code: 'ru-RU' },
  ];
  ngOnInit(): void {}
  constructor(private geminiService: GeminiService) {
    this.uttr = new SpeechSynthesisUtterance();
    this.uttr.lang = 'en-US';
  }
  generate() {
    if (this.selectedGenre === '' || this.selectedLanguage.name === '') {
      this.msgErr = 'Please select a Category and language';
      setTimeout(() => {
        this.msgErr = '';
      }, 3000);
    } else {
      this.loading = true;
      this.generateText(this.prompt);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async generateText(prompt: string): Promise<void> {
    try {
      console.log('Loading....');
      this.generatedText = await this.geminiService.generateText(prompt);
      this.storyObject = this.transformStringToObject(this.generatedText);
      this.showStory = true;
      this.loading = false;
    } catch (error) {
      console.error('Error generating text:', error);
      this.loading = false;
      this.errorAi = true;
      setTimeout(() => {
        this.errorAi = false;
      }, 5000);
    }
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.updatePrompt();
  }

  onLanguageChange(language: { name: string; code: string }): void {
    const selectedLang = this.languages.find(
      (lang) => lang.code === language.code
    );

    if (selectedLang && selectedLang.name) {
      this.selectedLanguage = selectedLang;
      this.updatePrompt();
    } else {
      console.error(`Language with code ${language.code} not found.`);
    }
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
The story should be at least ${this.selectedStoryLength} words, using simple and clear language that feels like a gentle lullaby of words. The language should be ${this.selectedLanguage.name}`;
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
    this.selectedStoryLength = 5000;
  }

  cleanTitle(title: string): string {
    return title.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
  }

  readStory() {
    if (window.speechSynthesis.speaking) {
      //window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
      this.speakText(this.storyObject.title);
      this.speakText(this.storyObject.story);
      this.notif = 'Story Resumed ...';
      setTimeout(() => {
        this.notif = '';
      }, 3000);
    } else {
      this.notif = 'Reading ...';
      setTimeout(() => {
        this.notif = '';
      }, 3000);
      this.speakText(this.storyObject.title);
      this.speakText(this.storyObject.story);
    }
  }

  speakText(text: string) {
    const maxChunkLength = 200; // Adjust as needed
    const chunks = this.splitTextIntoChunks(text, maxChunkLength);

    chunks.forEach((chunk, index) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.lang = this.selectedLanguage.code; // Set language as needed
      utterance.rate = 1; // Set rate as needed
      utterance.pitch = 1; // Set pitch as needed

      if (index === chunks.length - 1) {
        utterance.onend = () => {
          console.log('Speech synthesis finished.');
        };
      }

      window.speechSynthesis.speak(utterance);
    });
  }

  splitTextIntoChunks(text: string, maxChunkLength: number): string[] {
    const regex = new RegExp(`.{1,${maxChunkLength}}(\\s|$)`, 'g');
    return text.match(regex) || [];
  }
  stopStory() {
    if (this.uttr) {
      window.speechSynthesis.cancel();
      this.notif = 'Story Stopped...';
      setTimeout(() => {
        this.notif = '';
      }, 3000);
    }
  }

  pauseStory() {
    if (this.uttr) {
      this.notif = 'Story paused ...';
      setTimeout(() => {
        this.notif = '';
      }, 3000);
      window.speechSynthesis.pause();
    }
  }
}
