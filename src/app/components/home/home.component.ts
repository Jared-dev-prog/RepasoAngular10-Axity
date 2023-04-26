import { Component, OnInit } from '@angular/core';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private computersService: ComputersService) {}

  ngOnInit(): void {
    this.computersService.getComputers().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
