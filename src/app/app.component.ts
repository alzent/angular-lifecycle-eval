import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'name',
  template: `
  <p *ngFor="let change of changes">
  {{change}}
  </p>
  `,
  styles: []
})

export class NameComponent implements OnChanges {

  // diese Klasse ist fuer das mittels @Input gebundene Element 
  // => bezieht sich damit auf die Component mit dem 'name'-Selector

  @Input('nameRef') nm;

  changes: Array<string> = [''];

  ngOnChanges(changes: SimpleChanges){
    this.changes.push( JSON.stringify(changes) );
  }

}

@Component({
  selector: 'app-root',
  template: `
  Change this field: <input [(ngModel)]="name" />
  <hr/>
  History
  <name [nameRef]="name"></name>
  `,
  styles: []
})

export class AppComponent{
  name: string = '';
}

/*

----
So sind die Elemente verknüpft:
----

Der Einstiegspunkt ist die Component mit dem Selector 'app-root'.
Im Teamplate dieser Component wird die DOM-Struktur festgelegt:
  1) ein Input-Feld
  2) ein Element 'name'. Dessen Aussehen und Verhalten wird durch die Component mit dem Selector 'name' gesteuert.

Im Template dieser Component werden Strings aus dem 'change'-Array als <p>-Elemente aufgelistet.
Das 'change'-Array stammt aus der assoziierten Component. Die Assoziation geht über @Input-Element!

*/
