import { Pipe, PipeTransform } from '@angular/core';
import { CreateNoteModel} from 'src/app/model/create-note.model';

@Pipe({
  name: 'filterNote'
})
export class SearchPipe implements PipeTransform {

  transform(Note: CreateNoteModel[], searchterm: string): CreateNoteModel[]
  {
    if(!Note || !searchterm)
    {
      return Note;
    }
   
    return  Note.filter( note=> note.title.indexOf(searchterm.toLowerCase()) !== -1 || note.description.indexOf(searchterm.toLowerCase()) !== -1 );
  }

}
