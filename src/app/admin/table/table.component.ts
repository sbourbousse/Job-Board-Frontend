import {AfterContentInit, Component, ViewChild, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterContentInit {

  constructor(private adminService : AdminService) {}


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() objectsToDisplay;
  @Input() objectsType;
  dataSource;
  //Mettre le nom des propriétés des objets à faire apparaitre
  displayedColumns: string[] ;
  editedRows: Array<HTMLElement>;
  editedObjects;

  ngAfterContentInit() {
    this.displayedColumns = [];
    this.editedRows = new Array();
    //this.savedRows = new Array();

    if(this.objectsToDisplay) {
      this.dataSource = new MatTableDataSource<any>(this.objectsToDisplay);
      this.dataSource.paginator = this.paginator;

      for (var key in this.objectsToDisplay[0] ){
        if (this.objectsToDisplay[0].hasOwnProperty(key)) {
            this.displayedColumns.push(key);
        }
        //this.displayedColumns.push("action")
      } 
    } else {
      //Tableau vide 
    }
  }

  editRow(rowNumber) {
    const rowToEdit = document.getElementById("row"+rowNumber);
    
    if(!(this.editedRows.find((element) => rowToEdit == element))) {
      this.editedRows.push(rowToEdit);
        for (let i = 0 ; i<rowToEdit.children.length ; i++) {
        let valueOfCell = rowToEdit.children[i].textContent
        if( valueOfCell == "---")
          valueOfCell = null
  
        rowToEdit.children[i].innerHTML = this.textToHTMLInput(valueOfCell);
      }
      //FEATURE pour ajouter un bouton sauvegarder de la ligne en cours d'édition et remettre input en texte
      /*var action = document.createElement("td");
      var button = document.createElement("button");
      button.setAttribute("id","save"+rowNumber)

      action.appendChild(button);
      rowToEdit.append(action);
      button.addEventListener("click", () => {
        this.savedRows.push(rowToEdit);
        this.editedRows.splice(this.editedRows.findIndex((element) => rowToEdit == element));
        
        for (let i = 0 ; i<rowToEdit.children.length-1 ; i++) {
          //caster l'element en HTMLInputElement pour avoir accès à lattribut value (nodeValue ne fonctionne pas sur les inputs)
          let valueOfInput = (<HTMLInputElement>rowToEdit.children[i].firstChild).value;
          console.log(rowToEdit.children[i]);
          if( valueOfInput == "null")
            valueOfInput = '---'
          
          rowToEdit.children[i].innerHTML = valueOfInput;

          rowToEdit.style["background"] = "orange";
        }
      });*/
    }
  }

  createObjectFromRow(row: HTMLElement) {
    let object= {};
    
    for (let i = 0 ; i < row.children.length ; i++){
      let valueOfInput = (<HTMLInputElement>row.children[i].firstChild).value;
      object[this.displayedColumns[i]] =valueOfInput;
    }

    return object;
  }

  send() {
    let objects = [];
    for (let row of this.editedRows) {
      objects.push(this.createObjectFromRow(row));
    }
    console.log(this.objectsType);
    console.log(objects);
    switch(this.objectsType) {
      case "personnes" : 
        this.adminService.updateUsers(objects).subscribe(resp => {console.log(resp)});
      break;
      case "informations" : 
        this.adminService.updateInformations(objects).subscribe(resp => {console.log(resp)});
      break;
      case "entreprises" : 
        this.adminService.updateEntreprises(objects).subscribe(resp => {console.log(resp)});
      break;
      case "annonces" : 
        this.adminService.updateAnnonces(objects).subscribe(resp => {console.log(resp)});
      break;
    }
    
  }

  isElementDisplayable(element) {
    if (typeof element == "object") {
      return false;
    } else {
      return element;
    }
  }

  textToHTMLInput (valueInsideInput) {
    const input = `<input class="form-control" value="${valueInsideInput}"></input>`

    return input
  }

}
