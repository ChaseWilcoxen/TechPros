/// <reference  types="@types/googlemaps"  />

import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('addresstext') addresstext!: ElementRef;
	@ViewChild('placeInfo') placeInfo!: ElementRef;
	@ViewChild('gmap') gmapElement: any;
  public placeData: any = {};

  constructor() { }

  public ngOnInit() { }
	
	public ngAfterViewInit(): void {
		this.getPlaceAutocomplete();
	}

	public getPlaceAutocomplete() {
    const options = {
      componentRestrictions: { country:  'US' },
			types: ['establishment', 'geocode']
    };
		const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement, options);

		google.maps.event.addListener(autocomplete, 'place_changed', () => {
			const place: any = autocomplete.getPlace();
			this.placeInfo.nativeElement.innerHTML = place.formatted_address.replaceAll(",", "</br>");
		});
	}
}