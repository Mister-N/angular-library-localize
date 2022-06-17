import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-lib',
  template: `
    <h1 i18n>Hello world! lib</h1>
    <p>
      lib works!
    </p>
  `,
  styles: [
  ]
})
export class LibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
