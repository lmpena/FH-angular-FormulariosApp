import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto:'RTX 9090i',
    precio: 0,
    existencias:0
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido():boolean {
    return this.miFormulario?.controls['producto']?.touched && 
            this.miFormulario?.controls['producto']?.invalid;
  }

  precioValido():boolean {
    // console.log(this.miFormulario?.controls['precio']?.value);

    return  this.miFormulario?.controls['precio']?.touched &&
            this.miFormulario?.controls['precio']?.value<0;
;
  }

  guardar() {

    // console.log(miFormulario);
    console.log(this.miFormulario);

    this.miFormulario.resetForm({
      producto:'Algo inicial',
      precio:0,
      existencias:0
    });
  }
}
