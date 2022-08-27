import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {
  
  persona = {
    genero:'F',
    notificaciones:true
  }

  miFormulario:FormGroup = this.fb.group({
    genero        :['M'  ,Validators.required],
    notificaciones:[true ,Validators.required],
    condiciones   :[false,Validators.requiredTrue]
  });


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset( {...this.persona, condiciones:false} );

    // this.miFormulario.get('genero')?.valueChanges.subscribe( newValue => {
    //   console.log('genero-newValue:',newValue)
    // })
    // this.miFormulario.get('notificaciones')?.valueChanges.subscribe( newValue => {
    //   console.log('notificaciones-newValue:',newValue)
    // })
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
    //   console.log('condiciones-newValue:',newValue)
    // })


    // this.miFormulario.valueChanges.subscribe(form=> {
    //   delete form.condiciones;
    //   this.persona = form;
    //   console.log('this.persona:',this.persona);
    // })

    // Desestructurando el formulario en suscribe para descartar un campo
    this.miFormulario.valueChanges.subscribe(({condiciones, ...resto})=> {
      this.persona = resto;
      console.log('this.persona:',this.persona);
    })


  }

  guardar() {
    const formValue = this.miFormulario.value;
    console.log(formValue)
  }

}
