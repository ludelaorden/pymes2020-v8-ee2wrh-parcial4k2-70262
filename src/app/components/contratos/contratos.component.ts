import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../models/contrato';
import { ContratosService } from '../../services/contratos.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  Titulo = "Contratos";
  TituloAccionABMC = {
    A: "(Agregar)",    
    L: "(Listado)"
  };
  AccionABMC = "L";
  Mensajes = {
     RD: " Revisar los datos ingresados..."
  };

   OpcionesActivo = [
 { Id: null, Nombre: "" },
 { Id: true, Nombre: "SI" },
 { Id: false, Nombre: "NO" }
 ];

 FormFiltro: FormGroup;
 FormReg: FormGroup;
 submitted = false;

  Lista: Contrato[] = [];

  constructor(
    private contratosService: ContratosService,
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService
    ) { }

    ngOnInit() {
      this.getContratos();
      this.FormFiltro = this.formBuilder.group({
      Nombre: [""],
      Activo: [null]
    });
      this.FormReg = this.formBuilder.group({
      Contrato: [0],
      DescripcionProducto: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
        ],
        ContratoImporte: [null, [Validators.required, Validators.pattern("[0-9]")]], 
      IdContrato: [
        "",
        [Validators.required, Validators.pattern("[0-9]")]
        ]
    });
    }
  
   getContratos(){
    this.contratosService.get()
    .subscribe((res:Contrato[]) =>{
    this.Lista = res;
    });
   }
   Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset(this.FormReg.value);
    this.submitted = false;    
    this.FormReg.markAsUntouched();
   }

    Volver() {
    this.AccionABMC = "L";
   }

    Grabar() {
      this.submitted = true;

      if (this.FormReg.invalid) {
      return;
      }
      const itemCopy = { ...this.FormReg.value };

      if (itemCopy.IdEquipo == 0 || itemCopy.IdEquipo == null) {
        window.scroll(0, 0);
        this.contratosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');       
      });
       } else {
      
      this.contratosService
      .put(itemCopy.IdProducto, itemCopy)
      .subscribe((res: any) => {
      this.Volver();
      this.modalDialogService.Alert('Registro modificado correctamente.');
 });
 }
 }
}



    
  



