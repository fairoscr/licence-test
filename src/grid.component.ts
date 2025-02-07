import { Component, ViewChild } from '@angular/core';
import { customerCols, customers, employeeCols, employees } from './data';

import { DevExtremeModule } from 'devextreme-angular';
import { DxoGridComponent } from 'devextreme-angular/ui/nested';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import config from 'devextreme/core/config'; 
import { licenseKey } from './devextreme-license'; 
 
config({ licenseKey });
import jsPDF from 'jspdf';

@Component({
  standalone: true,
  imports: [DevExtremeModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  selector: 'app-grid'
})
export class GridComponent {
  employeeData: any = employees;
  employeeColumns: any = employeeCols;

  customerData: any = customers;
  customerColumns: any = customerCols;

  @ViewChild('grid1', { static: false }) grid1!: DxoGridComponent;
  @ViewChild('grid2', { static: false }) grid2!: DxoGridComponent;

  exportPDF() {
    console.log('Checking');

    const trackBottomRightCorner = (rect: any, bottomRightCorner: { x: number; y: number; footerX: number; footerY: number }) => {
      bottomRightCorner.x = rect.x + rect.w;
      bottomRightCorner.y = rect.y + rect.h;
      if (bottomRightCorner.footerX < bottomRightCorner.x) {
        bottomRightCorner.footerX = bottomRightCorner.x;
      }
      if (bottomRightCorner.footerY < bottomRightCorner.y) {
        bottomRightCorner.footerY = bottomRightCorner.y;
      }
    };

    const bottomRightCorner = { x: 0, y: 0, footerX: 0, footerY: 0 };
    const addGridToPDF = (pdfDoc: any, component: any, y = 0) => {
      if (y > 250) {
        pdfDoc.addPage();
        y = 0;
      }
      let options = {
        jsPDFDocument: pdfDoc,
        component,
        topLeft: { x: 0, y },
        customDrawCell(e: any) {
          trackBottomRightCorner(e.rect, bottomRightCorner);
        }
      };
      return exportDataGrid(options).then(() => Promise.resolve(bottomRightCorner));
    };

    const doc = new jsPDF();
    const gridOne = this.grid1.instance;
    const gridTwo = this.grid2.instance;

    addGridToPDF(doc, gridOne)
      .then(grid1Point => {
        console.log(grid1Point);
        return grid1Point;
      })
      .then(grid1Point => addGridToPDF(doc, gridTwo, grid1Point.y))
      .then(grid2Point => {
        console.log(grid2Point);
        doc.save('final.pdf');
      });
  }
}
