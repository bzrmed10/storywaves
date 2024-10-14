import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ParametersComponent {
  @Output() genreChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<{ name: string; code: string }>();
  @Output() storyLengthChange = new EventEmitter<number>();

  genres: { title: string; link: string }[] = [
    {
      title: 'Fantasy & Magic',
      link: '../../assets/pics/genres/Fantasy & Magic.jpeg',
    },
    {
      title: 'Friendship & Family',
      link: '../../assets/pics/genres/Friendship & Family.jpeg',
    },
    {
      title: 'Animal Stories',
      link: '../../assets/pics/genres/Animal Stories.jpeg',
    },
    {
      title: 'Mystery & Problem-Solving',
      link: '../../assets/pics/genres/Mystery & Problem-Solving.jpeg',
    },
    {
      title: 'Science & Space',
      link: '../../assets/pics/genres/Science & Space.jpeg',
    },
    {
      title: 'Superheroes & Action',
      link: '../../assets/pics/genres/Superheroes & Action.jpeg',
    },
    {
      title: 'Nature & Environment',
      link: '../../assets/pics/genres/Nature & Environment.jpeg',
    },
    { title: 'Adventure', link: '../../assets/pics/genres/Adventure.jpeg' },
    {
      title: 'Sports & Competition',
      link: '../../assets/pics/genres/Sports & Competition.jpeg',
    },
    {
      title: 'Historical & Cultural',
      link: '../../assets/pics/genres/Historical & Cultural.jpeg',
    },
    {
      title: 'Fairy Tales & Folklore',
      link: '../../assets/pics/genres/Fairy Tales & Folklore.jpeg',
    },
    {
      title: 'Dreams & Imagination',
      link: '../../assets/pics/genres/Dreams & Imagination.jpeg',
    },
    {
      title: 'Life Lessons & Morals',
      link: '../../assets/pics/genres/Life Lessons & Morals.jpeg',
    },
    {
      title: 'Comedy & Fun',
      link: '../../assets/pics/genres/Comedy & Fun.jpeg',
    },
  ];
  //languages: string[] = ['English', 'French', 'Spanish', 'Danish', 'Russian'];
  languages: { name: string; code: string }[] = [
    { name: 'English', code: 'en-US' },
    { name: 'French', code: 'fr-FR' },
    { name: 'Spanish', code: 'es-ES' },
    { name: 'Russian', code: 'ru-RU' },
  ];
  storyLengths: { label: string; value: number }[] = [
    { label: 'Short', value: 5000 },
    { label: 'Medium', value: 10000 },
    { label: 'Long', value: 15000 },
  ];
  selectedLanguage: { name: string; code: string } = { name: '', code: '' };
  selectedStoryLength: number = 0;
  selectedGenre: string = '';
  setGenre(genre: string): void {
    this.selectedGenre = genre;
    this.genreChange.emit(genre);
  }

  setLanguage(language: string, code: string): void {
    this.selectedLanguage.name = language;
    this.selectedLanguage.code = code;
    this.languageChange.emit(this.selectedLanguage);
  }
  setStoryLength(length: number): void {
    this.selectedStoryLength = length;

    this.storyLengthChange.emit(length);
  }
}
