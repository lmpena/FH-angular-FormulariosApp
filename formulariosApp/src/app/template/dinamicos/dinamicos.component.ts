import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Favorito {
  id: number;
  nombre:string;
}

interface Persona {
  nombre:string;
  favoritos: Favorito[];
}


@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  // @Input() miFormulario!: NgForm;

  persona: Persona = {
    nombre: 'Luis',
    favoritos: [
      { id:1, nombre:'Metal Gear'},
      { id:2, nombre:'Death Stranding'}
    ]
  }

  nuevoJuego:string='';

  guardar() {

    // console.log('DinamicosComponent: nombre.value',this.miFormulario?.controls['nombre']?.value)
    // if(this.miFormulario?.controls['nombre']?.value === undefined ) {
    //   console.log('DinamicosComponent: formulario no válido. Campo nombre vacío')
    //   return;
    // }
    console.log('DinamicosComponent: formulario posteado')
  }

  eliminar(index:number) {
    this.persona.favoritos.splice(index,1);
  }

  agregarJuego() {
    const nuevoFavorito: Favorito={
      id: this.persona.favoritos.length-1,
      nombre: this.nuevoJuego
    };

    this.persona.favoritos.push({ ...nuevoFavorito});
    this.nuevoJuego='';
  }
}
