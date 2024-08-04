// Imports
import Boxcar from './Boxcar.js';
import Freight from './Freight.js';

// Class to represent Rail System
export default class RailSystem {
    constructor() {
        this.boxcars = [];
        this.warehouse = [];
    }
    
    // Function to add Boxcar
    addBoxcar(boxcar) {
        this.boxcars.push(boxcar);
    }

    // Function to get Boxcar
    getBoxcar(boxcarId) {
        return this.boxcars.find(boxcar => boxcar.boxcarId === boxcarId);
    }

    // Function to add to Warehouse
    addToWarehouse(freight) {
        this.warehouse.push(freight);
    }
}
