import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  miFormulario:FormGroup = this.fb.group ({
    nombre   : ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email    : ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator] ], //Validators.email
    username : ['', [Validators.required, noPuedeSerStrider]],
    password : ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },
  {
    validators: [this.validatorService.camposIguales('password','password2')]
  }
  );


  get emailErrorMsg():string {

    // if ( errors?['required']:'' ) {
    //   return 'Email es obligatorio'
    // } else if ( errors?['pattern']:'' ) {
    //   return 'El valor ingresado no tiene formato de correo electrónico'
    // } else if ( errors?['pattern']:'' ) {
    //   return 'Email ya usado'
    // }

    const errors = this.miFormulario.get('email')?.errors||{};
    
    console.log('*** emailErrorMsg *** ',errors);
    let result='';
    for (let i in errors) {
      if(errors.hasOwnProperty(i)) {
        if (result.length===0) {
          result=`${i}`;
        } else {
          result=`${result} ${i}`;
        }
      }
    }
    
    if ( result.includes('required') ) {
      return 'Email es obligatorio'
    } else if ( result.includes('pattern') ) {
      return 'El valor ingresado no tiene formato de correo electrónico'
    } else if ( result.includes('emailTomado') ) {
      return 'Email ya usado'
    }

    return '';

  }

  constructor(private fb:FormBuilder,
              private validatorService:ValidatorService,
              private emailValidator:EmailValidatorService) { }

  ngOnInit(): void {

    // Inicializar formulario con valores por defecto
    // Con reset se rellena los campos coincidentes
    // Con setValue debes enviar todos los campos declarados en el formulario
    this.miFormulario.reset( {
      nombre:'Luis Peya',
      email:'test1@test.com',
      username:'lmpm',
      password:'123456',
      password2:'123456'
    })
  }

  campoNoValido (campo:string) {
    return this.miFormulario.get(campo)?.invalid 
            && this.miFormulario.get(campo)?.touched;
  }

  // emailRequired() {
  //   console.log('emailRequired-required',this.miFormulario.get('email')?.errors?['required']:null)
  //   return this.miFormulario.get('email')?.errors?['required']
  //           && this.miFormulario.get('email')?.touched: null ;
  // }

  // emailFormato() {
  //   console.log('emailRequired-pattern',this.miFormulario.get('email')?.errors?['pattern']:null)
  //   return this.miFormulario.get('email')?.errors?['pattern']
  //           && this.miFormulario.get('email')?.touched: null;
  // }

  // emailTomado() {
  //   console.log('emailRequired-emaiTomado',this.miFormulario.get('email')?.errors?['emaiTomado']:null)
  //   return this.miFormulario.get('email')?.errors?['emaiTomado']
  //           && this.miFormulario.get('email')?.touched: null;
  // }

  submitFormulario(): void {

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched;
  }
}
