import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public application = "TestApplication";
	public uri = "http://clickzeus.com/ajay/api/";
	public cityStates = {
		andaman:{
			name: 'Andaman and Nicobar Islands',
			value: 'andaman',
			cities: ['Port Blair', 'Garacharma', 'Bakultala', 'Bambooflat']
		},
		andhra:	{
			name: 'Andhra Pradesh',
			value: 'andhra',
			cities: ['Vijayawada', 'Guntur', 'Anantapur', 'Ongole']
		},
		arunachal: {
			name: 'Arunachal Pradesh',
			value: 'arunachal',
			cities: ['Dharampur', 'Kutum', 'Lallung', 'Namchik']
		},
		assam: {
			name: 'Assam',
			value: 'assam',
			cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat']
		},
		bihar: {
			name: 'Bihar',
			value: 'bihar',
			cities: ['Patna', 'Gaya', 'Bhagalpur', 'Purnia']
		},
		chandigarh: {
			name: 'Chandigarh',
			value: 'chandigarh',
			cities: ['Chandigarh']
		},
		chhattisgarh: {
			name: 'Chhattisgarh',
			value: 'chhattisgarh',
			cities: ['Raipur', 'Bilaspur', 'Rajnandgaon', 'Raigarh']
		},
		dadra: {
			name: 'Dadra and Nagar Haveli',
			value: 'dadra',
			cities: ['Dadra', 'Naroli', 'Rakholi', 'Samarvarni']
		},
		daman: {
			name: 'Daman and Diu',
			value: 'daman',
			cities: ['Diu', 'Daman', 'Bhimpore', 'Dunetha']
		},
		newdelhi: {
			name: 'New Delhi',
			value: 'newdelhi',
			cities: ['South Delhi', 'North Delhi', 'North East Delhi', 'East Delhi']
		},
		goa: {
			name: 'Goa',
			value: 'goa',
			cities: ['Panaji', 'Bicholim', 'Canacona', 'Cuncolim']
		},
		gujarat: {
			name: 'Gujarat',
			value: 'gujarat',
			cities: ['Gandhinagar', 'Rajkot', 'Surat', 'Vadodra']
		},
		haryana: {
			name: 'Haryana',
			value: 'haryana',
			cities: ['Panchkula', 'Faridabad', 'Gurgaon', 'Ambala']
		},
		himachal: {
			name: 'Himachal Pradesh',
			value: 'himachal',
			cities: ['Shimla', 'Mandi', 'Solan', 'Manali']
		},
		jammu: {
			name: 'Jammu and Kashmir',
			value: 'jammu',
			cities: ['Jammu', 'Srinagar', 'Kargil', 'Kishtwar']
		},
		jharkhand: {
			name: 'Jharkhand',
			value: 'jharkhand',
			cities: ['Ranchi', 'Dhanbad', 'Ramgarh', 'Medininagar']
		},
		karnataka: {
			name: 'Karnataka',
			value: 'karnataka',
			cities: ['Bengaluru', 'Bagalkot', 'Belagavi', 'Vijayapura']
		},
		kerala: {
			name: 'Kerala',
			value: 'Kerala',
			cities: ['Kochi', 'Kannur', 'Trichur', 'Manjeri']
		},
		lakshadweep: {
			name: 'Lakshadweep',
			value: 'lakshadweep',
			cities: ['Agatti Island', 'Kalpeni', 'Kavaratti', 'Kiltan']
		},
		mp: {
			name: 'Madhya Pradesh',
			value: 'mp',
			cities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior']
		},
		mumbai: {
			name: 'Mumbai',
			value: 'mumbai',
			cities: ['Thane', 'Mumbai ', 'Solapur', 'Kolhapur']
		},
		manipur: {
			name: 'Manipur',
			value: 'nanipur',
			cities: ['Bishnupur', 'Thoubal', 'Imphal East', 'Imphal West']
		},
		meghalaya: {
			name: 'Meghalaya',
			value: 'meghalaya',
			cities: ['Ribhoi', 'Jaintia Hills', 'East Khasi Hills', 'West Garo Hills']
		},
		mizoram: {
			name: 'Mizoram',
			value: 'mizoram',
			cities: ['Aizawl', 'Kolasib', 'Lawngtlai', 'Lunglei']
		},
		nagaland: {
			name: 'Nagaland',
			value: 'nagaland',
			cities: ['Dimapur', 'Kohima', 'Longleng', 'Mokokchung']
		},
		odisha: {
			name: 'Odisha',
			value: 'odisha',
			cities: ['Balangir', 'Bargarh', 'Bhadrak', 'Cuttack']
		},
		puducherry: {
			name: 'Puducherry',
			value: 'puducherry',
			cities: ['Karaikal', 'Mahé', 'Pondicherry', 'Yanam']
		},
		punjab: {
			name: 'Punjab',
			value: 'punjab',
			cities: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Mohali']
		},
		rajasthan: {
			name: 'Rajasthan',
			value: 'rajasthan',
			cities: ['Ajmer', 'Alwar', 'Banswara', 'Baran']
		},
		sikkim: {
			name: 'Sikkim',
			value: 'sikkim',
			cities: ['Gangtok', 'Namchi', 'Geyzing', 'Mangan']
		},
		tamil: {
			name: 'Tamil Nadu',
			value: 'tamil',
			cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli']
		},
		telangana: {
			name: 'Telangana',
			value: 'telangana',
			cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam']
		},
		tripura: {
			name: 'Tripura',
			value: 'tripura',
			cities: ['Agartala', 'Amarpur', 'Belonia', 'Dharmanagar']
		},
		up: {
			name: 'Uttar Pradesh',
			value: 'up',
			cities: ['Ayodhya', 'Lucknow', 'Noida', 'Sultanpur', 'Amethi']
		},
		uttarakhand: {
			name: 'Uttarakhand',
			value: 'uttarakhand',
			cities: ['Almora', 'Bageshwar', 'Gopeshwar', 'Champawat']
		},
		bengal: {
			name: 'West Bengal',
			value: 'bengal',
			cities: ['Kolkata', 'Howrah', 'Darjeeling', 'Kalimpong']
		}
	};

	constructor() {
	}
}
