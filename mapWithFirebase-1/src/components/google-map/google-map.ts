import { Component, ViewChild } from '@angular/core';
import {archDataService} from '../../archData.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var google: any;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  public monuments:any = 'Monuments still unassigned';
  public monumentType;
  public clickedOn:boolean = false;
  

  @ViewChild("map") mapElement;
  map: any;
  monumentMarker: any;
  google:any;
  
  
  constructor(public http: HttpClient, public archService:archDataService) {}

  
  ngOnInit(){
    
    //console.log('Initializing map');
    setTimeout(() => {
       this.initMap();
    }, 1000);

    this.retrieveMonuments();
      
  }

 
  retrieveMonuments(){
  
    this.archService.getData();
    setTimeout(() => {
      console.log(this.archService.monuments);
      this.monuments = this.archService.monuments;
   }, 50);
   
  }


  initMap(){

    //console.log('Setting map center coords');
    let coords = new google.maps.LatLng(53.13639186, -9.280849169);
    
    //console.log('Setting map options');
    let mapOptions: google.maps.MapOptions = {

      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      //disableDefaultUI: true

    }

    //console.log('Assigning map options to map');  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //console.log('Populating map with markers');  
    this.addMarker(this.monuments);
  }

  addMarker(monuments){

    for(var i=0; i<monuments.length; i++){
      
      let monumentTitle =  monuments[i]["CLASSDESC"];
      let coords = new google.maps.LatLng(monuments[i]["LATITUDE"], monuments[i]["LONGITUDE"]);
      this.monumentMarker = new google.maps.Marker({
        position: coords,
        map : this.map,
        title: monuments[i]["CLASSDESC"]
      }).addListener('click', () =>{

        this.monumentDetail(monumentTitle);

      });;

    };

  }

  monumentDetail(title){
    console.log(title);
  }
  
}