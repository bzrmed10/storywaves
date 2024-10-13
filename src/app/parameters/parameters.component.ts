import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
})
export class ParametersComponent {
  @Output() genreChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();
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
  languages: string[] = ['English', 'French', 'Spanish', 'Danish', 'Russian'];
  storyLengths: { label: string; value: number }[] = [
    { label: 'Short', value: 5000 },
    { label: 'Medium', value: 10000 },
    { label: 'Long', value: 15000 },
  ];
  selectedLanguage: string = '';
  selectedStoryLength: number = 0;
  selectedGenre: string = '';
  setGenre(genre: string): void {
    this.selectedGenre = genre;
    this.genreChange.emit(genre);
  }

  setLanguage(language: string): void {
    this.selectedLanguage = language;

    this.languageChange.emit(language);
  }
  setStoryLength(length: number): void {
    this.selectedStoryLength = length;

    this.storyLengthChange.emit(length);
  }
}
