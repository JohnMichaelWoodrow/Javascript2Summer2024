// Class to represent Boxcar
export default class Boxcar {
    constructor(boxcarId, tareWeight, maxGrossWeight) {
        this.boxcarId = boxcarId;
        this.tareWeight = tareWeight;
        this.maxGrossWeight = maxGrossWeight;
        this.cargoWeight = 0;
        this.grossWeight = this.tareWeight + this.cargoWeight;
        this.freights = [];
    }

    // Function to add Freight
    addFreight(freight) {
        const potentialGrossWeight = this.grossWeight + freight.cargoWeight;
        if (potentialGrossWeight <= this.maxGrossWeight) {
            this.freights.push(freight);
            this.cargoWeight += freight.cargoWeight;
            this.grossWeight = this.tareWeight + this.cargoWeight;
            return true;
        }
        return false;
    }
}