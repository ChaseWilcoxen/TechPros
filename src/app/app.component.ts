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
	@ViewChild('streetAddress') streetAddress!: ElementRef;
	@ViewChild('city') city!: ElementRef;
	@ViewChild('state') state!: ElementRef;
	@ViewChild('zipCode') zipCode!: ElementRef;
	@ViewChild('country') country!: ElementRef;

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
			let place: any = autocomplete.getPlace();
			let streetNumber='', route='', locality, administrativeArea, country, postalCode = '';

			place.address_components.forEach((addressComponent: any) => {
				switch (addressComponent.types[0]) {
					case 'street_number':
						streetNumber = addressComponent.long_name;
						break;
					case 'route':
						route = addressComponent.long_name;
						break;
					case 'locality':
						locality = addressComponent.long_name;
						break;
					case 'administrative_area_level_1':
						administrativeArea = addressComponent.long_name;
						break;
					case 'country':
						country = addressComponent.long_name;
						break;
					case 'postal_code':
						postalCode = addressComponent.long_name;
						break;
					default:
						break;
				}
			});

			this.placeInfo.nativeElement.innerHTML = place.formatted_address;
			this.streetAddress.nativeElement.innerHTML = streetNumber + ' ' + route;
			this.city.nativeElement.innerHTML = locality;
			this.state.nativeElement.innerHTML = administrativeArea;
			this.zipCode.nativeElement.innerHTML = postalCode;
			this.country.nativeElement.innerHTML = country;
		});
	}
}
