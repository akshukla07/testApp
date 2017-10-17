import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public application = "TestApplication";
	public uri = "https://cloud.aspire-dev2.com";

	constructor() {
	}
}
