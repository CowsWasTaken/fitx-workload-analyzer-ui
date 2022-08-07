import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudioInfoDto} from "../model/studio-info.dto";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-studio-select',
  templateUrl: './studio-select.component.html',
  styleUrls: ['./studio-select.component.sass']
})
export class StudioSelectComponent implements OnInit, AfterViewInit {
  studios: StudioInfoDto[] = []

  displayedColumns: string[] = ['id', 'name', 'interval'];
  dataSource = new MatTableDataSource(this.studios);

  constructor(private route: ActivatedRoute, private _liveAnnouncer: LiveAnnouncer, private router: Router) { }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;


  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      if (response.studios) {
        this.studios = response.studios
        this.dataSource = new MatTableDataSource(this.studios);

      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  switchToStudio(row: StudioInfoDto) {
    this.router.navigate([`${row.id}`], {relativeTo:this.route}).then();
    console.log(row)
  }
}
