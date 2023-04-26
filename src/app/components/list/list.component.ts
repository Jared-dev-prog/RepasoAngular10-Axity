import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Computer } from 'src/app/models/computers.model';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  constructor(
    private computersService: ComputersService,
    private router: Router
  ) {
    this.computersService.getComputers().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
    });
  }

  displayedColumns: string[] = ['id', 'brand', 'memory', 'size', 'actions'];
  dataSource = new MatTableDataSource<Computer>();

  editComputer(id: string) {
    this.router.navigate(['computers', id]);
  }

  deleteComputer(id: string) {
    this.computersService.deleteComputer(id).subscribe({
      next: (response) => {
        alert('Computadora eliminada correctamente!');
        this.refresh();
      },
    });
  }

  refresh() {
    this.computersService.getComputers().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
    });
  }
}
