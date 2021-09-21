import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { Anatomical_Details, Row, Terms } from '../interfaces/data';
import { DetailsComponent } from '../details/details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface anatomical_structures{
  name:string;
  id:string;
  rdfs_label:string;
}
interface anatomical_struct_final{
  name:string;
  id:string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  x:Array<any>[]=[];
  final_list:any[]=[]
  final_data_list:any[]=[]
  anatomicalDetails:Anatomical_Details={
        name:"",
      description:"",
      ontology_link:"",
      iri:""
  }
  

  mylist=[]

  constructor(
    private _service:ApiService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this._service.getData().subscribe(data=>{
      console.log("received data from server");
      // console.log(data);
      let x= data["data"];
      for(let i in x){
        console.log("printing content");
        console.log(x[i]["anatomical_structures"])

        for (let j in x[i]["anatomical_structures"])
        this.final_list.push(x[i]["anatomical_structures"])
        
        
      }
      console.log(this.final_list)

      for(let i=0;i<this.final_list.length;i++){
        for(let j=0;j<this.final_list[i].length;j++){
          let y:anatomical_structures=this.final_list[i][j]
          this.final_data_list.push(y);
        }
      }


    const uniqueData=[...this.final_data_list.reduce((map,obj)=>map.set(obj.id, obj),new Map()).values()];

    console.log("Nikhil here unique")
    console.log(uniqueData)

    this.final_data_list=uniqueData



    });
  }

  moreDetails(item:anatomical_struct_final){
    console.log("clicked item:"+item)
    let properID = item.id.replace(/:\s*/g, "_");
    console.log(properID)

    this._service.getDataByID(properID).subscribe(structureData=>{
      console.log("Structure Data:"+structureData)
      console.log(structureData['_embedded']['terms'])

      let intermdeiateData:Terms=structureData['_embedded']['terms'][0]

      this.anatomicalDetails["name"]=intermdeiateData.label
      this.anatomicalDetails["ontology_link"]=intermdeiateData.obo_id
      this.anatomicalDetails['iri']=intermdeiateData.iri
      if(intermdeiateData.description == null){
        this.anatomicalDetails["description"]=intermdeiateData.annotation['definition'][0]
      }else{
        this.anatomicalDetails["description"]=intermdeiateData.description
      }


    const dialogRef=this._dialog.open(DetailsComponent,{panelClass: 'myapp-no-padding-dialog',
                    data:this.anatomicalDetails,
                    height: '500px',
                     width: '500px',
                  });

                }, error=>{
                  this._snackBar.open("ID not found","close");
                  console.log("ID not found")
                });
                
 
  }

}
