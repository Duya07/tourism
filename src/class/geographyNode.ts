export class geographyNode {
    
    private _id: string;
    private _name: string;
    private _district: string;
    private _location: {
        lng: number,
        lat: number,
    };
    private _address: string;
    private _typecode: string;

    constructor(id: string, name: string, district: string, 
        location: {lng: number, lat: number}, address: string, typecode: string) {
        this._id = id;
        this._name = name;
        this._district = district;
        this._location = location;
        this._address = address;
        this._typecode = typecode;
    }

    public getId(): string {
        return this._id;
    }

    public setId(id: string) {
        this._id = id;
    }

    public getName(): string {
        return this._name;
    }

    public setName(name: string) {
        this._name = name;
    }

    public getDistrict(): string {
        return this._district;
    }

    public setDistrict(district: string) {
        this._district = district;
    }

    public getLocation(): {lng: number, lat: number} {
        return this._location;
    }

    public setLocation(location: {lng: number, lat: number}) {
        this._location = location;
    }

    public getAddress(): string {
        return this._address;
    }

    public setAddress(address: string) {
        this._address = address;
    }

    public getTypecode(): string {
        return this._typecode;
    }

    public setTypecode(typecode: string) {
        this._typecode = typecode;
    }
}