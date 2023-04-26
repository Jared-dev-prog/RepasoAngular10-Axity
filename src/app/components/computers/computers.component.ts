import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Computer } from 'src/app/models/computers.model';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css'],
})
export class ComputersComponent {
  formComputer: FormGroup;
  id: string;

  constructor(
    private formBuild: FormBuilder,
    private computersService: ComputersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formComputer = this.formBuild.group({
      brand: ['', [Validators.required]],
      memory: ['', [Validators.required, Validators.min(1)]],
      size: ['', [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        console.log(params['id']);
        this.id = params['id'];

        this.computersService.getComputer(this.id).subscribe({
          next: (response) => {
            this.formComputer.get('brand').setValue(response.brand);
            this.formComputer.get('memory').setValue(response.memory);
            this.formComputer.get('size').setValue(response.size);
          },
        });
      }
    });
  }

  saveComputer() {
    const data = new Computer();
    data.id = Math.random().toString(36).substring(2);
    data.brand = this.formComputer.get('brand').value;
    data.memory = this.formComputer.get('memory').value;
    data.size = this.formComputer.get('size').value;

    if (this.id) {
      this.computersService.updateComputer(this.id, data).subscribe({
        next: (response) => {
          alert('Cambios guardados exitosamente!');
          this.router.navigate(['list']);
        },
      });
    } else {
      this.computersService.saveComputer(data).subscribe({
        next: (data) => {
          console.log(data);
          alert('Computadora guardada con exito!');
          this.router.navigate(['list']);
        },
        error: (err) => {
          alert('Hubo un error al guardar!');
        },
      });
    }
  }
}
